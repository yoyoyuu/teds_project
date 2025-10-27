import type { JSX } from "astro/jsx-runtime";
import { useEffect, useRef, useState } from "react";

export interface EmotionPayload {
    emotion: string;
    confidence?: number;
    timestamp: string;
}

interface CameraStubProps {
    onEmotion?: (e: EmotionPayload) => void;
    pollIntervalMs?: number;
}

export default function CameraStub({
    onEmotion,
    pollIntervalMs = 3000,
}: CameraStubProps): JSX.Element {
    const [active, setActive] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (intervalRef.current) window.clearInterval(intervalRef.current);
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = (
                    videoRef.current.srcObject as MediaStream
                ).getTracks();
                tracks.forEach((t) => t.stop());
            }
        };
    }, []);

    async function startCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false,
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play().catch(() => {});
            }
            setActive(true);
            intervalRef.current = window.setInterval(async () => {
                try {
                    const res = await fetch("/api/facial", { method: "POST" });
                    if (!res.ok) return;
                    const json = await res.json();
                    onEmotion?.(json as EmotionPayload);
                } catch (err) {
                    // ignore polling errors in stub
                }
            }, pollIntervalMs) as unknown as number;
        } catch (err) {
            setActive(false);
        }
    }

    function stopCamera() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = (
                videoRef.current.srcObject as MediaStream
            ).getTracks();
            tracks.forEach((t) => t.stop());
            videoRef.current.srcObject = null;
        }
        setActive(false);
    }

    return (
        <div className="flex items-center gap-3">
            <div className="relative">
                <video
                    ref={videoRef}
                    className="h-20 w-28 rounded-md bg-black object-cover"
                    autoPlay
                    muted
                    playsInline
                />
                <span
                    className={`absolute top-1 right-1 inline-block h-3 w-3 rounded-full ${active ? "animate-pulse bg-green-500" : "bg-gray-400"}`}
                />
            </div>
            <div className="flex flex-col gap-2">
                <button
                    type="button"
                    onClick={() => (active ? stopCamera() : startCamera())}
                    className="rounded bg-blue-600 px-3 py-1 text-white hover:cursor-pointer"
                >
                    {active ? "Apagar cámara" : "Activar cámara"}
                </button>
                <p className="text-xs text-gray-600">
                    Cámara (simulada) — emotions polling every{" "}
                    {pollIntervalMs / 1000}s
                </p>
            </div>
        </div>
    );
}
