export type FixedLengthArray<T, N extends number, A extends T[] = []> =
    A['length'] extends N
        ? A
        : FixedLengthArray<T, N, [...A, T]>;

export interface ExamResult {
    user_id?: string;
    answers: Array<{ question_id: number; answer: number }>;
}

export interface Question {
    id: number;
    question: string;
    options: FixedLengthArray<number, 4>;
    correct: number;
}

export interface StatsResult {
    user_id: string;
    total_questions: number;
    correct_answers: number;
    wrong_answers: number;
    accuracy: number;
    user_level: string;
    timestamp: string;
}
