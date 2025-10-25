import { useState } from "react";
import BackButton from "../ui/BackButton.jsx";

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
                alert((data.error || "Error al registrar"));
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
        </div>
    );
}
