AreaCard.jsx

export default function AreaCard({ title, description, image, selected, onSelect }) {
    return (
        <div
            onClick={() => onSelect && onSelect(title)}
            className={`flex items-center gap-4 p-4 rounded-xl shadow-md cursor-pointer transition-colors
        ${selected ? "bg-green-600 text-white" : "bg-[#ffb935] hover:bg-[#ffcc4d]"}`}
        >
            <img
                src={image}
                alt={title}
                className="w-20 h-20 object-contain rounded-md"
            />
            <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm">{description}</p>
            </div>
        </div>
    );
}