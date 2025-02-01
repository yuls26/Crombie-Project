'use client'

import { SessionProvider } from 'next-auth/react';
import './globals.css';
import { signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const logOut = async () => {
    await signOut();
    router.push('/login')
  }

  return (
    <html lang="es">
      <body className="h-screen bg-gray-100 text-gray-900 flex flex-col overflow-hidden">
        <header className="bg-blue-600 text-white py-4 flex-shrink-0" style={{ height: '80px' }}>
          <div className="container mx-auto px-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Gestor de Gastos</h1>
            <button
              style={{ minWidth: '200px' }}
              onClick={() => logOut()}
            >
              Log Out
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto container mx-auto">
          <SessionProvider>{children}</SessionProvider>
        </main>

        <footer className="bg-gray-800 text-white py-4 flex-shrink-0">
          <div className="container mx-auto text-center">
            © 2025 Gestor de Gastos
          </div>
        </footer>
      </body>
    </html>
  );
}
