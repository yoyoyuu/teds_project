import type { JSX } from "astro/jsx-runtime";
import {
    useEffect,
    useRef,
    useState,
    type Dispatch,
    type SetStateAction,
    type RefObject,
} from "react";
import type { Question, ExamResult, Answer } from "../../types";
import PlaceholderImage from "../../assets/dummy_100x100_ffffff_cccccc.png";
import TimerDisplay from "../TimerDisplay";
import QuestionCard from "./QuestionCard";

export default function ExamPage(): JSX.Element {
    const [questions, setQuestions]: [
        Question[] | null,
        Dispatch<SetStateAction<Question[] | null>>,
    ] = useState<Question[] | null>(null);
    const [index, setIndex]: [number, Dispatch<SetStateAction<number>>] =
        useState<number>(0);
    const [answers, setAnswers]: [
        Answer[],
        Dispatch<SetStateAction<Answer[]>>,
    ] = useState<Answer[]>([]);
    const [seconds, setSeconds]: [number, Dispatch<SetStateAction<number>>] =
        useState<number>(0);
    const [result, setResult]: [
        any | null,
        Dispatch<SetStateAction<any | null>>,
    ] = useState<any | null>(null);
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
        timerRef.current = window.setInterval(
            () => setSeconds((s) => s + 1),
            1000
        );
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
            const payload: ExamResult = {
                user_id: "guest",
                answers: finalAnswers,
            };
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
        return <p>Loading exam...</p>;
    }

    if (questions.length === 0) {
        return <p>No questions available.</p>;
    }

    const current: Question = questions[index];

    return (
        <>
            <div className="m-3 flex items-center justify-between">
                <div className="w-1/3 bg-red-400/0">
                    <div className="flex w-67 flex-row items-center rounded-md bg-amber-400 p-3 shadow">
                        <img
                            src={PlaceholderImage.src}
                            alt="categoria"
                            className="h-fit w-fit"
                        />
                        <p className="mx-3 text-xl text-black">
                            Sumas, restas, multiplicación y división
                        </p>
                    </div>
                </div>
                <div className="w-1/3 bg-green-400/0">
                    <div className="mx-auto w-fit rounded-md border-2 border-amber-500 bg-amber-400 px-8 py-2 shadow">
                        <p className="text-center text-xl font-bold">
                            Exámen Diagnóstico
                        </p>
                    </div>
                </div>
                <div className="w-1/3 bg-blue-400/0">
                    <div className="ms-auto flex w-fit flex-row items-center gap-4">
                        <div className="h-fit w-42 rounded-2xl bg-amber-400 px-8 py-3 shadow">
                            <p className="text-center text-4xl font-medium">
                                <TimerDisplay seconds={seconds} />
                            </p>
                        </div>
                        <img
                            src={PlaceholderImage.src}
                            alt="reloj"
                            className="h-fit w-fit"
                        />
                    </div>
                </div>
            </div>
            <QuestionCard
                index={index + 1}
                question={current}
                onSelect={onSelect}
            />
            {result && (
                <div className="m-4 rounded bg-white p-4 shadow">
                    <p>Resultado: {JSON.stringify(result)}</p>
                    <p>Redirigiendo al panel principal...</p>
                </div>
            )}
        </>
    );
}
