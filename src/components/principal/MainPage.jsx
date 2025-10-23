// src/components/principal/MainPage.jsx
import { useState } from "react";

export default function MainPage() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen text-center">
      <img src="/images/logo/logo_temp.jpg" alt="Logo Feel-Face" className="w-90 my-2" />
    </div>
  );
}
