export const getAllExpensesByUser = async (user: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/expenses/getByUser/${user.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    // Verifica si la respuesta fue exitosa
    if (!res.ok) {
        throw new Error("Error al obtener los gastos");
    }

    const data = await res.json(); // Convierte la respuesta a JSON
    return data.data.expenses; // Devuelve los gastos de la respuesta
};
