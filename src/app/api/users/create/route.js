import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
    const postParams = await request.json();
    console.log(postParams);
    try {
        // Verificar si el usuario ya existe por email
        const existingUser = await prisma.user.findUnique({
            where: { email: postParams?.email }
        });

        if (existingUser) {
            return new Response(JSON.stringify({
                error: "El usuario ya existe",
                message: "Ya existe un usuario registrado con este email",
            }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Crear usuario solo si no existe
        const user = await prisma.user.create({
            data: {
                email: postParams?.email || '',
                name: postParams?.name || '',
                password: postParams?.password || '12345',
                role: postParams?.role || undefined
            },
        });

        return new Response(JSON.stringify({
            data: { user },
            message: `Usuario ${user.id} creado con éxito`,
        }), {
            status: 201, // Código 201 indica creación exitosa
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Error al crear usuario:", error);

        return new Response(JSON.stringify({
            error: error?.message,
            message: "Error al crear el usuario",
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
