import { readFile } from "fs/promises";
import os from "os";
import path from "path";
import type { User, RegisterResponse } from "../../types";

export async function POST({ request }: { request: Request }) {
    try {
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
        let users: User[] = [];

        try {
            const data = await readFile(usersFilePath, "utf-8");
            users = JSON.parse(data);
        } catch {
            return new Response(
                JSON.stringify({ success: false, error: "No hay usuarios registrados" }),
                { status: 404 }
            );
        }

        const user = users.find(u => u.email === email);

        if (!user || user.password !== password) {
            return new Response(
                JSON.stringify({ success: false, error: "Email o contraseña incorrectos" }),
                { status: 401 }
            );
        }

        const { password: _, ...safeUser } = user;

        const token = `dummy-${safeUser.id}-${Date.now()}`;

        const response: RegisterResponse = {
            success: true,
            message: "Inicio de sesión exitoso",
            user: safeUser,
            token,
        };

        return new Response(JSON.stringify(response), { status: 200 });

    } catch (error) {
        console.error("Error al hacer login:", error);
        return new Response(
            JSON.stringify({ success: false, error: "Error interno del servidor" }),
            { status: 500 }
        );
    }
}
