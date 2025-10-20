import { useState } from "react";
import AreaCard from "./AreaCard.jsx";

const areas = [
    {
        title: "Operaciones básicas",
        description:
            "Aprende a sumar, restar, multiplicar y dividir números enteros, incluyendo negativos. Practica las tablas de multiplicar y la propiedad distributiva para fortalecer tu base matemática.",
        image: "/images/operaciones.jpg", // considerar poner imagen despues
    },
    {
        title: "Fracciones y decimales",
        description:
            "Trabaja con fracciones equivalentes, simplificación, comparación y operaciones combinadas. Aprende a usar decimales y mezcla fracciones y decimales en cálculos sencillos.",
        image: "/images/fracciones.jpeg", // considerar poner imagen despues
    },
    {
        title: "Numeros y divisibilidad",
        description:
            "Descubre los números primos y compuestos, aprende a factorizar, y calcula el máximo común divisor y el mínimo común múltiplo. Desarrolla habilidades para resolver problemas más complejos.",
        image: "/images/divisibilidad.png", // considerar poner imagen despues
    },
];

export default function AreasPage() {
    const [selectedArea, setSelectedArea] = useState(null);

    const handleStart = () => { // para boton del examen
        if (selectedArea) {
            window.location.href = "/diagnostico";
        }
    };

    return (
        <section className="max-w-4xl mx-auto py-10 px-4">
            <button className="mb-6 px-4 py-2 bg-blue-400 hover:bg-[#5995ed] text-white rounded-lg shadow">
                <a href="/">← Volver</a>
            </button>

            <h2 className="text-center text-2xl font-bold text-gray-800 bg-yellow-300 py-2 rounded-md mb-6">
                Áreas de aprendizaje
            </h2>

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
                        ? "bg-gray-700  hover:bg-green-600 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    Iniciar examen diagnóstico
                </button>
            </div>
        </section>
    );
}