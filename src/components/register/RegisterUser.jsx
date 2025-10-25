import { useState } from "react";
import BackButton from "../ui/BackButton.jsx";

export default function RegisterUser() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <BackButton to="/" position="top-4 left-4" />
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Registrar Usuario
      </h1>
    </div>
  );
}
