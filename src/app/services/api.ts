// src/services/api.ts
const API_URL = `/api`;  // Cambia esta URL por la de tu API

export interface Category {
    id: number;
    name: string;
}

// api.ts
export interface Expense {
    id: number;
    description: string;
    amount: number;
    date: string;
    userId: string;  // Cambié de number a string
    categoryId: number;
  }
  

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
}

export enum Role {
    ADMIN,
    USER,

}

export const getCategories = async (): Promise<Category[]> => {
    const response = await fetch(`${API_URL}/categories/getAll`);
    const data = await response.json();
    return data;
};

export const createCategory = async (category: Omit<Category, 'id'>): Promise<Category> => {
    const response = await fetch(`${API_URL}/categories/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
    });
    const data = await response.json();

    return data.data.category;
};

export const updateCategory = async (id: number, category: Category): Promise<Category> => {
    const response = await fetch(`${API_URL}/categories/update/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
    });
    const data = await response.json();

    return data.data.category;
};

export const deleteCategory = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/categories/delete/${id}`, {
        method: 'GET',
    });
};

// Funciones para gastos

export const getExpenses = async (): Promise<Expense[]> => {
    const response = await fetch(`${API_URL}/expenses/getAll`);
    const data = await response.json();
    return data;
};

export const getExpensesByUser = async (id: number): Promise<Expense[]> => {
    const response = await fetch(`${API_URL}/expenses/getByUser/${id}`);
    const data = await response.json();
    return data.data.expenses;
};

export const createExpense = async (expense: Omit<Expense, 'id'>): Promise<Expense> => {
    const response = await fetch(`${API_URL}/expenses/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
    });
    const data = await response.json();

    return data.data.expense;
};

export const updateExpense = async (id: number, expense: Expense): Promise<Expense> => {
    const response = await fetch(`${API_URL}/expenses/update/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
    });
    const data = await response.json();

    return data.data.expense;
};

export const deleteExpense = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/expenses/delete/${id}`, {
        method: 'GET',
    });
};
