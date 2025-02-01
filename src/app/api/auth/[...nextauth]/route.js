import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

const chekUser = async (user) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/checkUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });

    if (!response.ok) throw new Error("Error al verificar el usuario.");

    const data = await response.json();
    return data.data.user;
}

export const authOptions = {
    providers: [
        // GitHub Provider
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),

        // Credenciales (Correo y Contraseña)
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "correo@example.com" },
                password: { label: "Contraseña", type: "password" }
            },
            async authorize(credentials) {
                try {
                    // Verifica si el usuario existe
                    const user = await chekUser({ email: credentials.email, password: credentials.password });

                    if (!user) throw new Error("Credenciales incorrectas");

                    return user; // Devuelve el usuario para iniciar sesión
                } catch (error) {
                    console.error("Error en la autenticación:", error);
                    throw new Error("Error al iniciar sesión");
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user }) {
            return !!user; // Permitir login solo si hay usuario
        },
        async jwt({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },
        async session({ session, token }) {
            if (token?.id) session.user.id = token.id;
            return session;
        },
    },
    pages: {
        signIn: "/login", // Redirige a tu página de login personalizada
    },
};

// Exporta los métodos GET y POST
export const GET = (req, res) => NextAuth(req, res, authOptions);
export const POST = (req, res) => NextAuth(req, res, authOptions);
