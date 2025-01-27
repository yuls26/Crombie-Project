import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los usuarios
export async function GET(request, { params }) {

    const paramObject = (await params);
    const { userId } = paramObject; // aqui paraams es undefined

    try {

        const deleteUser = await prisma.user.delete({
            where: {
                id: Number(userId),
            },
        })

        // Verifica si el usuario fue encontrado
        if (!deleteUser) {
            return new Response(JSON.stringify({ error: "Operacion fallida" }), {
                status: 400,
            });
        }

        // Responder con el usuario encontrado
        return new Response(JSON.stringify({
            data: {
            },
            message: "Usuario " + userId + " eliminado con éxito",
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({
            message: "Error al eliminar el usuario",
            error: error?.message,
        }), {
            status: 500,
        });
    }
}
