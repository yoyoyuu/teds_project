import { readFile, writeFile } from "fs/promises";
import os from "os";
import path from "path";
import type {
    PanasResponseItem,
    PanasResult,
    PanasStoredResult,
} from "../../types";

export interface PanasScores {
    pa: number; // Afecto positivo
    na: number; // Afecto negativo
}

/*
Ítems y subescalas:

1. 😄 happy → Afecto positivo (PA)
2. 😲 surprised → Afecto negativo (NA)
3. 😌 calm → Afecto positivo (PA)
4. 😢 sad → Afecto negativo (NA)
5. 😠 angry → Afecto negativo (NA)
6. 😕 confused → Afecto negativo (NA)
7. 😰 fear → Afecto negativo (NA)
8. 😶 unknown → neutro (no se suma en PA/NA)
*/

function computeScores(answers: PanasResponseItem[]): PanasScores {
    const paIds: Set<number> = new Set([1, 3]); // happy, calm
    const naIds: Set<number> = new Set([2, 4, 5, 6, 7]); // surprised, sad, angry, confused, fear

    let pa = 0;
    let na = 0;

    for (const a of answers) {
        if (paIds.has(a.question_id)) {
            pa += a.value;
        }
        if (naIds.has(a.question_id)) {
            na += a.value;
        }
    }

    return { pa, na };
}

export async function POST({ request }: { request: Request }) {
    try {
        const payload: PanasResult = await request.json();

        if (!Array.isArray(payload.answers)) {
            return new Response(JSON.stringify({ error: "Invalid payload" }), {
                status: 400,
            });
        }

        const { pa, na }: PanasScores = computeScores(payload.answers);

        const result: PanasStoredResult = {
            user_id: payload.user_id ?? "guest",
            pa_score: pa,
            na_score: na,
            timestamp: new Date().toISOString(),
        };

        const filePath: string = path.join(os.tmpdir(), "teds_project_panas.json");

        let arr: any[] = [];
        try {
            const raw: string = await readFile(filePath, "utf-8");
            arr = JSON.parse(raw);
        } catch {
            arr = [];
        }

        arr.push(result);

        await writeFile(filePath, JSON.stringify(arr, null, 2), "utf-8");
        console.log("Cuestionario emocional almacenado:", result);

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: "server_error" }), {
            status: 500,
        });
    }
}

