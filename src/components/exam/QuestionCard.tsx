import type { JSX } from "astro/jsx-runtime";
import type { Question } from "../../types";

interface QuestionProps {
    question: Question;
    onSelect: (choice: number) => void;
};

export default function QuestionCard({ question, onSelect }: QuestionProps): JSX.Element {
    return (
        <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl mb-4">{question.question}</h3>
            <div className="grid grid-cols-2 gap-3">
                {question.options.map((opt, i) => (
                    <button key={i} onClick={() => onSelect(opt)} className="p-3 bg-gray-100 rounded hover:bg-gray-200">
                        {String.fromCharCode(65 + i)}&#41; {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}
