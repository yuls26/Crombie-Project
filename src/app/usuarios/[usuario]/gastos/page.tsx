"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Gasto = {
  id: number;
  monto: number;
  fecha: string;
  tipo: string;
};

export default function GastosPage() {
  const searchParams = useSearchParams();
  const usuario = searchParams.get("usuario");
  const router = useRouter();

  const [gastos, setGastos] = useState<Gasto[]>([]);

  useEffect(() => {
    if (!usuario) return;

    const fetchGastos = async () => {
      try {
        const res = await fetch(`/api/expenses/getExpenses/${usuario}`);
        if (!res.ok) throw new Error("Error al obtener los gastos");
        const data: Gasto[] = await res.json();
        setGastos(data);
      } catch (error) {
        console.error("Error al obtener los gastos:", error);
      }
    };

    fetchGastos();
  }, [usuario]);

  const eliminarGasto = async (id: number) => {
    if (!confirm("¿Seguro que quieres eliminar este gasto?")) return;

    try {
      await fetch(`/api/expenses/${id}`, { method: "DELETE" });
      setGastos((gastos) => gastos.filter((g) => g.id !== id));
    } catch (error) {
      console.error("Error al eliminar el gasto:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">📊 Listado de Gastos</h1>

      <button
        onClick={() => router.push(`/usuarios/${usuario}/gastos/nuevo`)}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        ➕ Agregar Gasto
      </button>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="px-4 py-2">🆔 ID</th>
              <th className="px-4 py-2">💰 Monto</th>
              <th className="px-4 py-2">📆 Fecha</th>
              <th className="px-4 py-2">🏷️ Tipo</th>
              <th className="px-4 py-2">⚙️ Acciones</th>
            </tr>
          </thead>
          <tbody>
            {gastos.length > 0 ? (
              gastos.map((gasto) => (
                <tr key={gasto.id} className="border-b border-gray-700">
                  <td className="px-4 py-2">{gasto.id}</td>
                  <td className="px-4 py-2">${gasto.monto}</td>
                  <td className="px-4 py-2">{new Date(gasto.fecha).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{gasto.tipo}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => router.push(`/usuarios/${usuario}/gastos/${gasto.id}/editar`)}
                      className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => eliminarGasto(gasto.id)}
                      className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">No hay gastos registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

