import prisma from "@/lib/db";
import { redirect } from "next/navigation";

// Usar el tipo adecuado para los parámetros de la ruta dinámica
interface RedirectPageProps {
  params: { shortcode: string };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { shortcode } = params;

  // Buscar el URL correspondiente
  const url = await prisma.url.findFirst({
    where: { shortCode: shortcode },
  });

  if (!url) {
    // Si no se encuentra la URL, redirigir a una página 404
    redirect("/404"); 
  }

  // Incrementar las visitas
  await prisma.url.update({
    where: { id: url.id },
    data: { visits: { increment: 1 } },
  });

  // Redirigir al usuario a la URL original
  redirect(url.originalUrl);
}
