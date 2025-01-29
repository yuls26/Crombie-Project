import { NextResponse } from "next/server";
import db from "@/lib/db"; // Conexión a tu base de datos

export async function GET(req, { params }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Falta el ID del usuario" }, { status: 400 });
  }

  try {
    // Obtener todos los gastos del usuario desde la BD
    const gastos = await db.gasto.findMany({
      where: { usuarioId: id }, // Filtrar por el ID del usuario
      select: { monto: true, fecha: true },
    });

    // Fechas base
    const hoy = new Date();
    const inicioSemana = new Date(hoy);
    inicioSemana.setDate(hoy.getDate() - hoy.getDay());
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const inicioAño = new Date(hoy.getFullYear(), 0, 1);

    // Resumen
    let resumen = { semanal: 0, mensual: 0, anual: 0 };

    gastos.forEach(({ monto, fecha }) => {
      const fechaGasto = new Date(fecha);
      if (fechaGasto >= inicioSemana) resumen.semanal += monto;
      if (fechaGasto >= inicioMes) resumen.mensual += monto;
      if (fechaGasto >= inicioAño) resumen.anual += monto;
    });

    return NextResponse.json(resumen);
  } catch (error) {
    console.error("Error al obtener el resumen:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

