'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Filters from '../../components/Filter';
import NavBar from '@/app/components/navBar';
import PieChart from '@/app/components/PieChart';
import { getAllExpensesByUser } from '@/serverFunctions/expenses';
import { getUserById } from '@/serverFunctions/user';
import { getCategoryById } from '@/serverFunctions/categories';
import { Category } from '@prisma/client';
import { getCategories } from '@/app/services/api';
import { Button } from 'antd';


const UserPage = () => {
  const { usuario } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [expenses, setExpenses] = useState<any>([]);
  const [userData, setUserData] = useState<any>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('1');

  const userId = Array.isArray(usuario) ? usuario[0] : usuario; // Asegurar que usuario es un string

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };

    const getCategoryAsync = async (id: string) => {
      const res = await getCategoryById(id);
      return res.name;
    };

    const getExpensesAsync = async (user: any) => {
      const res = await getAllExpensesByUser(user);

      const expensesWithCategory = await Promise.all(
        res.map(async (expense: any) => {
          let expenseAux = { ...expense };
          expenseAux.category = await getCategoryAsync(expense?.categoryId);
          return expenseAux;
        })
      );
      setExpenses(expensesWithCategory);
    };

    const fetchData = async () => {
      if (!userId || !session) return;

      try {
        // Obtener usuario
        const resDataUser = await getUserById(userId);
        getExpensesAsync(resDataUser);
        loadCategories();

        setUserData(resDataUser);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    if (!userData) {
      fetchData();
    }
  }, [userId, session, userData, expenses]);

  return (
    <div className="text-center bg-gray-800 text-white min-h-screen">
      <h1 className="text-3xl font-bold">Gastos del usuario {userData?.name}</h1>
      <p>Email: <b>{userData?.email}</b></p>

      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        <div style={{ maxWidth: 300 }}>
          <PieChart expenses={expenses} />
        </div>
      </div>

      <div style={{
        marginTop: 20,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
        gap: 20
      }}>
        <select
          style={{
            backgroundColor: '#1F2937',
            padding: 5,
            border: '2px solid rgb(53, 55, 58)',
            borderRadius: 7
          }}
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <Button type="primary" onClick={() => {
          router.push(`${userData.id}/categorias/${selectedCategoryId}`)
        }}>Buscar gastos por categoria</Button>
      </div>

      <NavBar />
    </div>
  );
};

export default UserPage;
