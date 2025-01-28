import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

async function checkUserInDatabase(email) {
    const response = await fetch(`${process.env.BASE_URL}/api/users/checkUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });

    if (!response.ok) throw new Error("Error al verificar el usuario.");

    const data = await response.json();

    return data.data.user;
}

async function saveUserToDatabase(user) {
    const response = await fetch(`${process.env.BASE_URL}/api/users/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });

    if (!response.ok) throw new Error("Error al guardar el usuario.");

    const data = await response.json();

    return data.data.user;
}

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                // Verifica si el usuario ya existe en tu base de datos
                const existingUser = await checkUserInDatabase(user.email); // Función para verificar el usuario

                if (!existingUser) {

                    let payloadUser = {
                        name: user.name,
                        email: user.email,
                        password: '12345',
                    };

                    const savedUser = await saveUserToDatabase(payloadUser); // Función para guardar el usuario

                    user.id = savedUser.id;

                } else {
                    user.id = existingUser.id;
                }

                // Si el usuario ya existe, puedes optar por no hacer nada o actualizar datos
                return true; // Permite que el proceso de inicio de sesión continúe
            } catch (error) {
                console.error("Error al guardar el usuario:", error);
                return false; // Si ocurre un error, se previene el inicio de sesión
            }
        },
        async jwt({ token, user }) {

            // Cuando el usuario se autentica por primera vez, el objeto `user` estará disponible
            if (user) {
                token.id = user.id; // Agrega el ID al token
            }
            return token;
        },
        async session({ session, token }) {

            if (token?.id) {
                session.user.id = token.id; // Agrega el ID del usuario a la sesión
            }

            return session;
        },
    },
    debug: false, // Habilita los logs para depuración
};

// Exporta un nombre para cada método HTTP
export const GET = (req, res) => NextAuth(req, res, authOptions);
export const POST = (req, res) => NextAuth(req, res, authOptions);