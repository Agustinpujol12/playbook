// src/components/auth-components.tsx
import { signOut } from "@/auth";
import Link from 'next/link';

// Botón que dirige a /login
export function SignIn() {
  return (
    <Link href="/login" passHref>
      <button className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2 text-center">
        Iniciar Sesión
      </button>
    </Link>
  );
}

// Botón de cierre de sesión (Server Action)
export function SignOut() {
  return (
    <form action={async () => { "use server"; await signOut(); }} className="inline">
      <button type="submit" className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-4 py-2 text-center">
        Cerrar Sesión
      </button>
    </form>
  );
}