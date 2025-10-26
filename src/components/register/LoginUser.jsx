import { useState } from "react";
import BackButton from "../ui/BackButton.jsx";

export default function LoginUser() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                alert("Inicio de sesión exitoso");
                setTimeout(() => {
                    window.location.href = "/areas";
                }, 1000);
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative">
            <BackButton to="/" position="top-4 left-4" />

            <h1 className="text-3xl font-bold mb-6 text-center">Iniciar Sesión</h1>

            <div className="bg-white shadow-lg rounded-xl p-8 w-80 flex flex-col items-center">
                <div className="text-6xl mb-6 text-gray-600">👤</div>

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        className="border rounded-md p-2"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        className="border rounded-md p-2"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`mt-2 rounded-md py-2 font-semibold text-white transition-colors ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                            }`}
                    >
                        {loading ? "Ingresando..." : "Iniciar sesión"}
                    </button>
                </form>
            </div>
        </div>
    );
}
