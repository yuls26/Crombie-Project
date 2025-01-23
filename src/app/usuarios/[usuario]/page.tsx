// app/usuarios/[usuario]/page.tsx
interface UserPageProps {
    params: {
      usuario: string;
    };
  }
  
  export default function UserPage({ params }: UserPageProps) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Usuario: {params.usuario}</h1>
        <p className="text-lg text-gray-600">
          Aquí puedes ver y gestionar tus gastos, {params.usuario}.
        </p>
      </div>
    );
  }
  