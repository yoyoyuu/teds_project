import { readFile, writeFile } from "fs/promises";
import os from "os";
import path from "path";
import type { RegisterRequest, RegisterResponse, User } from "../../types";

export async function POST({ request }: { request: Request }) {
    try {
        const payload: RegisterRequest = await request.json();

        // Validar datos de entrada
        if (!payload.name || !payload.age || !payload.email || !payload.password || !payload.role) {
            return new Response(JSON.stringify({ success: false, error: "Todos los campos son obligatorios" }),
                { status: 400 }
            );
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
            return new Response(
                JSON.stringify({ success: false, error: "Formato de correo inválido" }),
                { status: 400 }
            );
        }

        if (payload.password.length < 6) {
            return new Response(
                JSON.stringify({ success: false, error: "La contraseña debe tener al menos 6 caracteres" }),
                { status: 400 }
            );
        }

        if (payload.role !== "student" && payload.role !== "teacher") {
            return new Response(
                JSON.stringify({ success: false, error: "El rol debe ser 'student' o 'teacher'" }),
                { status: 400 }
            );
        }

        // Guardar en un archivo temporal
        const usersFilePath = path.join(os.tmpdir(), "teds_project_users.json");

        let users: User[] = [];
        try {
            const raw = await readFile(usersFilePath, "utf-8");
            users = JSON.parse(raw);
        } catch {
            users = [];
        }

        // Validar correo existente
        const exists = users.find((u) => u.email === payload.email);
        if (exists) {
            return new Response(
                JSON.stringify({ success: false, error: "El correo ya está registrado" }),
                { status: 400 }
            );
        }

        const newUser: User = {
            id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
            ...payload,
        };

        users.push(newUser);

        await writeFile(usersFilePath, JSON.stringify(users, null, 2), "utf-8");

        const token = `dummy-${newUser.id}-${Date.now()}`;

        const response: RegisterResponse = {
            success: true,
            message: "Usuario registrado exitosamente",
            user: {
                id: newUser.id,
                name: newUser.name,
                age: newUser.age,
                email: newUser.email,
                role: newUser.role,
            },
            token,
        };

        return new Response(JSON.stringify(response), { status: 200 });

    } catch (error) {
        console.error("Error al registrar:", error);
        return new Response(
            JSON.stringify({ success: false, error: "Error interno del servidor" }),
            { status: 500 }
        );
    }
}
