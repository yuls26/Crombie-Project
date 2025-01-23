// app/login/page.tsx
export default function LoginPage() {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Inicia Sesión</h2>
        <form>
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
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    );
  }
  