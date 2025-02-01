"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (session) {
    router.push("/dashboard"); // Si ya está logueado, redirige
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Credenciales incorrectas");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white" style={{
      margin: 0
      
    }}>
      <div className="flex justify-center w-full max-w-sm bg-gray-700 p-8 rounded-lg shadow-lg space-y-6">
        <form onSubmit={handleLogin} className="flex flex-col space-y-4 w-full">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-100">Iniciar Sesión</h1>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 border border-gray-600 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 border border-gray-600 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 px-6 py-3 rounded-lg text-white font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            className="bg-blue-600 px-6 py-3 rounded-lg text-white font-semibold hover:bg-blue-700 transition-colors duration-200"
            onClick={() => router.push('login/createUser')}
          >
            Crear Usuario
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-gray-400">O inicia sesión con:</p>

      <button
        onClick={() => signIn("github", {
          callbackUrl: '/dashboard'
        })}
        className="mt-4 px-8 py-3 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600 transition-colors duration-200"
      >
        GitHub
      </button>
    </div>
  );
}




