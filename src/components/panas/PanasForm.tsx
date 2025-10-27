import type { JSX } from "astro/jsx-runtime";
import { useState, type Dispatch, type SetStateAction, type FormEvent } from "react";
import type { PanasAnswer, PanasResult } from "../../types";

const LIKERT: string[] = [
    "0: Muy poco o nada en absoluto 🙁",
    "1: Un poco 🙂",
    "2: Moderadamente 😊",
    "3: Bastante 😄",
    "4: Extremadamente 🤩",
];

const DEFAULT_ITEMS: PanasAnswer[] = [
    { id: 1, label: "¿Qué tan feliz te sientes ahora que vas a iniciar el examen?", value: 0 }, // happy
    { id: 2, label: "¿Te sientes sorprendido(a) por tener que hacer este examen?", value: 0 }, // surprised
    { id: 3, label: "¿Qué tan relajado(a) estás?", value: 0 }, // calm
    { id: 4, label: "¿Te sientes triste o con ganas de no hacer nada?", value: 0 }, // sad
    { id: 5, label: "¿Qué tan molesto(a) estás en este momento?", value: 0 }, // angry
    { id: 6, label: "¿Te sientes confundido(a) o sin entender muy bien qué tienes que hacer?", value: 0 }, // confused
    { id: 7, label: "¿Qué tan nervioso(a) o asustado(a) te sientes por el examen?", value: 0 }, // fear
    { id: 8, label: "¿Sientes algo diferente que no sabes explicar (ni bueno ni malo)?", value: 0 }, // unknown
];

export default function PanasForm(): JSX.Element {
    const [items, setItems]: [PanasAnswer[], Dispatch<SetStateAction<PanasAnswer[]>>] =
        useState<PanasAnswer[]>(DEFAULT_ITEMS);
    const [error, setError]: [string | null, Dispatch<SetStateAction<string | null>>] =
        useState<string | null>(null);
    const [submitting, setSubmitting]: [boolean, Dispatch<SetStateAction<boolean>>] =
        useState<boolean>(false);

    function setValue(id: number, v: number): void {
        setItems((prev) =>
            prev.map((it) => (it.id === id ? { ...it, value: v } : it))
        );
    }

    function validateAll(): boolean {
        const incomplete = items.some((it) => it.value < 1 && it.value > 5);
        if (incomplete) {
            setError("Por favor responde todas las preguntas.");
        } else {
            setError(null);
        }
        return !incomplete;
    }

    async function onSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();
        if (!validateAll()) return;

        setSubmitting(true);

        const payload: PanasResult = {
            user_id: "guest",
            answers: items.map((it) => ({
                question_id: it.id,
                value: it.value,
            })),
        };

        try {
            await fetch("/api/panas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            window.location.href = "/diagnostic-exam";
        } catch {
            setError("Error al enviar. Intenta nuevamente.");
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-6 p-6 max-w-6xl mx-auto w-full">
            {items.map((it, index) => (
                <div
                    key={it.id}
                    className={`rounded-lg border-2 p-6 w-full shadow-md ${index % 2 === 0
                            ? "bg-orange-300 border-orange-400"
                            : "bg-blue-300 border-blue-400"
                        }`}
                >
                    <p className="font-medium text-lg">{it.label}</p>

                    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-4 flex-wrap">
                        {LIKERT.map((txt, idx) => (
                            <label key={idx} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name={`q-${it.id}`}
                                    checked={it.value === idx}
                                    onChange={() => setValue(it.id, idx)}
                                />
                                <span className="text-base">{txt}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}


            {error && <p className="text-red-600">{error}</p>}

            <div className="text-center">
                <button
                    type="submit"
                    disabled={submitting}
                    className="rounded bg-blue-500 hover:bg-blue-600 px-6 py-2 text-white"
                >
                    {submitting ? "Enviando..." : "Finalizar cuestionario"}
                </button>
            </div>
        </form>

    );
}
