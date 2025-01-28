'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddExpensePage({ params }: { params: { usuario: string } }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount),
          description,
          category,
          userId: params.usuario, // Vincular gasto al usuario actual
        }),
      });

      if (!response.ok) {
        throw new Error('Error al agregar el gasto.');
      }

      router.push(`/usuarios/${params.usuario}`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Agregar Gasto</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleAddExpense} className="space-y-4">
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
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Agregar Gasto
        </button>
      </form>
    </div>
  );
}
