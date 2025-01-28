'use client'

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import ExpenseForm from '../components/ExpenseForm2';
import ExpenseList from '../components/ExpenseList2';
import { getCategories, getExpensesByUser, Category, Expense, createExpense } from '../services/api';

const Page = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { data: session } = useSession();

  useEffect(() => {

    if (session) {

      // Cargar categorías y gastos al montar el componente
      const loadCategories = async () => {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      };

      const loadExpenses = async () => {
        // @ts-ignore
        const fetchedExpenses = await getExpensesByUser(session?.user?.id);
        setExpenses(fetchedExpenses);
      };

      loadCategories();
      loadExpenses();

      setLoading(false);
    }

  }, [session]);

  const addExpenseOnDb = async (newExpense: Omit<Expense, 'id'>) => {

    const expenseCreated = await createExpense(newExpense);

    if (expenseCreated) {
      if (expenseCreated) {
        if (Array.isArray(expenses)) {
          setExpenses([...expenses, expenseCreated]);
        } else {
          setExpenses([expenseCreated]);
        }
      }

    }
  };

  const handleSaveExpense = (newExpense: Omit<Expense, 'id'>) => {
    // Guardar el nuevo gasto
    // @ts-ignore
    addExpenseOnDb({ ...newExpense, userId: session.user.id });
  };

  useEffect(() => {
    console.log('page: ', expenses);
  }, [expenses]);

  return (
    <div className="text-center bg-blue-600 p-6">
      <h2 className="text-4xl font-bold mb-4">Bienvenido, {session?.user?.name}</h2>
      <p className="text-lg text-gray-100 mb-6">Comienza a gestionar tus gastos</p>
      <div>
        {!loading && (
          <>
            <ExpenseForm categories={categories} onSave={handleSaveExpense} />
            <ExpenseList expenses={expenses} onDelete={() => { }} />
          </>
        )}
        {loading && (<>cargando</>)}
      </div>
    </div>
  );
};

export default Page;
