import { useState } from "react";
import BackButton from "../ui/BackButton.jsx";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";

export default function RegisterUser() {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        if (formData.password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        setLoading(true);

        try {
            const userData = {
                name: formData.name.trim(),
                age: Number(formData.age),
                email: formData.email.trim(),
                password: formData.password,
                role: "student", // fijo por ahora ps nomas
            };

            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                alert("Registro exitoso");
                window.location.href = "/areas";
            } else {
                alert(data.error || "Error al registrar");
            }
        } catch (err) {
            console.error("Error al registrar:", err);
            alert("No se pudo conectar con el servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative">
            <BackButton to="/" position="top-4 left-4" />

            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Registrar Usuario
            </h1>

            <div className="bg-white shadow-lg rounded-xl p-8 w-80 flex flex-col items-center">
                <div className="text-6xl mb-6 text-gray-600">👤</div>

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre completo"
                        value={formData.name}
                        onChange={handleChange}
                        className="border rounded-md p-2"
                        required
                    />

                    <input
                        type="number"
                        name="age"
                        placeholder="Edad (7–11 años)"
                        value={formData.age}
                        onChange={handleChange}
                        className="border rounded-md p-2"
                        min="7"
                        max="11"
                        required
                    />

                    <div className="relative">
                        <EnvelopeClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            value={formData.email}
                            onChange={handleChange}
                            className="border rounded-md p-2 pl-10 w-full"
                            required
                        />
                    </div>

                    <div className="relative">
                        <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            className="border rounded-md p-2 pl-10 w-full"
                            required
                        />
                    </div>

                    <div className="relative">
                        <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmar contraseña"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="border rounded-md p-2 pl-10 w-full"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`mt-2 rounded-md py-2 font-semibold text-white transition-colors ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                    >
                        {loading ? "Registrando..." : "Registrar"}
                    </button>
                </form>
            </div>
        </div>
    );
}
