import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los usuarios
export async function GET(request, { params }) {

    const paramObject = (await params);
    const { expenseId } = paramObject; // aqui paraams es undefined

    try {

        const deleteExpense = await prisma.expense.delete({
            where: {
                id: Number(expenseId),
            },
        })

        // Verifica si el usuario fue encontrado
        if (!deleteExpense) {
            return new Response(JSON.stringify({ error: "Operacion fallida" }), {
                status: 400,
            });
        }

        // Responder con el usuario encontrado
        return new Response(JSON.stringify({
            data: {
            },
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
