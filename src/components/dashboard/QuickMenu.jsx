import { PersonIcon, Cross2Icon, FileTextIcon, GearIcon } from "@radix-ui/react-icons";

export default function QuickMenu({ onProfileClick, onLogoutClick, onClose }) {
    return (
        <div className="absolute left-24 top-16 bg-white border-2 border-blue-400 rounded-lg shadow-lg w-56 z-50">
            <button
                className="w-full px-4 py-3 text-left hover:bg-blue-100 border-b border-gray-200 flex items-center gap-2"
                onClick={() => {
                    onProfileClick();
                    onClose(); 
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
                onClick={() => {
                    onLogoutClick();
                    onClose();
                }}
            >
                <Cross2Icon className="text-xl w-5 h-5" />
                Cerrar Sesión
            </button>
        </div>
    );
}
