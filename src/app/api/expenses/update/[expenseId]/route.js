import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
    const { expenseId } = params;

    // Validar que expenseId sea un número válido
    const expenseIdNumber = Number(expenseId);
    if (isNaN(expenseIdNumber) || expenseIdNumber <= 0) {
        return new Response(JSON.stringify({ message: "ID de gasto inválido" }), { status: 400 });
    }

    try {
        const postParams = await request.json();

        // Validaciones de los datos recibidos
        if (!postParams?.description || typeof postParams.description !== "string") {
            return new Response(JSON.stringify({ message: "Descripción inválida" }), { status: 400 });
        }

        const amount = Number(postParams?.amount);
        if (isNaN(amount) || amount < 0) {
            return new Response(JSON.stringify({ message: "Monto inválido" }), { status: 400 });
        }

        const userId = Number(postParams?.userId);
        const categoryId = Number(postParams?.categoryId);
        if (isNaN(userId) || isNaN(categoryId)) {
            return new Response(JSON.stringify({ message: "User ID o Category ID inválidos" }), { status: 400 });
        }

        // Intentar actualizar el gasto
        const updatedExpense = await prisma.expense.update({
            where: { id: expenseIdNumber },
            data: { amount, description: postParams.description, userId, categoryId },
        });

        return new Response(JSON.stringify({
            data: { expense: updatedExpense },
            message: `Gasto ${updatedExpense.id} actualizado con éxito`,
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({
            message: "Error al actualizar el gasto",
            error: error?.message,
        }), { status: 500 });
    }
}
