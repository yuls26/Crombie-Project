import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los usuarios
export async function GET(request, { params }) {

    const paramObject = (await params);
    const { categoryId } = paramObject; // aqui paraams es undefined

    try {

        const category = await prisma.category.findUnique({
            where: {
                id: Number(categoryId),
            },
        })

        // Verifica si el usuario fue encontrado
        if (!category) {
            return new Response(JSON.stringify({ error: "Categoria no encontrado" }), {
                status: 400,
            });
        }

        // Responder con el usuario encontrado
        return new Response(JSON.stringify({
            data: {
                category: category
            },
            message: "Categoria recuperado con éxito",
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({
            message: "Error al recuperar el usuario",
            error: error?.message,
        }), {
            status: 500,
        });
    }
}
