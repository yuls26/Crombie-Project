// src/components/ExpenseList.tsx
import { Expense } from '../services/api';

interface ExpenseListProps {
    expenses: Expense[];
    onDelete: (id: number) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete }) => {
    return (
        <ul>
            {expenses && Array.isArray(expenses) && expenses.map((expense) => (
                <li key={expense.id}>
                    {expense.description} - ${expense.amount}
                    <button onClick={() => onDelete(expense.id)}>Eliminar</button>
                </li>
            ))}
        </ul>
    );
};

export default ExpenseList;
