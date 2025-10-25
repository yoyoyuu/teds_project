import { readFile } from "fs/promises";
import os from "os";
import path from "path";

export async function POST({ request }: { request: Request }) {
    const { email, password } = await request.json();

    if (!email || !password) {
        return new Response(
            JSON.stringify({ success: false, error: "Todos los campos son obligatorios" }),
            { status: 400 }
        );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return new Response(
            JSON.stringify({ success: false, error: "Formato de correo inválido" }),
            { status: 400 }
        );
    }

    const usersFilePath = path.join(os.tmpdir(), "teds_project_users.json");
    let users = [];

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}