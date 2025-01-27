import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los usuarios
export async function GET(request, { params }) {

    const paramObject = (await params);
    const { categoryId } = paramObject; // aqui paraams es undefined

    try {

        const deleteCategory = await prisma.category.delete({
            where: {
                id: Number(categoryId),
            },
        })

        // Verifica si el usuario fue encontrado
        if (!deleteCategory) {
            return new Response(JSON.stringify({ error: "Operacion fallida" }), {
                status: 400,
            });
        }

        // Responder con el usuario encontrado
        return new Response(JSON.stringify({
            data: {
            },
            message: "Categoria " + categoryId + " eliminada con éxito",
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({
            message: "Error al eliminar la categoria",
            error: error?.message,
        }), {
            status: 500,
        });
    }
}
