'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ExpenseDetailPage({ params }: { params: { usuario: string; expenseId: string } }) {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleDeleteExpense = async () => {
    setError('');

    try {
      const response = await fetch(`/api/expenses/${params.expenseId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el gasto.');
      }

      // Redirige al usuario a su página de gastos después de eliminar
      router.push(`/usuarios/${params.usuario}`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detalles del Gasto</h1>
      {/* Aquí irían los detalles del gasto, si los tienes */}

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleDeleteExpense}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Eliminar Gasto
      </button>
    </div>
  );
}
