import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Obtener todos los usuarios
export async function POST(request, { params }) {

    const postParams = await request.json()

    try {

        const category = await prisma.category.create({
            data: {
                name: postParams?.name || '',
            },
        })

        // Verifica si el usuario fue encontrado
        if (!category) {
            return new Response(JSON.stringify({ error: "Operacion fallida" }), {
                status: 400,
            });
        }

        // Responder con el usuario encontrado
        return new Response(JSON.stringify({
            data: {
                category: category
            },
            message: "Categoria " + category.id + " creada con éxito",
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({
            error: error?.message,
            message: "Error al crear la category"
        }
        ), {
            status: 500,
        });
    }
}
