// app/usuarios/[usuario]/categorias/[categoria]/page.tsx
interface CategoriaPageProps {
    params: {
      usuario: string;
      categoria: string;
    };
  }
  
  export default function CategoriaPage({ params }: CategoriaPageProps) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Categoría: {params.categoria}</h1>
        <p className="text-lg text-gray-600">
          Mostrando gastos para la categoría <strong>{params.categoria}</strong> del usuario {params.usuario}.
        </p>
      </div>
    );
  }
  