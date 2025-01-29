"use client";
import { useEffect, useState } from "react";

interface ResumenProps {
  params: {
    usuario: string;
  };
}

export default function ResumenPage({ params }: ResumenProps) {
  const [resumen, setResumen] = useState({
    semanal: 0,
    mensual: 0,
    anual: 0,
  });

  useEffect(() => {
    const fetchResumen = async () => {
      try {
        const response = await fetch(`/api/gastos/resumen?usuario=${params.usuario}`);
        const data = await response.json();
        setResumen(data);
      } catch (error) {
        console.error("Error al obtener el resumen:", error);
      }
    };

    fetchResumen();
  }, [params.usuario]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Resumen de Gastos de {params.usuario}</h1>
      <div className="mt-4">
        <p className="text-xl">💸 Gastos Semanales: ${resumen.semanal}</p>
        <p className="text-xl">📅 Gastos Mensuales: ${resumen.mensual}</p>
        <p className="text-xl">📆 Gastos Anuales: ${resumen.anual}</p>
      </div>
    </div>
  );
}
