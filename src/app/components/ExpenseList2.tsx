import { Expense } from '../services/api';

interface ExpenseListProps {
    expenses: Expense[];
    onDelete: (id: number) => void;
    onEdit: (expense: Expense) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete, onEdit }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
                <thead >
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Descripción</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Monto</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Fecha</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.id} >
                            <td className="border border-gray-300 px-4 py-2">{expense.description}</td>
                            <td className="border border-gray-300 px-4 py-2">$ {expense.amount}</td>
                            <td className="border border-gray-300 px-4 py-2">{expense.date}</td>
                            <td className="border border-gray-300 px-4 py-2 flex gap-2">
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                                    onClick={() => onEdit(expense)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                                    onClick={() => onDelete(expense.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseList;
