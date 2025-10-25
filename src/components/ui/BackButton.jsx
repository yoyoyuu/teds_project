export default function BackButton({ target = "/", text = "← Volver" }) {
  return (
    <button
      onClick={() => (window.location.href = target)}
      className="absolute top-6 left-6 bg-blue-400 hover:bg-blue-500 
                 text-white rounded-lg px-4 py-2 font-semibold shadow-md"
      style={{ zIndex: 50 }}
    >
      {text}
    </button>
  );
}