import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener gastos por usuario
export async function GET(request, { params }) {

    const { userId } = params;  // Accede directamente a userId

    try {

        const expenses = await prisma.expense.findMany({
            where: {
                userId: Number(userId),  // Usa el userId correctamente
            },
        });

        if (!expenses) {
            return new Response(JSON.stringify({ error: "No se encontraron gastos" }), {
                status: 400,
            });
        }

        return new Response(JSON.stringify({
            data: {
                expenses: expenses,
            },
            message: "Gastos recuperados con éxito",
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({
            message: "Error al recuperar los gastos",
            error: error?.message,
        }), {
            status: 500,
        });
    }
}

