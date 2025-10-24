"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Button disabled variant="outline" size="sm">Cargando...</Button>;
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-foreground hidden sm:inline">
          {session.user?.name || session.user?.email}
        </span>
        <Button onClick={() => signOut({ callbackUrl: '/' })} variant="outline" size="sm">
          Cerrar sesión
        </Button>
      </div>
    );
  }

  return (
    <Button asChild>
      <Link href="/login" className="flex items-center gap-2">
        <LogIn className="h-4 w-4" />
        Iniciar Sesión
      </Link>
    </Button>
  );
}
