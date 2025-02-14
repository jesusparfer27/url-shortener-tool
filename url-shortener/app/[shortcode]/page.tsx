import prisma from "@/lib/db";
import { redirect } from "next/navigation";

interface Props {
  originalUrl: string | null;
}

const RedirectPage = async ({ params }: { params: { shortcode: string } }) => {
  // Buscar la URL en la base de datos
  const url = await prisma.url.findFirst({
    where: { shortCode: params.shortcode },
  });

  // Si no se encuentra el shortcode, retornar un mensaje de error
  if (!url) {
    return <div>404 - URL not found</div>;
  }

  // Incrementar visitas
  await prisma.url.update({
    where: { id: url.id },
    data: { visits: { increment: 1 } },
  });

  // Redirigir a la URL original
  redirect(url.originalUrl); // Redirigir al destino original
};

export default RedirectPage;
