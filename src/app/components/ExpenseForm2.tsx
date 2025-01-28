// src/components/ExpenseForm.tsx
import { useState, FormEvent } from 'react';
import { Category, Expense } from '../services/api';

interface ExpenseFormProps {
    categories: Category[];
    onSave: (expense: Omit<Expense, 'id'>) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ categories, onSave }) => {
    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [categoryId, setCategoryId] = useState<string>('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (description && amount && categoryId) {
            const newExpense: Omit<Expense, 'id'> = {
                description,
                amount: parseFloat(amount),
                categoryId: parseInt(categoryId),
                date: new Date().toISOString(),  // Asignamos la fecha actual
                userId: 1, // Asignamos un valor por defecto para userId
            };
            onSave(newExpense);
            setDescription('');
            setAmount('');
            setCategoryId('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción del gasto"
            />
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Monto"
            />
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">Seleccionar categoría</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <button type="submit">Guardar</button>
        </form>
    );
};

export default ExpenseForm;
