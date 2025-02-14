import prisma from "@/lib/db";
import { redirect } from "next/navigation";

interface RedirectPageProps {
  params: { shortcode: string };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { shortcode } = params;

  // Usar findFirst() en lugar de findUnique()
  const url = await prisma.url.findFirst({
    where: { shortCode: shortcode },
  });

  if (!url) {
    // Si no se encuentra la URL, redirige a una página de error personalizada o muestra un 404
    redirect("/404"); // Cambia a la ruta que desees
  }

  // Incrementar visitas
  await prisma.url.update({
    where: { id: url.id },
    data: { visits: { increment: 1 } },
  });

  // Redirigir a la URL original
  redirect(url.originalUrl);
}
