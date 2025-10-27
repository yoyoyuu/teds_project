import { readFile } from "fs/promises";
import os from "os";
import path from "path";

export async function GET({ request }: { request: Request }) {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response(
            JSON.stringify({ success: false, error: "No autorizado" }),
            { status: 401 }
        );
    }

    const token = authHeader.replace("Bearer ", "");
    const userId = parseInt(token.split("-")[1]);

    const usersFilePath = path.join(os.tmpdir(), "teds_project_users.json");

    try {
        const data = await readFile(usersFilePath, "utf-8");
        const users = JSON.parse(data);
        const user = users.find((u: any) => u.id === userId);

        if (!user) {
            return new Response(
                JSON.stringify({ success: false, error: "Usuario no encontrado" }),
                { status: 404 }
            );
        }

        const { password, ...safeUser } = user;
        return new Response(
            JSON.stringify({ success: true, user: safeUser }),
            { status: 200 }
        );
    } catch {
        return new Response(
            JSON.stringify({ success: false, error: "Error al cargar usuario" }),
            { status: 500 }
        );
    }
}
