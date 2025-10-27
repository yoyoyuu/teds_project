export type FixedLengthArray<
    T,
    N extends number,
    A extends T[] = [],
> = A["length"] extends N ? A : FixedLengthArray<T, N, [...A, T]>;

// Exam and Question Types

export interface Answer {
    question_id: number;
    answer: number;
    /** Time spent in milliseconds answering this question (optional) */
    time_spent_ms?: number;
}

export interface ExamResult {
    user_id?: string;
    answers: Answer[];
    /** optional emotion log captured during the session */
    emotion_log?: EmotionEntry[];
}

export interface EmotionEntry {
    timestamp: string; // ISO
    emotion: string; // e.g. 'concentration', 'frustration', 'boredom', 'neutral'
    confidence?: number; // 0..1
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

// Register and User Types

export type UserRole = "student" | "teacher";

export interface User {
    id: number;
    name: string;
    age: number;
    email: string;
    password: string;
    role: UserRole;
}

export interface RegisterRequest {
    name: string;
    age: number;
    email: string;
    password: string;
    role: UserRole;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    user?: Omit<User, "password">; // devolver datos sin la contraseña
}

export interface PanasAnswer {
    id: number;
    label: string;
    value: number;
}

export interface PanasResponseItem {
    question_id: number;
    value: number;
}

export interface PanasResult {
    user_id?: string;
    answers: PanasResponseItem[];
    pa_score?: number;
    na_score?: number;
    timestamp?: string;
}

export interface PanasStoredResult {
    user_id: string;
    pa_score: number;
    na_score: number;
    timestamp: string;
}
