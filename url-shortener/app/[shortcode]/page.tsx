import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

interface RedirectPageProps {
  params: { shortcode: string };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { shortcode } = params;

  // Buscar URL en la base de datos
  const url = await prisma.url.findFirst({
    where: { shortCode: shortcode },
  });

  // Si no se encuentra el shortcode, mostrar 404
  if (!url) {
    notFound();  // Muestra la página 404 automáticamente
  }

  // Incrementar visitas
  await prisma.url.update({
    where: { id: url.id },
    data: { visits: { increment: 1 } },
  });

  // Redirigir al usuario a la URL original
  return <>{redirect(url.originalUrl)}</>;
}
