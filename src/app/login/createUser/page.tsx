"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    if (session) {
        router.push("/dashboard"); // Si ya está logueado, redirige
        return null;
    }

    const saveUserToDatabase = async (email: string, name: string, password: string): Promise<boolean> => {
        try {
            setError('');
            const payloadUser = { name, email, password };

            const savedUser = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payloadUser),
            });

            if (!savedUser.ok) {
                const errorResponse = await savedUser.json();
                setError(errorResponse.error || "Error al crear el usuario");
                return false;
            }

            return true;
        } catch (e) {
            console.error("Error en saveUserToDatabase:", e);
            setError("Error en el servidor");
            return false;
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const isUserCreated = await saveUserToDatabase(email, name, password);

        if (isUserCreated) {
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
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white px-6 py-8">
            <div className="flex justify-center w-full max-w-sm bg-gray-700 p-8 rounded-lg shadow-lg space-y-6">
                <form onSubmit={handleRegister} className="flex flex-col space-y-4 w-full">
                    <h1 className="text-3xl font-bold mb-6 text-center text-gray-100">Crear Usuario</h1>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <input
                        type="text"
                        placeholder="Nombre de Usuario"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="px-4 py-2 border border-gray-600 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
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
                        Crear Usuario
                    </button>
                </form>
            </div>
        </div>
    );
}
