import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Eliminar un gasto
export async function GET(request, { params }) {

    const { expenseId } = params;  // Accede directamente a expenseId

    try {

        const deleteExpense = await prisma.expense.delete({
            where: {
                id: Number(expenseId),  // Asegúrate de usar el expenseId
            },
        });

        if (!deleteExpense) {
            return new Response(JSON.stringify({ error: "Operacion fallida" }), {
                status: 400,
            });
        }

        return new Response(JSON.stringify({
            data: {},
            message: "Gasto " + expenseId + " eliminada con éxito",
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({
            message: "Error al eliminar el gasto",
            error: error?.message,
        }), {
            status: 500,
        });
    }
}
