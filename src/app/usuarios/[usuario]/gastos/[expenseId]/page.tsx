"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditarGastoPage({params} ) {
  const router = useRouter();
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState("");
  const [tipo, setTipo] = useState("");

  useEffect(() => {
    if (params.expenseId !== "nuevo") {
      fetch(`/api/expenses/${params.expenseId}`)
        .then((res) => res.json())
        .then((data) => {
          setMonto(data.monto);
          setFecha(data.fecha.split("T")[0]);
          setTipo(data.tipo);
        })
        .catch((err) => console.error(err));
    }
  }, [params.expenseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { monto, fecha, tipo };

    try {
      if (params.expenseId === "nuevo") {
        await fetch(`/api/expenses`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        await fetch(`/api/expenses/${params.expenseId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }

      router.push(`/usuarios/${params.usuario}/gastos`);
    } catch (error) {
      console.error("Error al guardar el gasto:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">{params.expenseId === "nuevo" ? "➕ Agregar Gasto" : "✏️ Editar Gasto"}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className="p-2 bg-gray-800 border border-gray-700 rounded"
          required
        />
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="p-2 bg-gray-800 border border-gray-700 rounded"
          required
        />
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="p-2 bg-gray-800 border border-gray-700 rounded"
          required
        >
          <option value="">Seleccionar tipo</option>
          <option value="Alimentación">Alimentación</option>
          <option value="Transporte">Transporte</option>
          <option value="Entretenimiento">Entretenimiento</option>
          <option value="Salud">Salud</option>
          <option value="Otros">Otros</option>
        </select>

        <button type="submit" className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">
          {params.expenseId === "nuevo" ? "Agregar" : "Guardar Cambios"}
        </button>
      </form>
    </div>
  );
}
