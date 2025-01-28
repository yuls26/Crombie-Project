import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los usuarios
export async function GET(request, { params }) {

    const paramObject = (await params);
    const { userId } = paramObject; // aqui paraams es undefined

    try {

        const expenses = await prisma.expense.findMany({
            where: {
                userId: Number(userId),
            },
        })

        // Verifica si el usuario fue encontrado
        if (!expenses) {
            return new Response(JSON.stringify({ error: "Gasto no encontrado" }), {
                status: 400,
            });
        }

        // Responder con el usuario encontrado
        return new Response(JSON.stringify({
            data: {
                expenses: expenses
            },
            message: "Gasto recuperado con éxito",
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({
            message: "Error al recuperar el gasto",
            error: error?.message,
        }), {
            status: 500,
        });
    }
}
