import { useState } from "react";

export default function ExpenseForm({ onAddExpense }) {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const expense = {
            id: Date.now(),
            description,
            amount: parseFloat(amount),
        };
        onAddExpense(expense);
        setDescription("");
        setAmount("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Descripción</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Monto</label>
                <input
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Agregar Gasto</button>
        </form>
    );
}