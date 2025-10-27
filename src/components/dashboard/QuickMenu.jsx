import { useState } from "react";
import { GearIcon, PersonIcon, Cross2Icon, FileTextIcon } from "@radix-ui/react-icons";

export default function QuickMenu({ onProfileClick, onLogoutClick }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed left-5 top-25 flex flex-col gap-4">
            <button
                className="bg-blue-400 p-4 rounded-lg hover:bg-blue-500 transition-colors relative"
                onClick={() => setOpen(!open)}
            >
                <GearIcon className="text-white text-3xl w-8 h-8" />
            </button>

            {open && (
                <div className="absolute left-24 top-16 bg-white border-2 border-blue-400 rounded-lg shadow-lg w-56 z-50">
                    <button
                        className="w-full px-4 py-3 text-left hover:bg-blue-100 border-b border-gray-200 flex items-center gap-2"
                        onClick={() => {
                            onProfileClick();
                            setOpen(false);
                        }}
                    >
                        <PersonIcon className="text-xl w-5 h-5" />
                        Perfil de Usuario
                    </button>

                    <button
                        className="w-full px-4 py-3 text-left text-gray-400 border-b border-gray-200 flex items-center gap-2 cursor-not-allowed"
                        disabled
                    >
                        <FileTextIcon className="text-xl w-5 h-5" />
                        Mostrar Informe
                    </button>

                    <button
                        className="w-full px-4 py-3 text-left text-gray-400 border-b border-gray-200 flex items-center gap-2 cursor-not-allowed"
                        disabled
                    >
                        <GearIcon className="text-xl w-5 h-5" />
                        Configuración
                    </button>

                    <button
                        className="w-full px-4 py-3 text-left hover:bg-red-100 text-red-600 flex items-center gap-2"
                        onClick={onLogoutClick}
                    >
                        <Cross2Icon className="text-xl w-5 h-5" />
                        Cerrar Sesión
                    </button>
                </div>
            )}
        </div>
    );
}
