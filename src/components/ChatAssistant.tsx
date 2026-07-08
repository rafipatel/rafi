import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { chatService, ChatMessage } from "@/lib/chatService";
import { Button } from "@/components/ui/button";

const QUICK_QUESTIONS = [
    "What's his experience with AI/ML?",
    "Tell me about his recent projects",
    "What are his technical skills?",
];

const ChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                {
                    role: "assistant",
                    content:
                        "I can answer questions about Raafi's experience, projects, skills, and background. What would you like to know?",
                    timestamp: new Date(),
                },
            ]);
        }
    }, [isOpen]);

    const handleSendMessage = async (message?: string) => {
        const messageToSend = message || inputValue;
        if (!messageToSend.trim() || isLoading) return;

        const userMessage: ChatMessage = {
            role: "user",
            content: messageToSend,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            const response = await chatService.sendMessage(messageToSend);
            const assistantMessage: ChatMessage = {
                role: "assistant",
                content: response.content,
                timestamp: new Date(),
                provider: response.provider,
                model: response.model,
            };
            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            const errorMessage: ChatMessage = {
                role: "assistant",
                content:
                    "Sorry, I encountered an error. Please try again or reach out to Raafi directly via LinkedIn.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickQuestion = (question: string) => {
        handleSendMessage(question);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const toggleChat = () => setIsOpen(!isOpen);

    const providerLine = (() => {
        const last = [...messages].reverse().find((m) => m.role === "assistant" && m.provider);
        return last ? `${last.provider} · ${last.model}` : "Pollinations AI · Amazon Nova Micro";
    })();

    return (
        <>
            {/* Launcher */}
            {!isOpen && (
                <Button
                    onClick={toggleChat}
                    aria-label="Ask Rafa"
                    className="fixed bottom-6 right-6 z-50 h-12 gap-2 rounded-full px-4 shadow-sm"
                >
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Ask Rafa</span>
                </Button>
            )}

            {/* Chat window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-md"
                    >
                        <div className="flex h-[600px] max-h-[80vh] flex-col overflow-hidden rounded-lg border border-border bg-card shadow-lg">
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-border px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                                    <div>
                                        <h3 className="text-sm font-semibold text-foreground">Rafa</h3>
                                        <p className="text-xs text-muted-foreground">Ask me anything about Raafi</p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={toggleChat}
                                    className="h-8 w-8 p-0"
                                    aria-label="Close chat"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 space-y-3 overflow-y-auto p-4">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[85%] rounded-lg px-3.5 py-2 text-sm leading-relaxed ${
                                                message.role === "user"
                                                    ? "bg-primary text-primary-foreground"
                                                    : "border border-border bg-secondary text-foreground"
                                            }`}
                                        >
                                            <p className="whitespace-pre-wrap break-words">
                                                {(() => {
                                                    const urlRegex = /(https?:\/\/[^\s]+)/g;
                                                    return message.content.split(urlRegex).map((part, i) =>
                                                        part.match(urlRegex) ? (
                                                            <a
                                                                key={i}
                                                                href={part}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="break-all font-medium underline underline-offset-2"
                                                            >
                                                                {part}
                                                            </a>
                                                        ) : (
                                                            part
                                                        )
                                                    );
                                                })()}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                {messages.length === 1 && messages[0].role === "assistant" && (
                                    <div className="space-y-2 pt-1">
                                        <p className="text-center text-xs text-muted-foreground">Quick questions</p>
                                        {QUICK_QUESTIONS.map((question, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleQuickQuestion(question)}
                                                disabled={isLoading}
                                                className="w-full cursor-pointer rounded-md border border-border px-3.5 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {question}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="rounded-lg border border-border bg-secondary px-3.5 py-2">
                                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="border-t border-border p-3">
                                <div className="flex gap-2">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Ask me anything about Raafi..."
                                        className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                        disabled={isLoading}
                                    />
                                    <Button
                                        onClick={() => handleSendMessage()}
                                        disabled={!inputValue.trim() || isLoading}
                                        size="sm"
                                        className="px-3"
                                        aria-label="Send message"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Send className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                                <p className="mt-2 text-center text-xs text-muted-foreground">
                                    Powered by {providerLine}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatAssistant;
