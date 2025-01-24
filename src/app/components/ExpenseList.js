export default function ExpenseList({ expenses }) {
    if (expenses.length === 0) {
        return <p>No hay gastos registrados.</p>;
    }

    return (
        <ul>
            {expenses.map((expense) => (
                <li key={expense.id}>
                    <strong>{expense.description}</strong>: ${expense.amount.toFixed(2)}
                </li>
            ))}
        </ul>
    );
}