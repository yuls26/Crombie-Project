import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Obtener todos los usuarios
export async function POST(request, { params }) {

    const paramObject = (await params);
    const { expenseId } = paramObject;

    const postParams = await request.json()

    try {

        const updateExpense = await prisma.expense.update({
            where: {
                id: Number(expenseId),
            },
            data: {
                amount: postParams?.amount || 0,
                description: postParams?.description || '',
                userId: Number(postParams?.userId),
                categoryId: Number(postParams?.categoryId)
            },
        })

        // Verifica si el usuario fue encontrado
        if (!updateExpense) {
            return new Response(JSON.stringify({ error: "Operacion fallida" }), {
                status: 400,
            });
        }

        // Responder con el usuario encontrado
        return new Response(JSON.stringify({
            data: {
                expense: updateExpense
            },
            message: "Gasto " + updateExpense.id + " actualizado con éxito",
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({
            error: error?.message,
            message: "Error al actualizar el gasto"
        }
        ), {
            status: 500,
        });
    }
}
