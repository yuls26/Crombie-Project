import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los usuarios
export async function GET(request, { params }) {

    const paramObject = (await params);
    const { expenseId } = paramObject; // aqui paraams es undefined

    try {

        const expense = await prisma.expense.findUnique({
            where: {
                id: Number(expenseId),
            },
        })

        // Verifica si el usuario fue encontrado
        if (!expense) {
            return new Response(JSON.stringify({ error: "Gasto no encontrado" }), {
                status: 400,
            });
        }

        // Responder con el usuario encontrado
        return new Response(JSON.stringify({
            data: {
                expense: expense
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
