import prisma from "@/lib/db";
import { notFound, redirect } from "next/navigation";

export async function generateStaticParams() {
  return [];
}

interface RedirectPageProps {
  params: { shortcode: string };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  try {
    const { shortcode } = params;
    
    if (!shortcode) {
      notFound();
      return;
    }

    const url = await prisma.url.findUnique({
      where: { shortCode: shortcode },
    });

    if (!url) {
      notFound();
      return;
    }

    await prisma.url.update({
      where: { id: url.id },
      data: { visits: { increment: 1 } },
    });

    redirect(url.originalUrl);
  } catch (error) {
    console.error("Error en RedirectPage:", error);
    notFound();
  } finally {
    await prisma.$disconnect(); // Cierra la conexión en caso de error
  }
}
