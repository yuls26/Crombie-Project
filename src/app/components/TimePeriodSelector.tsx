import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import { getCategoryById } from '../../serverFunctions/categories';
import { Button, DatePicker } from 'antd';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const TimePeriodSelector = ({ expenses }: { expenses: any[] }) => {
    const [startDate, setStartDate] = useState<any>(null);
    const [endDate, setEndDate] = useState<any>(null);
    const [chartData, setChartData] = useState<any>(null);

    const filterExpensesByDateRange = () => {
        let filteredExpenses = expenses;

        if (startDate) {
            filteredExpenses = filteredExpenses.filter(
                (expense) => new Date(expense.date) >= new Date(startDate)
            );
        }

        if (endDate) {
            filteredExpenses = filteredExpenses.filter(
                (expense) => new Date(expense.date) <= new Date(endDate)
            );
        }

        return filteredExpenses;
    };

    const handleDateChange = async () => {
        const filteredExpenses = filterExpensesByDateRange();

        // Agrupar los gastos por categoría
        const categoryTotals: { [key: string]: number } = {};
        for (let expense of filteredExpenses) {
            const category = await getCategoryById(expense.categoryId);
            if (categoryTotals[category.name]) {
                categoryTotals[category.name] += expense.amount;
            } else {
                categoryTotals[category.name] = expense.amount;
            }
        }

        // Preparar los datos para el gráfico
        const data = {
            labels: Object.keys(categoryTotals), // Las categorías
            datasets: [
                {
                    label: "Total por Categoría",
                    data: Object.values(categoryTotals), // Los totales por cada categoría
                    backgroundColor: [
                        "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF9F40", "#FFCD56", "#C0C0C0", "#A2FF70"
                    ],
                    hoverOffset: 4,
                },
            ],
        };

        setChartData(data);
    };

    return (
        <div>
            <h2>Selecciona el rango de fechas</h2>
            <div style={{ marginBottom: "10px" }}>
                <DatePicker
                    placeholder="Fecha de inicio"
                    onChange={(date) => setStartDate(date ? date.format('YYYY-MM-DD') : null)}
                    style={{ marginRight: "10px" }}
                />
                <DatePicker
                    placeholder="Fecha de fin"
                    onChange={(date) => setEndDate(date ? date.format('YYYY-MM-DD') : null)}
                />
            </div>


            <Button type="primary" onClick={handleDateChange}>Filtrar</Button>
            
            <div style={{ marginTop: "20px" }}>
                {chartData ? (
                    <Pie
                        options={{
                            plugins: {
                                legend: {
                                    labels: {
                                        color: 'white',
                                        font: {
                                            weight: 'bold'
                                        },
                                    }
                                }
                            }
                        }}
                        data={chartData}
                    />
                ) : (
                    <p>No hay datos para mostrar</p>
                )}
            </div>
        </div>
    );
};

export default TimePeriodSelector;
