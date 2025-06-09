import { NextResponse } from "next/server"
import { sendContactEmail } from "./email-service"

export async function POST(request: Request) {
  try {
    const formData = await request.json()
    const { name, email, message } = formData

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Nombre, correo y mensaje son campos obligatorios" }, { status: 400 })
    }

    const { error } = await sendContactEmail(formData)

    if (error) {
      console.error("Error al enviar email:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Mensaje enviado correctamente",
    })
  } catch (error) {
    console.error("Error en el servidor:", error)
    // Asegurarse de que el error sea de tipo Error para acceder a `message`
    const errorMessage = error instanceof Error ? error.message : "Error desconocido al procesar la solicitud"
    return NextResponse.json({ error: "Error al procesar la solicitud", details: errorMessage }, { status: 500 })
  }
}
