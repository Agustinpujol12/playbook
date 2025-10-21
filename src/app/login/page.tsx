// app/login/page.tsx

import { signIn } from '@/auth';
import { redirect } from 'next/navigation'; // Importación para redirección en el servidor

// Definimos la Server Action que maneja la autenticación
async function authenticate(formData: FormData) {
  'use server';

  // Extraemos los datos del FormData
  const username = formData.get('username');
  const password = formData.get('password');

  if (!username || !password) {
      return; 
  }

  try {
    // CRÍTICO: Usamos redirect: false para que signIn NO intente manipular el navegador
    await signIn('credentials', {
        username: username,
        password: password,
        redirect: false 
    });

    // Si el inicio de sesión es exitoso, forzamos la redirección al Home (/).
    redirect('/'); 

  } catch (error) {
    // Capturamos el error (incluso el que contiene el ReferenceError interno)

    // Redirigimos de vuelta al login, añadiendo un parámetro de error para futuras referencias
    redirect('/login?error=AuthenticationFailed'); 
  }
}

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Inicia Sesión
        </h1>
        
        {/* El formulario llama a la Server Action 'authenticate' */}
        <form 
          className="space-y-4"
          action={authenticate} 
        >
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Usuario</label>
            <input 
              id="username"
              name="username" 
              type="text" 
              placeholder="Usuario" 
              required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" 
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input 
              id="password"
              name="password" 
              type="password" 
              placeholder="Contraseña" 
              required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}