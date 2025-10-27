export default function DailyChallenge({ used, onChallenge }) {
    return (
        <button
            className={`${used ? "bg-gray-400 cursor-not-allowed" : "bg-[#ffb30f] hover:bg-[#eb9b06]"
                } border-4 ${used ? "border-gray-500" : "border-[#931f1d]"
                } rounded-lg p-6 w-64 transition-colors`}
            onClick={onChallenge}
            disabled={used}
        >
            <h3 className="text-white text-xl font-bold">Desafío Diario:</h3>
        </button>
    );
}
