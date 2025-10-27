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

    const handleStart = () => {
        // para boton del examen
        if (selectedArea) {
            window.location.href = "/diagnostic-exam";
        }
    };

    return (
        <section className="relative mx-auto max-w-4xl px-4 py-10">
            <button className="mb-6 rounded-lg bg-blue-400 px-4 py-2 text-white shadow hover:bg-[#5995ed]">
                <a href="/">← Volver</a>
            </button>

            <h2 className="mb-6 rounded-md bg-yellow-300 py-2 text-center text-2xl font-bold text-gray-800">
                Áreas de aprendizaje
            </h2>

            {selectedArea && (
                <div className="absolute top-4 right-6 flex items-center gap-2 rounded-lg border border-gray-400 bg-white px-3 py-1 shadow">
                    <span className="text-sm font-semibold text-[#931f1d]">
                        Cámara lista para activarse
                    </span>
                    <img
                        src="/images/camera-icon.png"
                        alt="Cámara activada"
                        className="h-5 w-5"
                    />
                    <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
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

            <div className="sticky bottom-0 flex justify-center py-4">
                <button
                    onClick={handleStart}
                    disabled={!selectedArea}
                    className={`rounded-lg px-6 py-3 font-medium shadow transition-colors ${
                        selectedArea
                            ? "bg-gray-700 text-white hover:bg-green-600"
                            : "cursor-not-allowed bg-gray-300 text-gray-500"
                    }`}
                >
                    Iniciar examen diagnóstico
                </button>
            </div>
        </section>
    );
}
