// src/app/lib/actions.ts
'use server';

import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

type FormState = {
  success: boolean;
  message: string;
};

export async function createStrategy(
  mapId: string,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // 1. Obtener la sesión del usuario autenticado
  const session = await getServerSession(authConfig);

  // 2. Verificar si el usuario es Admin
  if (!session || session.user?.role !== "ADMIN") {
    return {
      success: false,
      message: "Acceso denegado: No tienes permisos de administrador.",
    };
  }

  // 3. Validar el nombre del formulario
  const name = formData.get("name") as string;
  if (!name || name.trim() === "") {
    return { success: false, message: 'El campo "Nombre" es obligatorio.' };
  }

  // 4. Obtener los demás campos opcionales
  const videoUrl = formData.get("video") as string;
  const hoverVideoUrl = formData.get("gif") as string;
  const grenadesNeededRaw = formData.get("requerimiento") as string;
  const alternatives = formData.get("alternativa") as string;

  const grenadesNeeded = grenadesNeededRaw
    ? grenadesNeededRaw.split(",").map((item) => item.trim())
    : [];

  try {
    // 5. Crear la nueva estrategia en la base de datos
    await prisma.strategy.create({
      data: {
        id: `${mapId}-strat-${Date.now()}`,
        name,
        videoUrl,
        hoverVideoUrl,
        grenadesNeeded,
        alternatives,
        mapId,
        description: "",
        side: "TT",
        category: "Strat",
      },
    });

    // 6. Refrescar la página
    revalidatePath(`/${mapId}`);

    return { success: true, message: "¡Jugada creada con éxito!" };
  } catch (error) {
    console.error("Error al crear la estrategia:", error);
    return { success: false, message: "Error en la base de datos." };
  }
}
