// src/components/CategoryForm.tsx
import { useState, FormEvent } from 'react';
import { Category } from '../services/api';

interface CategoryFormProps {
    onSave: (category: Omit<Category, 'id'>) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSave }) => {
    const [name, setName] = useState<string>('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (name) {
            onSave({ name });
            setName('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nueva categoría"
            />
            <button type="submit">Guardar</button>
        </form>
    );
};

export default CategoryForm;
