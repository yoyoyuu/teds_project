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


    return new Response(JSON.stringify({ success: true }), { status: 200 });

}