export type FixedLengthArray<T, N extends number, A extends T[] = []> =
    A['length'] extends N
        ? A
        : FixedLengthArray<T, N, [...A, T]>;

// Exam and Question Types

export interface Answer {
    question_id: number;
    answer: number;
}

export interface ExamResult {
    user_id?: string;
    answers: Answer[];
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
