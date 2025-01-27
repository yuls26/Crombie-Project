import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los usuarios
export async function GET(request, { params }) {

    const paramObject = (await params);
    const { userId } = paramObject; // aqui paraams es undefined

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: Number(userId),
            },
        })

        // Verifica si el usuario fue encontrado
        if (!user) {
            return new Response(JSON.stringify({ error: "Usuario no encontrado" }), {
                status: 400,
            });
        }

        // Responder con el usuario encontrado
        return new Response(JSON.stringify({
            data: {
                user: user
            },
            message: "Usuario recuperado con éxito",
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Error al recuperar el usuario" }), {
            status: 500,
        });
    }
}
