import { useState, useEffect } from "react";
import { GearIcon } from "@radix-ui/react-icons";
import {
    QuickMenu,
    UserProfileModal,
    ProgressBar,
    DailyReinforcement,
    DailyChallenge,
    ActivitiesModal,
} from "../dashboard";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showActivities, setShowActivities] = useState(false);
    const [dailyChallengeUsed, setDailyChallengeUsed] = useState(false);

    // Para cargar al usuario desde localStorage (TEMPORAL)
    useEffect(() => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");

        if (!token || !username) {
            window.location.href = "/login";
        } else {
            setUser({ name: username });
        }
    }, []);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
                Cargando dashboard...
            </div>
        );
    }

    // Para el logout
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        window.location.href = "login";
    };

    const reinforcementTopics = [
        "Pares e Impares",
        "Sumas y Restas",
        "Límites",
        "Multiplicación y División",
    ];

    const activities = [
        { id: 1, name: "Opción múltiple", icon: "📋" },
        { id: 2, name: "Relación de columnas", icon: "🔗" },
        { id: 3, name: "Verdadero y falso", icon: "✓✗" },
    ];

    return (
        <div className="min-h-screen">
            <div className="relative p-8">
                <div className="fixed left-5 top-20 flex flex-col gap-4">
                    <button
                        className="bg-[#5995ed] p-4 rounded-lg hover:bg-blue-500 transition-colors relative z-50"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <GearIcon className="text-white text-3xl w-8 h-8" />
                    </button>

                    {showMenu && (
                        <QuickMenu
                            onProfileClick={() => {
                                setShowProfile(true);
                                setShowMenu(false);
                            }}
                            onLogoutClick={handleLogout}
                            onClose={() => setShowMenu(false)}
                        />
                    )}
                </div>

                <div className="max-w-4xl mx-auto text-center mt-10">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="flex items-center gap-2 bg-white border-2 border-[#ffb30f] rounded-lg px-4 py-2 shadow-sm">
                            <div className="text-[#ffb30f] text-3xl">🔥</div>
                            <span className="text-2xl font-bold text-gray-800">3</span>
                        </div>
                        <span className="text-gray-600 text-lg font-medium">días de racha</span>
                    </div>

                    <ProgressBar progress={70} />

                    <button
                        className="mt-8 bg-[#5995ed] hover:bg-blue-500 text-white text-4xl font-bold py-8 px-16 rounded-lg transition-colors"
                        onClick={() => setShowActivities(true)}
                    >
                        ¡Empezar Ya!
                    </button>
                </div>


                <div className="fixed right-8 top-32 flex flex-col gap-6">
                    <DailyReinforcement topics={reinforcementTopics} />
                    <DailyChallenge
                        used={dailyChallengeUsed}
                        onClick={() => {
                            if (!dailyChallengeUsed) {
                                setDailyChallengeUsed(true);
                                alert("Simulando desafío diario: completado");
                            }
                        }}
                    />
                </div>
            </div>

            {showProfile && (
                <UserProfileModal
                    user={user}
                    onClose={() => setShowProfile(false)}
                />
            )}

            {showActivities && (
                <ActivitiesModal
                    activities={activities}
                    onSelect={(name) => {
                        alert(`Iniciando ${name}`);
                        setShowActivities(false);
                    }}
                    onClose={() => setShowActivities(false)}
                />
            )}
        </div>
    );
}
