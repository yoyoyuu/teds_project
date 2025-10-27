import type { JSX } from "astro/jsx-runtime";
import {
    useEffect,
    useRef,
    useState,
    type Dispatch,
    type SetStateAction,
    type FormEvent,
} from "react";
import type { PanasAnswer, PanasResult } from "../../types";

const LIKERT: string[] = [
    "Nada o muy ligeramente",
    "Un poco",
    "Moderadamente",
    "Bastante",
    "Mucho",
];

const DEFAULT_ITEMS: PanasAnswer[] = [
    { id: 1, label: "Interesado", value: 0 },
    { id: 2, label: "Ilusionado", value: 0 },
    { id: 3, label: "Decidido", value: 0 },
    { id: 4, label: "Angustiado", value: 0 },
    { id: 5, label: "Nervioso", value: 0 },
    { id: 6, label: "Miedoso", value: 0 },
    { id: 7, label: "Atento", value: 0 },
    { id: 8, label: "Alerta", value: 0 },
    { id: 9, label: "Activo", value: 0 },
    { id: 10, label: "Fuerte", value: 0 },
    { id: 11, label: "Avergonzado", value: 0 },
    { id: 12, label: "Culpable", value: 0 },
    { id: 13, label: "Hostil", value: 0 },
    { id: 14, label: "Irritable", value: 0 },
    { id: 15, label: "Agresivo", value: 0 },
];

export default function PanasForm(): JSX.Element {
    const [items, setItems]: [
        PanasAnswer[],
        Dispatch<SetStateAction<PanasAnswer[]>>,
    ] = useState<PanasAnswer[]>(DEFAULT_ITEMS);
    const [error, setError]: [
        string | null,
        Dispatch<SetStateAction<string | null>>,
    ] = useState<string | null>(null);
    const [submitting, setSubmitting]: [
        boolean,
        Dispatch<SetStateAction<boolean>>,
    ] = useState<boolean>(false);

    function setValue(id: number, v: number): void {
        setItems((prev) =>
            prev.map((it) => (it.id === id ? { ...it, value: v } : it))
        );
    }

    function validateAll(): boolean {
        const incomplete: boolean = items.some(
            (it) => it.value < 1 || it.value > 5
        );
        if (incomplete) {
            setError("Por favor responde todas las preguntas.");
        } else {
            setError(null);
        }
        return !incomplete;
    }

    async function onSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();
        if (!validateAll()) {
            return;
        }
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
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            // redirige al panel principal (cumple <5s si es inmediato)
            window.location.href = "/";
        } catch {
            setError("Error al enviar. Intenta nuevamente.");
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-4 p-4">
            <button
                type="button"
                onClick={() => history.back()}
                className="text-left hover:cursor-pointer"
            >
                ◀ Volver
            </button>

            {items.map((it) => (
                <div key={it.id} className="rounded border p-3">
                    <p className="font-medium">{it.label}</p>
                    <div className="mt-2 flex gap-2">
                        {LIKERT.map((txt, idx) => (
                            <label
                                key={idx}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="radio"
                                    name={`q-${it.id}`}
                                    checked={it.value === idx + 1}
                                    onChange={() => setValue(it.id, idx + 1)}
                                />
                                <span className="text-sm">{txt}</span>
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
                    className="rounded bg-blue-600 px-6 py-2 text-white"
                >
                    {submitting ? "Enviando..." : "Finalizar examen"}
                </button>
            </div>
        </form>
    );
}
