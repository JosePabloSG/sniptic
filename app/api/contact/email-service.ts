import { Resend } from "resend"
import { generateContactEmail } from "./email-template"

interface ContactFormData {
  name: string
  email: string
  company?: string
  subject?: string
  message: string
}

// Inicializar Resend con tu API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(formData: ContactFormData) {
  const { name, email, subject: userSubject } = formData

  const emailSubject = userSubject
    ? `Nuevo mensaje: ${userSubject} - de ${name}`
    : `Nuevo mensaje de contacto de ${name}`

  const htmlContent = generateContactEmail(formData)

  return resend.emails.send({
    from: "Contacto Sniptic <onboarding@resend.dev>", // Reemplaza con tu dominio verificado
    to: "suarezgomezjosepablo03@gmail.com", // Email donde recibirás los mensajes
    subject: emailSubject,
    replyTo: email,
    html: htmlContent,
  })
}
