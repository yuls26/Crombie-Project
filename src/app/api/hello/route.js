export async function GET(request) {
    return new Response(JSON.stringify({ message: "Hola, esta es tu API en Next.js!" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
