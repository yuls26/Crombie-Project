// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Gestor de Gastos',
  description: 'Una aplicación para gestionar tus ingresos y egresos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-100 text-gray-900">
        <header className="bg-blue-600 text-white py-4">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">Gestor de Gastos</h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-6">{children}</main>
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            © 2025 Gestor de Gastos
          </div>
        </footer>
      </body>
    </html>
  );
}
