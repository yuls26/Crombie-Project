import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los usuarios
export async function GET() {
    try {
        const categories = await prisma.category.findMany();
        return new Response(JSON.stringify(categories), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({
            message: "Error al recuperar categorias",
            error: error?.message,
        }), {
            status: 500,
        });
    }
}
