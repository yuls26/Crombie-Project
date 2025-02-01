"use client";

import PieChart from '../components/PieChart.tsx'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllExpensesByUser } from '../../serverFunctions/expenses.ts'
import { getCategoryById } from '../../serverFunctions/categories';
import TimePeriodSelector from './TimePeriodSelector.tsx';
import NavBar from './navBar.tsx';

export default function Dashboard() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [expenses, setExpenses] = useState(null);
    const [chartSelection, setChartSelection] = useState('historic');

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    useEffect(() => {
        const getCategoryAsync = async (id) => {
            const res = await getCategoryById(id);
            return res.name;
        };

        const getExpensesAsync = async () => {
            const res = await getAllExpensesByUser(session.user);

            const expensesWithCategory = await Promise.all(
                res.map(async (expense) => {
                    let expenseAux = { ...expense };
                    expenseAux.category = await getCategoryAsync(expense?.categoryId);
                    return expenseAux;
                })
            );
            setExpenses(expensesWithCategory);
        };

        if (!expenses && session) {
            getExpensesAsync();
        }

    }, [expenses, session]);

    if (status === "loading") return <p>Cargando...</p>;

    if (!session) return null;

    return (
        <div style={{ padding: "20px", height: '100%'}}>
            <h1>Bienvenido, {session?.user?.name}</h1>

            <select
                style={{
                    padding: 5,
                    margin: 5,
                    border: '3px solid #1F2937',
                    borderRadius: 7,
                    color: 'black'
                }}
                onChange={(e) => setChartSelection(e.target.value) }
                >
                <option value={'historic'}>Ver gastos historicos</option>
                <option value={'datePicker'}>Ver gastos por periodo</option>
            </select>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                gap: 100
            }}>
                {
                    chartSelection === 'historic' &&
                    <div style={{ maxWidth: 400 }}>
                        <PieChart
                            expenses={expenses}
                            />
                    </div>
                }
                {
                    chartSelection === 'datePicker' && 
                    <div style={{ maxWidth: 400 }}>
                        <TimePeriodSelector
                            expenses={expenses}
                            />
                    </div>
                }
            </div>

            <NavBar/>
        </div>
    );
}
