'use client';

import { useEffect, useState } from 'react';

interface CategoriaPageProps {
  params: {
    usuario: string; // ID o nombre del usuario
    categoria: string; // ID o nombre de la categoría
  };
}

interface Expense {
  id: number;
  amount: number;
  description: string;
  date: string;
  categoryId: number;
  userId: number;
}

export default function CategoriaPage({ params }: CategoriaPageProps) {
  const { usuario, categoria } = params;

  const [gastos, setGastos] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGastos = async () => {
      try {
        const response = await fetch(
          `/api/usuarios/${usuario}/categorias/${categoria}`
        );
        if (!response.ok) {
          throw new Error('Error al obtener los gastos.');
        }
        const data: Expense[] = await response.json();
        setGastos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGastos();
  }, [usuario, categoria]);

  if (loading) {
    return <p>Cargando gastos de la categoría...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        Categoría: {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
      </h1>
      <p className="text-lg text-gray-600">
        Mostrando gastos de la categoría seleccionada para el usuario {usuario}.
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
        <p>No hay gastos registrados en esta categoría.</p>
      )}
    </div>
  );
}
