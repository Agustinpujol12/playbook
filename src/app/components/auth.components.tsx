// src/app/components/auth-components.tsx
import { signIn, signOut } from "@/auth"; // Importamos desde @/auth
import { Button } from "@/components/ui/button";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"; // Usamos Server Action
        // Redirige a /login si falla, pero el authorize manejará la lógica
        await signIn('credentials', { redirectTo: '/' });
      }}
    >
      {/* Este botón ya no sirve para login con credenciales, lo quitamos */}
      {/* <Button type="submit">Iniciar sesión con Discord</Button> */}
    </form>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"; // Usamos Server Action
        await signOut({ redirectTo: '/login' }); // Redirige a login al cerrar sesión
      }}
    >
      <Button type="submit" variant="outline">Cerrar sesión</Button>
    </form>
  );
}
