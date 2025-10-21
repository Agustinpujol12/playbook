// src/components/auth-components.tsx
import { signIn, signOut } from '@/auth';
import Link from 'next/link';

// Componente de cierre de sesión (se mantiene igual)
export function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
      className="inline"
    >
      <button 
        type="submit" 
        className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-4 py-2 text-center"
      >
        Cerrar Sesión
      </button>
    </form>
  );
}

// Componente de inicio de sesión (MODIFICADO)
// Ahora simplemente es un enlace a la página de login /login
export function SignIn() {
  return (
    <Link href="/login" passHref>
      <button 
        className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2 text-center"
      >
        Iniciar Sesión
      </button>
    </Link>
  );
}

// Nota: Si usas estos componentes dentro de un componente de servidor
// que necesita la sesión (por ejemplo, en un menú de navegación),
// el componente padre debe usar la función `auth()` que exportas en `src/auth.ts`.