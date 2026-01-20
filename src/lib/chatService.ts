import Groq from "groq-sdk";
import { GROQ_CONFIG } from "./groqConfig";
import { getSystemPrompt } from "./knowledge";

export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

class ChatService {
    private groq: Groq | null = null;
    private conversationHistory: ChatMessage[] = [];
    private initializationPromise: Promise<void> | null = null;

    constructor() {
        // Initialization happens on first request
    }

    private async getGroqClient(): Promise<Groq> {
        if (this.groq) return this.groq;

        // If initialization is already in progress, wait for it
        if (this.initializationPromise) {
            await this.initializationPromise;
            if (this.groq) return this.groq;
        }

        // Start initialization
        this.initializationPromise = (async () => {
            try {
                // Try getting from env first (local dev) or config
                let apiKey = GROQ_CONFIG.apiKey;

                // If no key in config (production deployment), fetch from backend
                if (!apiKey) {
                    try {
                        const response = await fetch("https://groq-proxy-2op1.onrender.com/get-key");
                        if (response.ok) {
                            const data = await response.json();
                            apiKey = data.api_key;
                        }
                    } catch (err) {
                        console.error("Failed to fetch API key from proxy:", err);
                    }
                }

                if (!apiKey) {
                    throw new Error("No API key available");
                }

                this.groq = new Groq({
                    apiKey: apiKey,
                    dangerouslyAllowBrowser: true,
                });
            } finally {
                this.initializationPromise = null;
            }
        })();

        await this.initializationPromise;
        if (!this.groq) throw new Error("Failed to initialize Groq client");
        return this.groq;
    }

    async sendMessage(userMessage: string): Promise<string> {
        try {
            const groqClient = await this.getGroqClient();

            // Add user message to history
            this.conversationHistory.push({
                role: "user",
                content: userMessage,
                timestamp: new Date(),
            });

            // Keep only last 10 messages for context (to avoid token limits)
            const recentHistory = this.conversationHistory.slice(-10);

            // Prepare messages for Groq API
            const messages: Array<{ role: string; content: string }> = [
                {
                    role: "system",
                    content: getSystemPrompt(),
                },
                ...recentHistory.map((msg) => ({
                    role: msg.role,
                    content: msg.content,
                })),
            ];

            // Call Groq API
            const chatCompletion = await groqClient.chat.completions.create({
                messages: messages as any,
                model: GROQ_CONFIG.model,
                temperature: GROQ_CONFIG.temperature,
                max_tokens: GROQ_CONFIG.maxTokens,
                top_p: GROQ_CONFIG.topP,
            });

            const assistantMessage = chatCompletion.choices[0]?.message?.content || "I apologize, I couldn't generate a response. Please try again.";

            // Add assistant response to history
            this.conversationHistory.push({
                role: "assistant",
                content: assistantMessage,
                timestamp: new Date(),
            });

            return assistantMessage;
        } catch (error) {
            console.error("Error calling Groq API:", error);
            const msg = error instanceof Error ? error.message : "Unknown error";
            throw new Error(`Failed to get response from AI: ${msg}`);
        }
    }

    clearHistory() {
        this.conversationHistory = [];
    }

    getHistory(): ChatMessage[] {
        return this.conversationHistory;
    }
}

// Export a singleton instance
export const chatService = new ChatService();
