// src/components/CategoryList.tsx
import { Category } from '../services/api';

interface CategoryListProps {
    categories: Category[];
    onDelete: (id: number) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onDelete }) => {
    return (
        <ul>
            {categories.map((category) => (
                <li key={category.id}>
                    {category.name}
                    <button onClick={() => onDelete(category.id)}>Eliminar</button>
                </li>
            ))}
        </ul>
    );
};

export default CategoryList;
