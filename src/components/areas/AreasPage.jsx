import { useState } from "react";
import AreaCard from "./AreaCard.jsx";

const areas = [
    {
        title: "Operaciones básicas",
        description:
            "Aprende a sumar, restar, multiplicar y dividir números enteros, incluyendo negativos. Practica las tablas de multiplicar y la propiedad distributiva para fortalecer tu base matemática.",
        image: "/images/numeros.png", // considerar poner imagen despues
    },
    {
        title: "Fracciones y decimales",
        description:
            "Trabaja con fracciones equivalentes, simplificación, comparación y operaciones combinadas. Aprende a usar decimales y mezcla fracciones y decimales en cálculos sencillos.",
        image: "/images/operaciones.png", // considerar poner imagen despues
    },
    {
        title: "Numeros y divisibilidad",
        description:
            "Descubre los números primos y compuestos, aprende a factorizar, y calcula el máximo común divisor y el mínimo común múltiplo. Desarrolla habilidades para resolver problemas más complejos.",
        image: "/images/fracciones.png", // considerar poner imagen despues
    },
];

export default function AreasPage() {
    const [selectedArea, setSelectedArea] = useState(null); 

    const handleStart = () => {
        if (selectedArea) {
            window.location.href = "/diagnostico";
        }
    };

    return (
        <section className="max-w-4xl mx-auto py-10 px-4">
            <button className="mb-6 px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg shadow">
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
        </section>
    );
}