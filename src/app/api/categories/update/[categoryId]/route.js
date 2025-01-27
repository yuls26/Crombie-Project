import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Obtener todos los usuarios
export async function POST(request, { params }) {

    const paramObject = (await params);
    const { categoryId } = paramObject;

    const postParams = await request.json()

    try {

        const updateCategory = await prisma.category.update({
            where: {
                id: Number(categoryId),
            },
            data: {
                name: postParams?.name || '',
            },
        })

        // Verifica si el usuario fue encontrado
        if (!updateCategory) {
            return new Response(JSON.stringify({ error: "Operacion fallida" }), {
                status: 400,
            });
        }

        // Responder con el usuario encontrado
        return new Response(JSON.stringify({
            data: {
                category: updateCategory
            },
            message: "Categoria " + updateCategory.id + " actualizado con éxito",
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({
            error: error?.message,
            message: "Error al crear la categoria"
        }
        ), {
            status: 500,
        });
    }
}
