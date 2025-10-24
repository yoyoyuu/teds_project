import { readFile } from 'fs/promises';

export async function GET() {
    const file: URL = new URL("../../../db/questions.json", import.meta.url);
    const data: string = await readFile(file, "utf-8");
    return new Response(data, { headers: { "Content-Type": "application/json" } });
}
