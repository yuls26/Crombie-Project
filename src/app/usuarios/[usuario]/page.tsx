'use client';

// app/usuarios/[usuario]/page.tsx

import { useState, useEffect } from 'react';
import Filters from '../../components/Filter';
import { fetchExpenses } from '../../services/services';  // Asumiendo que tienes un servicio para obtener los gastos

interface UserPageProps {
  params: {
    usuario: string;
  };
}

interface ExpenseInterface {
  id: number,
  amount: number,
  description: string,
  date: Date | undefined,
  userId: number,
  categoryId: number
}

const UserPage = ({ params }: UserPageProps) => {
  const [expenses, setExpenses] = useState(Array<ExpenseInterface>);
  const [filters, setFilters] = useState({
    category: '',
    startDate: '',
    endDate: '',
  });

  // Función para manejar los cambios en los filtros
  const handleFilterChange = (newFilters: { category: string; startDate: string; endDate: string }) => {
    setFilters(newFilters);
  };

  // Fetch de los gastos con los filtros
  useEffect(() => {
    const getExpenses = async () => {
      const response = await fetchExpenses(filters);
      let a = response.map(e =>
        e as unknown as ExpenseInterface
      );

      setExpenses(a);
    };
    getExpenses();
  }, [filters]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Gastos de {params.usuario}</h1>

      {/* Agregar el componente de filtros */}
      <Filters onFilterChange={handleFilterChange} />

      {/* Mostrar los gastos filtrados */}
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <p>{expense?.description} - ${expense?.amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;