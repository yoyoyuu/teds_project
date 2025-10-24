export default function ButtonPrimary({ text, onClick, onMouseEnter, onMouseLeave, isHovered }) {
    return (
        <button
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`px-10 py-3 rounded-md font-semibold transition-all duration-300 
                ${isHovered ? "bg-green-600 text-white" : "bg-[#5995ed] text-white"}
            `}
        >
            {text}
        </button>
    );
}
