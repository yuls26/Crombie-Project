'use client'

// app/main/page.tsx o en cualquier otra página donde quieras redirigir
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function MainPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {

    // Redirigir si no está logueado
    if (!session) {
      router.push("/login");
    }

  }, []);

  return (
    <div className="text-center bg-blue-600 p-6">
      <h2 className="text-4xl font-bold mb-4">Bienvenido, {session?.user?.name}</h2>
      <p className="text-lg text-gray-100 mb-6">Comienza a gestionar tus gastos</p>
      <div>
        <Link
          href={`/usuarios/${session?.user?.email}`}
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 mb-4"
        >
          Ver mis gastos
        </Link>
        <Link
          href="/categorias"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600"
        >
          Ver categorías de gastos
        </Link>
      </div>
    </div>
  );
}


