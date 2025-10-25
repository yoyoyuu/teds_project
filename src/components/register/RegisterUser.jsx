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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        if (formData.password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres");
            return;
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
