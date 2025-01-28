'use client'

// app/login/page.tsx
// import Github from 'next-auth/providers/github';
import '../globals.css';
import GitHubSignIn from '../components/auth/GitHubSignIn';
// import { SessionProvider } from 'next-auth/react';


export default function LoginPage() {

  const handleLoginClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('El botón fue clickeado');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Inicia Sesión</h2>
      <form>
        {/*}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
          <input
            type="email"
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Contraseña</label>
          <input
            type="password"
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          type='button'
          onClick={handleLoginClick}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled"
        >
          Iniciar Sesión
        </button> 
        */}
      </form>
      <GitHubSignIn />
    </div>
  );
}
