export default function DailyReinforcement({ topics }) {
    return (
        <div className="bg-blue-400 border-4 border-blue-500 rounded-lg p-4 w-64">
            <h3 className="text-white text-xl font-bold mb-3">Refuerzo Diario:</h3>
            <div className="bg-[#ffb30f] rounded-lg p-3">
                <ul className="text-white space-y-1">
                    {topics.map((topic, index) => (
                        <li key={index} className="text-sm">• {topic}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
