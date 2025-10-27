import type { EmotionEntry } from "../../types";

// Simple facial recognition stub API
// Returns a simulated emotion payload. Replace this with a real
// implementation (e.g., AWS Rekognition or a model) later.
export async function POST({ request }: { request: Request }) {
    try {
        const emotions: string[] = [
            "neutral",
            "concentration",
            "frustration",
            "boredom",
            "happy",
        ];
        const emotion: string = emotions[Math.floor(Math.random() * emotions.length)];
        const confidence: number = +(0.6 + Math.random() * 0.4).toFixed(2);
        const payload: EmotionEntry = {
            emotion,
            confidence,
            timestamp: new Date().toISOString(),
        };
        return new Response(JSON.stringify(payload), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: "facial_stub_error" }), {
            status: 500,
        });
    }
}
