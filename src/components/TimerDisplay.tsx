import type { JSX } from "astro/jsx-runtime";

function fmt(s: number): string {
    const mm: string = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const ss: string = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
}

interface TimerDisplayProps {
    seconds: number;
}

export default function TimerDisplay({ seconds }: TimerDisplayProps): JSX.Element {
    return (
        <>
            {fmt(seconds)}
        </>
    );
}
