import { useState } from "react";
import AreaCard from "./AreaCard.jsx";

const areas = [ 
    {
        title: "Operaciones básicas",
        description:
            "Aprende a sumar, restar, multiplicar y dividir números enteros.",
        image: "/images/operaciones.jpg", 
    },
    {
        title: "Fracciones y decimales",
        description:
            "Trabaja con fracciones y aprende a usar decimales en cálculos sencillos.",
        image: "/images/fracciones.jpeg", 
    },
    {
        title: "Números y divisibilidad",
        description:
            "Desarrolla habilidades para resolver problemas más complejos.",
        image: "/images/divisibilidad.png", 
    },
];

export default function AreasPage() {
    const [selectedArea, setSelectedArea] = useState(null);

    const handleStart = () => { // para boton del examen
        if (selectedArea) {
            window.location.href = "/panas";
        }
    };

    return (
        <section className="relative max-w-4xl mx-auto py-10 px-4">
            <button className="mb-6 px-4 py-2 bg-blue-400 hover:bg-[#5995ed] text-white rounded-lg shadow">
                <a href="/">← Volver</a>
            </button>

            <h2 className="text-center text-2xl font-bold text-gray-800 bg-yellow-300 py-2 rounded-md mb-6">
                Áreas de aprendizaje
            </h2>

            {selectedArea && (
                <div className="absolute top-4 right-6 flex items-center gap-2 bg-white border border-gray-400 rounded-lg shadow px-3 py-1">
                    <span className="text-[#931f1d] font-semibold text-sm">
                        Cámara lista para activarse
                    </span>
                    <img
                        src="/images/camera-icon.png"
                        alt="Cámara activada"
                        className="w-5 h-5"
                    />
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
            )}

            <div className="space-y-6">
                {areas.map((area) => (
                    <AreaCard
                        key={area.title}
                        {...area}
                        selected={selectedArea === area.title}
                        onSelect={setSelectedArea}
                    />
                ))}
            </div>

            <div className="sticky bottom-0 py-4 flex justify-center">
                <button
                    onClick={handleStart}
                    disabled={!selectedArea}
                    className={`px-6 py-3 rounded-lg shadow font-medium transition-colors ${selectedArea
                            ? "bg-gray-700 hover:bg-green-600 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    Iniciar examen diagnóstico
                </button>
            </div>
        </section>
    );
}
