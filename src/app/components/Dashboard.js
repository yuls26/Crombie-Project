'use client'

import { useSession } from "next-auth/react";
// import { useRouter } from 'next/router';
import { useState } from "react";
// import PieChart from "@/components/PieChart";
// import { usePathname } from "next/navigation";
// import { NextResponse } from "next/server";


export default function Dashboard() {
    const { data: session } = useSession();
    // const router = useRouter();
    // const router = usePathname();

    const [income, setIncome] = useState(3000); // Ejemplo de ingreso total
    const [expenses, setExpenses] = useState(1500); // Ejemplo de gasto total

    // if (!session) {
    //     // router.push("/api/auth/signin");
    //     // return null;
    //     return NextResponse.redirect(new URL("/login"));
    // }

    return (
        <div style={{ padding: "20px" }}>
            <h1>Bienvenido, {session?.user?.name}</h1>
            <p>Tu Dashboard</p>

            {/* Muestra el gráfico circular */}
            <h2>Resumen de Finanzas</h2>
            {/* <PieChart income={income} expenses={expenses} /> */}
        </div>
    );
}