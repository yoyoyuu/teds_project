import type { JSX } from "astro/jsx-runtime";
import { useEffect, useRef, useState, type Dispatch, type SetStateAction, type RefObject } from 'react';
import type { Question, ExamResult, Answer } from "../../types";
import PlaceholderImage from "../../assets/dummy_100x100_ffffff_cccccc.png";

export default function ExamPage(): JSX.Element {
    const [questions, setQuestions]: [Question[] | null, Dispatch<SetStateAction<Question[] | null>>] = useState<Question[] | null>(null);
    const [index, setIndex]: [number, Dispatch<SetStateAction<number>>] = useState<number>(0);
    const [answers, setAnswers]: [Answer[], Dispatch<SetStateAction<Answer[]>>] = useState<Answer[]>([]);
    const [seconds, setSeconds]: [number, Dispatch<SetStateAction<number>>] = useState<number>(0);
    const [result, setResult]: [any | null, Dispatch<SetStateAction<any | null>>] = useState<any | null>(null);
    const timerRef: RefObject<number | null> = useRef<number | null>(null);

    useEffect(() => {
        const ac: AbortController = new AbortController();
        const timeout: NodeJS.Timeout = setTimeout(() => ac.abort(), 5000);
        fetch("/api/questions", { signal: ac.signal })
            .then((r) => r.json())
            .then((data) => setQuestions(data))
            .catch(() => setQuestions([]))
            .finally(() => clearTimeout(timeout));
    }, []);

    useEffect(() => {
        if (!questions || questions.length === 0) return;
        timerRef.current = window.setInterval(() => setSeconds((s) => s + 1), 1000);
        const onUnload: () => void = () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
        window.addEventListener("beforeunload", onUnload);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            window.removeEventListener("beforeunload", onUnload); 
        };
    }, [questions]);

    const onSelect = (choice: number) => {
        const q: Question = questions![index];
        setAnswers((p) => [...p, { question_id: q.id, answer: choice }]);
        if (index + 1 < (questions ?? []).length) setIndex(index + 1);
        else finish([...answers, { question_id: q.id, answer: choice }]);
    };

    async function finish(finalAnswers: Answer[]) {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            const payload: ExamResult = { user_id: "guest", answers: finalAnswers };
            try {
                const res: Response = await fetch("/api/submit", {
                   method: "POST",
                   headers: { "Content-Type": "application/json" },
                   body: JSON.stringify(payload), 
                });
                const data = await res.json();
                setResult(data);
                setTimeout(() => (window.location.href = "/"), 3000);
            } catch (err) {
                console.error(err);
                setResult({ error: "submit_failed" });
                setTimeout(() => (window.location.href = "/"), 3000);
            }
        }
    }

    if (questions === null) {
        return (
            <p>
                Loading exam...
            </p>
        );
    }

    if (questions.length === 0) {
        return (
            <p>
                No questions available.
            </p>
        );
    }

    const current: Question = questions[index];

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between p-4 bg-amber-400 rounded shadow">
                <div className="flex items-center gap-4">
                    <img src={PlaceholderImage.src} alt="categoria" className="w-16 h-16 object-cover rounded" />
                    <div>
                        <p className="text-xl font-medium">Sumas, restas, multiplicación y división</p>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-lg font-bold">Examen Diagnóstico</p>
                </div>
                <div className="flex items-center gap-4">
                    {/* Timer seconds={seconds} */}
                    <img src={PlaceholderImage.src} alt="reloj" className="w-12 h-12" />
                </div>
            </header>

            <div className="p-6 bg-blue-400 text-white rounded">
                <p className="text-sm">Pregunta {index + 1}</p>
                <h2 className="text-2xl font-semibold mt-2">{current.question}</h2>
            </div>

            {/* QuestionCard question={current} onSelect={onSelect} */}

            {result && (
                <div className="p-4 bg-white rounded shadow">
                    <p>Resultado: {JSON.stringify(result)}</p>
                    <p>Redirigiendo al panel principal...</p>
                </div>
            )}
        </div>
    );
}

