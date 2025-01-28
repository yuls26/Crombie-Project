'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditExpensePage({
  params,
}: {
  params: { usuario: string; expenseId: string };
}) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await fetch(`/api/expenses/${params.expenseId}`);
        const data = await response.json();
        setAmount(data.amount);
        setDescription(data.description);
        setCategory(data.category);
      } catch (err) {
        console.error('Error fetching expense:', err);
      }
    };

    fetchExpense();
  }, [params.expenseId]);

  const handleUpdateExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`/api/expenses/${params.expenseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount),
          description,
          category,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el gasto.');
      }

      router.push(`/usuarios/${params.usuario}`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Gasto</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleUpdateExpense} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold">Monto:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Descripción:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Categoría:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
