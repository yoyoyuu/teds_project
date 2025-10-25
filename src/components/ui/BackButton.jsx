export default function BackButton({ to = "/", label = "← Volver" }) {
  const handleClick = () => {
    window.location.href = to;
  };

  return (
    <button
      onClick={handleClick}
      className="mb-6 px-4 py-2 bg-blue-400 hover:bg-[#5995ed] text-white rounded-lg shadow"
    >
      {label}
    </button>
  );
}
