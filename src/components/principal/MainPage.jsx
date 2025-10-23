// src/components/principal/MainPage.jsx
import { useState } from "react";

export default function MainPage() {
    const [hovered, setHovered] = useState(null);

    return (
        <div className="flex flex-col items-center justify-between min-h-screen text-center">
            <img src="/images/logo/logo_temp.jpg" alt="Logo Feel-Face" className="w-90 my-2" />

            <div className="flex gap-2 mb-75">
                {["Registrarse", "Inicio de Sesión"].map((text, idx) => (
                    <button
                        key={idx}
                        onMouseEnter={() => setHovered(idx)}
                        onMouseLeave={() => setHovered(null)}
                        className={`px-6 py-3 rounded-md text-sm font-semibold transition-all duration-300 
                            ${hovered === idx ? "bg-green-600 text-white" : "bg-blue-500 text-white"
                            }`}
                    >
                        {text}
                    </button>
                ))}
            </div>
        </div>

    );
}
