"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function GastosPage({ params }) {
  const router = useRouter();
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    const fetchGastos = async () => {
      try {
        const res = await fetch(`/api/expenses/getExpenses/${params.usuario}`);
        const data = await res.json();
        setGastos(data);
      } catch (error) {
        console.error("Error al obtener los gastos:", error);
      }
    };

    fetchGastos();
  }, [params.usuario]);

  const eliminarGasto = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar este gasto?")) return;

    try {
      await fetch(`/api/expenses/${id}`, { method: "DELETE" });
      setGastos(gastos.filter((g) => g.id !== id));
    } catch (error) {
      console.error("Error al eliminar el gasto:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">📊 Listado de Gastos</h1>

      <button
        onClick={() => router.push(`/usuarios/${params.usuario}/gastos/nuevo`)}
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
            {gastos.map((gasto) => (
              <tr key={gasto.id} className="border-b border-gray-700">
                <td className="px-4 py-2">{gasto.id}</td>
                <td className="px-4 py-2">${gasto.monto}</td>
                <td className="px-4 py-2">{new Date(gasto.fecha).toLocaleDateString()}</td>
                <td className="px-4 py-2">{gasto.tipo}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => router.push(`/usuarios/${params.usuario}/gastos/${gasto.id}/editar`)}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

