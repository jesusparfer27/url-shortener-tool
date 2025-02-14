import prisma from "@/lib/db";
import { redirect } from "next/navigation";

interface RedirectPageProps {
 params: { shortcode: string }
}

export default async function RedirectPage({ params }: RedirectPageProps) {
    const { shortcode } = params;

    // 🔹 Usar findFirst() en lugar de findUnique()
    const url = await prisma.url.findFirst({
        where: { shortCode: shortcode }
    });

    if (!url) {
        return <div>404 - URL not found</div>;
    }

    // 🔹 Incrementar visitas
    await prisma.url.update({
        where: { id: url.id },
        data: { visits: { increment: 1 } }
    });

    // 🔹 Redirigir correctamente
    redirect(url.originalUrl);
}
