import { readFile, writeFile } from "fs/promises";
import os from "os";
import path from "path";
import type {
    PanasResponseItem,
    PanasResult,
    PanasStoredResult,
} from "../../types";

export interface PanasScores {
    pa: number;
    na: number;
}

/*
 paIds / naIds: sets of question IDs that map to la subescala de Afecto Positivo
 y Afecto Negativo respectivamente. Deben reflejar exactamente los ítems
 de DEFAULT_ITEMS en PanasForm.tsx y quedar documentados/encontrables.
*/
function computeScores(answers: PanasResponseItem[]): PanasScores {
    const paIds: Set<number> = new Set([1, 2, 3, 7, 8, 9, 10]);
    const naIds: Set<number> = new Set([4, 5, 6, 11, 12, 13, 14, 15]);
    let pa: number = 0;
    let na: number = 0;
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
        const filePath: string = path.join(
            os.tmpdir(),
            "teds_project_panas.json"
        );
        let arr: any[] = [];
        try {
            const raw: string = await readFile(filePath, "utf-8");
            arr = JSON.parse(raw);
        } catch {
            arr = [];
        }
        arr.push(result);
        await writeFile(filePath, JSON.stringify(arr, null, 2), "utf-8");
        console.log("Panas result stored:", result);
        return new Response(JSON.stringify(result), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: "server_error" }), {
            status: 500,
        });
    }
}
