import { useState } from "react";
import ButtonPrimary from "../ui/ButtonPrimary";

export default function MainPage() {
    const [hovered, setHovered] = useState(null);

    const handleNavigation = (path) => {
        window.location.href = path;
    };

    return (
        <div className="flex flex-col items-center justify-between min-h-screen text-center">
            <img src="/images/logo/logo_temp.svg" alt="Logo Feel-Face" className="w-60 my-5" />

            <div className="flex gap-2 mb-8">
                {["Registrarse", "Inicio de Sesión"].map((text, idx) => (
                    <ButtonPrimary
                        key={idx}
                        text={text}
                        isHovered={hovered === idx}
                        onMouseEnter={() => setHovered(idx)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => {
                            if (text === "Registrarse") {
                                window.location.href = "/register";
                            } else {
                                window.location.href = "/login";
                            }
                        }}
                    />
                ))}
            </div>


            <section className="text-gray-800 p-6 max-w-4xl mx-auto rounded-t-lg space-y-6">
                <div className="bg-[#FFB30F] p-4 rounded-lg shadow-sm">
                    <h2 className="text-lg sm:text-2xl md:text-2xl font-bold mb-2">
                        ¿Qué hace esta plataforma y por qué es especial?
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Busca adaptar tu aprendizaje y la forma en que vas desarrollando conocimientos
                        por medio de tus emociones y tu sentir a la hora de aprender.
                    </p>
                </div>

                <div className="bg-[#FFB30F] p-4 rounded-lg shadow-sm">
                    <h2 className="text-lg sm:text-2xl md:text-2xl font-bold mb-2">
                        ¿Qué queremos lograr contigo?
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Queremos que aprender deje de ser frustrante o tedioso y se sienta bien para todos los niños.
                        ¡Buscamos que aprendas disfrutando y sintiéndote acompañado en cada paso!
                    </p>
                </div>
            </section>
        </div>
    );
}
