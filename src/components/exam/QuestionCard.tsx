import type { JSX } from "astro/jsx-runtime";
import type { Question } from "../../types";

interface QuestionProps {
    index: number;
    question: Question;
    onSelect: (choice: number) => void;
};

export default function QuestionCard({ index, question, onSelect }: QuestionProps): JSX.Element {
    return (
        <>
            <div className="relative mx-18 my-9 rounded-3xl bg-blue-400 p-5">
            <p className="text-md absolute top-1 left-4 font-medium text-white">
                Pregunta {index}
            </p>
            <p className="text-center text-4xl font-semibold text-white">
                {question.question}
            </p>
            </div>
            <div className="mx-24 grid grid-cols-2 gap-x-24 gap-y-8">
                {
                    question.options.map((opt, i) => (
                        <div className="flex justify-center" key={i}>
                            <button className="relative w-full rounded-3xl border border-blue-500 bg-white p-3 shadow hover:cursor-pointer" onClick={() => onSelect(opt)}>
                                <span className="absolute top-1/2 left-0 flex h-16 w-16 -translate-x-1/4 -translate-y-1/2 items-center justify-center rounded-full bg-red-700 text-2xl font-medium text-white">
                                    {String.fromCharCode(97 + i)}&#41;
                                </span>
                                <p className="text-3xl font-medium text-black">{opt}</p>
                            </button>
                        </div>
                    ))
                }
            </div>
        </>
    );
}
