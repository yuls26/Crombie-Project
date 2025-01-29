"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ExpenseForm from "../components/ExpenseForm2";
import ExpenseList from "../components/ExpenseList2";
import { getCategories, getExpensesByUser, Category, Expense, createExpense, deleteExpense } from "../services/api";

const Page = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      // Cargar categorías y gastos al montar el componente
      const loadCategories = async () => {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      };

      const loadExpenses = async () => {
        const fetchedExpenses = await getExpensesByUser(session.user.id);
        setExpenses(fetchedExpenses);
      };

      loadCategories();
      loadExpenses();

      setLoading(false);
    }
  }, [session]);

  const addExpenseOnDb = async (newExpense: Omit<Expense, "id">) => {
    const expenseCreated = await createExpense(newExpense);

    if (expenseCreated) {
      setExpenses((prevExpenses) => [...prevExpenses, expenseCreated]);
    }
  };

  const handleSaveExpense = (newExpense: Omit<Expense, "id">) => {
    if (session?.user?.id) {
      addExpenseOnDb({ ...newExpense, userId: session.user.id });
    }
  };

  const deleteExpenseOnDb = async (id: number) => {
    await deleteExpense(id);
    setExpenses((prevExpenses) => prevExpenses.filter((e) => e.id !== id));
  };

  const handleDeleteExpense = (id: number) => {
    deleteExpenseOnDb(id);
  };

  return (
    <div className="bg-gray-800 p-8 min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-4">Bienvenido, {session?.user?.name || "Usuario"}</h2>
      <p className="text-lg text-gray-300 mb-6">Comienza a gestionar tus gastos</p>

      <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
        {!loading ? (
          <>
            <ExpenseForm categories={categories} onSave={handleSaveExpense} />
            <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
          </>
        ) : (
          <div className="flex justify-center items-center space-x-2">
            <div className="w-8 h-8 border-4 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
            <p className="text-gray-400">Cargando...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

