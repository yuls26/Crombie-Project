import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener los gastos de un usuario por su ID
export async function GET(request, { params }) {

    const userId = (await params)?.id;

    // Verifica si userId están definidos
    if (!userId) {
        return new Response(JSON.stringify({ error: "userId no proporcionado" }), {
            status: 400,
        });
    }

    try {

        const expenses = await prisma.expense.findMany({
            where: {
                userId: parseInt(userId),
            },
        });

        if (expenses?.length === 0) {
            return new Response(JSON.stringify({ message: "No se encontraron gastos" }), {
                status: 404,
            });
        }

        return new Response(JSON.stringify(expenses), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {

        console.error(error);

        return new Response(JSON.stringify({ error: "Error al recuperar los gastos" }), {
            status: 500,
        });
    }
}
