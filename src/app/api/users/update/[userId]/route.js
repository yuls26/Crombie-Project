import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Obtener todos los usuarios
export async function POST(request, { params }) {

    const paramObject = (await params);
    const { userId } = paramObject;

    const postParams = await request.json()

    try {

        const updateUser = await prisma.user.update({
            where: {
                id: Number(userId),
            },
            data: {
                email: postParams?.email || '',
                name: postParams?.name || '',
                password: postParams?.password || '12345',
                role: postParams?.role || undefined
            },
        })

        // Verifica si el usuario fue encontrado
        if (!updateUser) {
            return new Response(JSON.stringify({ error: "Operacion fallida" }), {
                status: 400,
            });
        }

        // Responder con el usuario encontrado
        return new Response(JSON.stringify({
            data: {
                user: updateUser
            },
            message: "Usuario " + updateUser.id + " actualizado con éxito",
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({
            error: error?.message,
            message: "Error al crear el usuario"
        }
        ), {
            status: 500,
        });
    }
}
