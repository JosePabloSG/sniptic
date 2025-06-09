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
// En Vercel, configura esta variable de entorno en la configuración del proyecto
const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(formData: ContactFormData) {
  const { name, email, subject: userSubject } = formData

  const emailSubject = userSubject
    ? `Nuevo mensaje: ${userSubject} - de ${name}`
    : `Nuevo mensaje de contacto de ${name}`

  const htmlContent = generateContactEmail(formData)

  // Usar variables de entorno para los correos emisor y receptor
  const emailFrom = process.env.EMAIL_FROM || "Contacto Sniptic <onboarding@resend.dev>"
  const emailTo = process.env.EMAIL_TO || "suarezgomezjosepablo03@gmail.com"

  return resend.emails.send({
    from: emailFrom,
    to: emailTo, // Configura esto en las variables de entorno de Vercel
    subject: emailSubject,
    replyTo: email,
    html: htmlContent,
  })
}
