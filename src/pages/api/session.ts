import { readFile, writeFile } from "fs/promises";
import os from "os";
import path from "path";
import type { ExamResult } from "../../types";

const FILE = path.join(os.tmpdir(), "teds_project_sessions.json");

export async function POST({ request }: { request: Request }) {
    try {
        const payload: ExamResult = await request.json();
        let arr: any[] = [];
        try {
            const raw = await readFile(FILE, "utf-8");
            arr = JSON.parse(raw);
        } catch {
            arr = [];
        }
        const user = payload.user_id ?? "guest";
        const idx = arr.findIndex((x) => x.user_id === user);
        const toSave = {
            user_id: user,
            timestamp: new Date().toISOString(),
            payload,
        };
        if (idx >= 0) arr[idx] = toSave;
        else arr.push(toSave);
        await writeFile(FILE, JSON.stringify(arr, null, 2), "utf-8");
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (err) {
        console.error("session save error", err);
        return new Response(JSON.stringify({ ok: false }), { status: 500 });
    }
}

export async function GET({ request }: { request: Request }) {
    try {
        const url = new URL(request.url);
        const user = url.searchParams.get("user") ?? "guest";
        try {
            const raw = await readFile(FILE, "utf-8");
            const arr = JSON.parse(raw) as any[];
            const found = arr.find((x) => x.user_id === user);
            return new Response(JSON.stringify(found ?? null), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } catch {
            return new Response(JSON.stringify(null), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (err) {
        console.error("session get error", err);
        return new Response(JSON.stringify({ ok: false }), { status: 500 });
    }
}
