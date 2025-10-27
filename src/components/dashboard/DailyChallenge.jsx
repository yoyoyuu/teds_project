export default function DailyChallenge({ used, onClick }) {
    return (
        <button
            className={`border-4 rounded-lg p-6 w-64 transition-colors ${used
                    ? "bg-gray-400 cursor-not-allowed border-gray-500"
                    : "bg-[#ffb30f] hover:bg-[#eb9b06] border-[#931f1d]"
                }`}
            onClick={onClick}
            disabled={used}
        >
            <h3 className="text-white text-xl font-bold">Desafío Diario</h3>
        </button>
    );
}

