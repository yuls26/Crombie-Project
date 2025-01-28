'use client'

import { useSession, signIn, signOut } from "next-auth/react"



export default function Component() {
    const { data: session } = useSession()


    // console.log(session);

    if (session) {
        return (
            <>
                Signed in as {session.user?.email} <br />
                {/* Redirige al usuario a la página de inicio después de cerrar sesión */}
                <button onClick={() => signOut({ callbackUrl: '/' })}>Sign out</button>
            </>
        )
    }
    return (

        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>

    )
}