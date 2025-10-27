export default function ProgressBar({ progress }) {
    return (
        <div className="mb-8 flex items-center gap-4 justify-center">
            <div className="flex-1 max-w-2xl flex rounded-lg overflow-hidden">
                <div className="bg-[#ffb30f] px-8 py-6 flex-1">
                    <span className="text-white text-2xl font-bold">Progreso...</span>
                </div>
                <div className="bg-[#931f1d] px-8 py-6">
                    <span className="text-white text-2xl font-bold">{progress || "70%"} </span>
                </div>
            </div>
        </div>
    );
}
