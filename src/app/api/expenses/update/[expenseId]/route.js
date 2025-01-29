import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Actualizar un gasto
export async function PUT(request, { params }) {

    const { expenseId } = params;  // Accede directamente al expenseId

    const postParams = await request.json();

    try {

        // Intentar actualizar el gasto
        const updateExpense = await prisma.expense.update({
            where: {
                id: Number(expenseId),  // Usa el expenseId correctamente
            },
            data: {
                amount: postParams?.amount || 0,
                description: postParams?.description || '',
                userId: Number(postParams?.userId),
                categoryId: Number(postParams?.categoryId),
            },
        });

        return new Response(JSON.stringify({
            data: {
                expense: updateExpense,
            },
            message: `Gasto ${updateExpense.id} actualizado con éxito`,
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({
            message: "Error al actualizar el gasto",
            error: error?.message,
        }), {
            status: 500,
        });
    }
}

