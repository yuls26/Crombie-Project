import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los usuarios
export async function GET() {
    try {
        const expenses = await prisma.expense.findMany();
        return new Response(JSON.stringify(expenses), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({
            message: "Error al recuperar gastos",
            error: error?.message,
        }), {
            status: 500,
        });
    }
}
