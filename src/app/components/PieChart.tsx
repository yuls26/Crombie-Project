import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from "chart.js";
import { useEffect, useState } from "react";

// Registrar los componentes de Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const PieChart = ({ expenses }: { expenses: any[] }) => {
  const [chartData, setChartData] = useState(null as any);

  useEffect(() => {
    if (!expenses || expenses.length === 0) return;

    const categoryTotals: { [key: string]: number } = {};

    // Agrupar los gastos por categoría
    expenses.forEach((expense) => {
      const category = expense.category;
      categoryTotals[category] = (categoryTotals[category] || 0) + expense.amount;
    });

    // Preparar los datos para el gráfico
    const data = {
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          label: "Total por Categoría",
          data: Object.values(categoryTotals),
          backgroundColor: [
            "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF9F40", "#FFCD56", "#C0C0C0", "#A2FF70"
          ],
          hoverOffset: 4,
        },
      ],
    };

    setChartData(data);
  }, [expenses]);

  if (!chartData) return <p>Cargando gráfico...</p>;
  if (chartData.datasets[0].data.length === 0) return <p>No tiene gastos cargados</p>;

  return (
    <div>
      <h2>Gastos por Categoría</h2>
      <Pie
        data={chartData}
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
      />
    </div>
  );
};

export default PieChart;
