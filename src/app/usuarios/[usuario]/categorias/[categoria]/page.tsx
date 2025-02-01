'use client';

import NavBar from '@/app/components/navBar';
import { getCategoryById } from '@/serverFunctions/categories';
import { getAllExpensesByUser } from '@/serverFunctions/expenses';
import { getUserById } from '@/serverFunctions/user';
import { Button } from 'antd';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CategoriaPage() {
  const params = useParams() as Promise<{ usuario: string; categoria: string }>;
  const router = useRouter();
  const { data: session, status } = useSession();

  const [expenses, setExpenses] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null); 
  const [categoryData, setCategoryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { usuario, categoria } = await params;

      if (!usuario || !categoria || !session) return;

      try {
        const user = await getUserById(usuario);
        const category = await getCategoryById(categoria);
        const allExpenses = await getAllExpensesByUser(user);

        console.log('allExpenses: ', allExpenses);
        const filteredExpenses = allExpenses.filter((exp: any) => exp.categoryId == categoria);
        console.log('filteredExpenses: ', filteredExpenses);

        setUserData(user);
        setCategoryData(category);
        setExpenses(filteredExpenses);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params, session]);

  if (loading) return <p>Cargando...</p>;
  if (!userData || !categoryData) return <p>No se encontraron datos.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        Mostrando gastos de tipo {categoryData.name} del usuario {userData.name}
      </h1>
      <p className="text-lg text-gray-600">Listado de gastos registrados en esta categoría.</p>

      {expenses.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {expenses.map((gasto) => (
            <li key={gasto.id} className="p-4 border rounded shadow hover:bg-gray-100">
              <p><strong>Descripción:</strong> {gasto.description}</p>
              <p><strong>Monto:</strong> ${gasto.amount.toFixed(2)}</p>
              <p><strong>Fecha:</strong> {new Date(gasto.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay gastos registrados en esta categoría.</p>
      )}
      <Button style={{marginTop: 20}} type="primary" onClick={() => router.back()}>Volver</Button>
      <div style={{marginTop: 20}}>
        <NavBar />
      </div>
    </div>
  );
}
