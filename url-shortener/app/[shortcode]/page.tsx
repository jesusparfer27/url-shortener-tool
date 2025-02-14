import prisma from "@/lib/db";
import { GetServerSideProps } from "next";
import { redirect } from "next/navigation";

interface Props {
  originalUrl: string | null;
}

const RedirectPage = ({ originalUrl }: Props) => {
  if (!originalUrl) {
    return <div>404 - URL not found</div>;
  }

  return <>{redirect(originalUrl)}</>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { shortcode } = params as { shortcode: string };

  const url = await prisma.url.findFirst({
    where: { shortCode: shortcode },
  });

  if (!url) {
    return { props: { originalUrl: null } };
  }

  // Incrementar visitas
  await prisma.url.update({
    where: { id: url.id },
    data: { visits: { increment: 1 } },
  });

  return { props: { originalUrl: url.originalUrl } };
};

export default RedirectPage;
