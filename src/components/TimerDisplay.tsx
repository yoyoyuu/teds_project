import type { JSX } from "astro/jsx-runtime";

function fmt(s: number): string {
    const hh: string = String(Math.floor(s / 3600)).padStart(2, "0");
    const mm: string = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const ss: string = String(s % 60).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
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
