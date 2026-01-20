// Groq API Configuration
// Note: In production, use environment variables. For demo purposes, the key is embedded.

export const GROQ_CONFIG = {
    apiKey: import.meta.env.VITE_GROQ_API_KEY || "",
    model: "llama-3.3-70b-versatile", // Fast and high-quality
    temperature: 0.7,
    maxTokens: 500,
    topP: 1,
};
