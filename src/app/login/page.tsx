// src/app/login/page.tsx
"use client"; // <-- MUY IMPORTANTE: Lo convertimos en un Componente de Cliente

import { signIn } from "next-auth/react"; // <-- Importamos desde 'next-auth/react'
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); // Limpiamos errores previos

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      redirect: false, // Le decimos que no redirija automáticamente
      email: email,
      password: password,
    });

    if (result?.ok) {
      // Si el login es exitoso, redirigimos a la página principal
      router.push("/");
    } else {
      // Si falla, mostramos un error
      setError("Credenciales inválidas. Por favor, intenta de nuevo.");
      console.error("Authentication failed:", result);
    }
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <h1 className="font-headline text-2xl font-bold">Inicia Sesión en el Playbook</h1>
        <form onSubmit={handleSubmit}>
          <div className="w-full">
            <div>
              <label className="mb-3 mt-5 block text-xs font-medium text-gray-400" htmlFor="email">
                Email
              </label>
              <input
                className="block w-full rounded-md border border-gray-700 bg-gray-800 py-2 px-3 text-sm text-white placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Escribe tu email"
                required
              />
            </div>
            <div className="mt-4">
              <label className="mb-3 mt-5 block text-xs font-medium text-gray-400" htmlFor="password">
                Contraseña
              </label>
              <input
                className="block w-full rounded-md border border-gray-700 bg-gray-800 py-2 px-3 text-sm text-white placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Escribe tu contraseña"
                required
                minLength={6}
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 text-sm text-red-500">
              {error}
            </div>
          )}

          <button type="submit" className="mt-4 w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-500">
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}