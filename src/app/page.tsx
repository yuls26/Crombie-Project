// app/page.tsx
import './globals.css';


export default function HomePage() {
  return (
    <div className="text-center bg-blue-600">
      <h2 className="text-4xl font-bold mb-4">Bienvenido a Gestor de Gastos</h2>
      <p className="text-lg text-gray-600">Organiza tus ingresos y egresos fácilmente.</p>
      <a
        href="/login"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
      >
        Inicia Sesión
      </a>
    </div>
  );
}
