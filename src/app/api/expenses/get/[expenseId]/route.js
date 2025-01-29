import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener un gasto
export async function GET(request, { params }) {

    const { expenseId } = params;  // Accede directamente a expenseId

    try {

        const expense = await prisma.expense.findUnique({
            where: {
                id: Number(expenseId),  // Usa el expenseId directamente
            },
        });

        if (!expense) {
            return new Response(JSON.stringify({ error: "Gasto no encontrado" }), {
                status: 400,
            });
        }

        return new Response(JSON.stringify({
            data: {
                expense: expense,
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
