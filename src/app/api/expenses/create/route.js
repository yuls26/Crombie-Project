import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Obtener todos los usuarios
export async function POST(request, { params }) {

    const postParams = await request.json()

    try {

        const expense = await prisma.expense.create({
            data: {
                amount: postParams?.amount || 0,
                description: postParams?.description || '',
                date: undefined,
                userId: Number(postParams?.userId),
                categoryId: Number(postParams?.categoryId)
            },
        })


        console.log('newExpense: ', expense);
        // Verifica si el usuario fue encontrado
        if (!expense) {
            return new Response(JSON.stringify({ error: "Operacion fallida" }), {
                status: 400,
            });
        }

        // Responder con el usuario encontrado
        return new Response(JSON.stringify({
            data: {
                expense: expense
            },
            message: "Gasto " + expense.id + " creada con éxito",
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({
            error: error?.message,
            message: "Error al crear el gasto"
        }
        ), {
            status: 500,
        });
    }
}
