import prisma from "@/lib/db";
import { GetServerSideProps } from "next";
import { redirect } from "next/navigation";

interface Props {
  originalUrl: string | null;
}

const RedirectPage = ({ originalUrl }: Props) => {
  // Si no se encuentra la URL, mostrar el error 404
  if (!originalUrl) {
    return <div>404 - URL not found</div>;
  }

  // Este componente ya no necesita hacer la redirección,
  // ya que la redirección ahora se maneja en getServerSideProps
  return <div>Redirecting...</div>;
};

// Este método maneja la lógica de redirección antes de renderizar el componente
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { shortcode } = params as { shortcode: string };

  const url = await prisma.url.findFirst({
    where: { shortCode: shortcode },
  });

  // Si no se encuentra el shortcode, mostrar una página de error
  if (!url) {
    return { props: { originalUrl: null } };
  }

  // Incrementar visitas
  await prisma.url.update({
    where: { id: url.id },
    data: { visits: { increment: 1 } },
  });

  // Redirigir en el servidor a la URL original
  return {
    redirect: {
      destination: url.originalUrl,
      permanent: false,
    },
  };
};

export default RedirectPage;
