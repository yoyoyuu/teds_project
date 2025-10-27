import { Cross2Icon, PersonIcon } from "@radix-ui/react-icons";

export default function UserProfileModal({ onClose, user }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 border-4 border-blue-400 relative">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <Cross2Icon className="text-3xl w-8 h-8" />
                </button>

                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-gray-300 rounded-full p-4">
                        <PersonIcon className="text-4xl w-10 h-10" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">{user?.name || "Usuario"}</h2>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <p className="text-gray-600">Nivel de Aprendizaje:</p>
                        <p className="text-xl font-semibold">{user?.level || "Nivel 2 (Intermedio)"}</p>
                    </div>

                    <div>
                        <p className="text-blue-500 font-semibold mb-1">Temática Actual:</p>
                        <p className="text-xl font-semibold">{user?.topic || "Sumas y Restas"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
