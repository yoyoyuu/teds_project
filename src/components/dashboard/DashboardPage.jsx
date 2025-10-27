import { useState } from "react";
import QuickMenu from "./QuickMenu.jsx";

export default function DashboardPage() {
    return (
        <section className="relative max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Panel de Control</h1>
            <QuickMenu/>
        </section>
    );
}