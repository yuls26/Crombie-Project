'use client';

import { useState, useEffect } from 'react';
import { Modal, Input, Button, message } from 'antd';
import { Expense } from '../services/api';

interface ExpenseEditModalProps {
  visible: boolean;
  expense: Expense | null;
  onUpdate: (updatedExpense: Expense) => void;
  onCancel: () => void;
}

const ExpenseEditModal: React.FC<ExpenseEditModalProps> = ({ visible, expense, onUpdate, onCancel }) => {
  const [editedExpense, setEditedExpense] = useState<Expense | null>(expense);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (expense) {
      setEditedExpense(expense);
    }
  }, [expense]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedExpense) return;
    setEditedExpense({ ...editedExpense, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!editedExpense) return;
    setLoading(true);

    try {
      const response = await fetch(`/api/expenses/update/${editedExpense.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(editedExpense.amount),
          description: editedExpense.description,
          userId: editedExpense.userId,
          categoryId: editedExpense.categoryId,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el gasto');
      }

      const data = await response.json();
      message.success(`Gasto ${data.data.expense.id} actualizado con éxito`);
      onUpdate(data.data.expense);
      onCancel();
    } catch (error) {
      message.error('No se pudo actualizar el gasto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Editar Gasto"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <div className="flex flex-col gap-4">
        <Input name="description" value={editedExpense?.description || ''} onChange={handleChange} placeholder="Descripción" />
        <Input name="amount" type="number" value={editedExpense?.amount || ''} onChange={handleChange} placeholder="Monto" />
        <div className="flex justify-end gap-2">
          <Button onClick={onCancel} disabled={loading}>Cancelar</Button>
          <Button type="primary" onClick={handleSave} loading={loading}>Guardar</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ExpenseEditModal;
