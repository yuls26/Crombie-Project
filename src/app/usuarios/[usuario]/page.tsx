'use client';

import { useEffect, useState } from 'react';

interface UserPageProps {
  params: {
    usuario: string; // Este sería el identificador del usuario
  };
}

interface Expense {
  id: number;
  amount: number;
  description: string;
  date: string;
}

export default function UserPage({ params }: UserPageProps) {
  const [gastos, setGastos] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGastos = async () => {
      try {
        const response = await fetch(`/api/usuarios/${params.usuario}/gastos`);
        if (!response.ok) {
          throw new Error('Error al cargar los gastos del usuario.');
        }
        const data = await response.json();
        setGastos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGastos();
  }, [params.usuario]);

  if (loading) {
    return <p>Cargando los datos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Usuario: {params.usuario}</h1>
      <p className="text-lg text-gray-600">
        Aquí puedes ver y gestionar tus gastos, {params.usuario}.
      </p>

      {gastos.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {gastos.map((gasto) => (
            <li
              key={gasto.id}
              className="p-4 border rounded shadow hover:bg-gray-100"
            >
              <p>
                <strong>Descripción:</strong> {gasto.description}
              </p>
              <p>
                <strong>Monto:</strong> ${gasto.amount.toFixed(2)}
              </p>
              <p>
                <strong>Fecha:</strong> {new Date(gasto.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay gastos registrados para este usuario.</p>
      )}
    </div>
  );
}
