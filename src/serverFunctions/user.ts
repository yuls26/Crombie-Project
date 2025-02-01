export const getUserById = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/get/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    // Verifica si la respuesta fue exitosa
    if (!res.ok) {
        throw new Error("Error al obtener la categoria");
    }
    const data = await res.json(); // Convierte la respuesta a JSON
    return data.data.user;
}