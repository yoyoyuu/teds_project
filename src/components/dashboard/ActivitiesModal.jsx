export default function ActivitiesModal({ activities, onSelect, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-blue-500 rounded-lg p-8 max-w-2xl w-full mx-4 border-4 border-blue-600">
        <div className="space-y-4">
          {activities.map((activity) => (
            <button
              key={activity.id}
              className="w-full bg-white hover:bg-gray-100 rounded-lg p-6 flex items-center gap-6 transition-colors border-2 border-gray-200"
              onClick={() => onSelect(activity.name)}
            >
              <div className="text-4xl">{activity.icon}</div>
              <h3 className="text-2xl font-bold text-black">{activity.name}</h3>
            </button>
          ))}
        </div>

        <button
          className="mt-6 w-full bg-[#931f1d] hover:bg-[#791210] text-white font-bold py-3 rounded-lg transition-colors"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
