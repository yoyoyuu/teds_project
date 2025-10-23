import { readFile, writeFile } from 'fs/promises';
import type { ExamResult, Question, StatsResult } from '../../types';

function determineLevel(accuracy: number): string {
    if (accuracy < 40) return "básico";
    if (accuracy < 70) return "intermedio";
    return "avanzado";
}

export async function POST({ request }: { request: Request }) {
    const payload: ExamResult = await request.json();

    if (typeof payload.user_id !== "string" || !Array.isArray(payload.answers)) {
        return new Response(JSON.stringify({ error: "Invalid payload" }), { status: 400 });
    }
    
    const qFile: URL = new URL("../../../db/questions.json", import.meta.url);
    const questions: Question[] = JSON.parse(await readFile(qFile, "utf-8"));

    if (typeof questions !== "object" || !Array.isArray(questions)) {
        return new Response(JSON.stringify({ error: "Questions data is corrupted" }), { status: 500 });
    }

    const total: number = questions.length;
    let correct: number = 0;
    for (const a of payload.answers) {
        const q: Question | undefined = questions.find((x) => x.id === a.question_id);
        if (q && q.options[0] === a.answer) {
            correct++;
        }
    }
    const wrong: number = total - correct;
    const accuracy: number = Math.round((correct / total) * 100);
    const user_level: string = determineLevel(accuracy);

    const resultsFile: URL = new URL("../../../db/results.json", import.meta.url);
    let results: StatsResult[] = [];
    try {
        results = JSON.parse(await readFile(resultsFile, "utf-8"));
    } catch {
        results = [];
    }
    const result: StatsResult = {
        user_id: payload.user_id ?? "guest",
        total_questions: total,
        correct_answers: correct,
        wrong_answers: wrong,
        accuracy,
        user_level,
        timestamp: new Date().toISOString(),
    };
    results.push(result);
    await writeFile(resultsFile, JSON.stringify(results, null, 2), "utf-8");

    return new Response(JSON.stringify(result), { status: 200 });
}
