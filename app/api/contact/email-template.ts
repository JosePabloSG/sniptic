import { STYLES } from './email-styles'

interface ContactFormData {
  name: string
  email: string
  company?: string
  subject?: string
  message: string
}

export function generateContactEmail(formData: ContactFormData): string {
  const { name, email, company, subject: userSubject, message } = formData

  return `
    <body style="margin: 0; padding: 0; background-color: ${STYLES.BACKGROUND_COLOR}; font-family: ${STYLES.FONT_FAMILY};">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: ${STYLES.BACKGROUND_COLOR};">
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: ${STYLES.CARD_BACKGROUND_COLOR}; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
              <!-- Header con Logo (opcional) y Título -->
              <tr>
                <td align="center" style="padding: 30px 20px 20px 20px; border-bottom: 1px solid #e5e7eb;">
                  <!-- Puedes añadir un logo aquí si lo tienes alojado públicamente -->
                  <!-- <img src="URL_DE_TU_LOGO_SNIPTIC" alt="Sniptic Logo" style="max-width: 150px; margin-bottom: 15px;" /> -->
                  <h1 style="font-size: 24px; color: ${STYLES.BRAND_PRIMARY_COLOR}; margin: 0; font-weight: 600;">
                    Nuevo Mensaje de Contacto
                  </h1>
                </td>
              </tr>
              <!-- Contenido del Mensaje -->
              <tr>
                <td style="padding: 30px 25px;">
                  <p style="font-size: 16px; color: ${STYLES.TEXT_COLOR_PRIMARY}; margin: 0 0 20px 0;">
                    Has recibido un nuevo mensaje a través del formulario de contacto de Sniptic:
                  </p>
                  
                  <div style="margin-bottom: 15px;">
                    <strong style="font-size: 15px; color: ${STYLES.TEXT_COLOR_PRIMARY};">Nombre:</strong>
                    <p style="font-size: 15px; color: ${STYLES.TEXT_COLOR_SECONDARY}; margin: 5px 0 0 0;">${name}</p>
                  </div>
                  
                  <div style="margin-bottom: 15px;">
                    <strong style="font-size: 15px; color: ${STYLES.TEXT_COLOR_PRIMARY};">Correo Electrónico:</strong>
                    <p style="font-size: 15px; color: ${STYLES.TEXT_COLOR_SECONDARY}; margin: 5px 0 0 0;">${email}</p>
                  </div>
                  
                  ${company
      ? `
                  <div style="margin-bottom: 15px;">
                    <strong style="font-size: 15px; color: ${STYLES.TEXT_COLOR_PRIMARY};">Empresa:</strong>
                    <p style="font-size: 15px; color: ${STYLES.TEXT_COLOR_SECONDARY}; margin: 5px 0 0 0;">${company}</p>
                  </div>`
      : ""
    }

                  ${userSubject
      ? `
                  <div style="margin-bottom: 15px;">
                    <strong style="font-size: 15px; color: ${STYLES.TEXT_COLOR_PRIMARY};">Asunto:</strong>
                    <p style="font-size: 15px; color: ${STYLES.TEXT_COLOR_SECONDARY}; margin: 5px 0 0 0;">${userSubject}</p>
                  </div>`
      : ""
    }
                  
                  <div>
                    <strong style="font-size: 15px; color: ${STYLES.TEXT_COLOR_PRIMARY};">Mensaje:</strong>
                    <div style="font-size: 15px; color: ${STYLES.TEXT_COLOR_SECONDARY}; margin: 8px 0 0 0; padding: 12px; background-color: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb; line-height: 1.6;">
                      ${message.replace(/\n/g, "<br>")}
                    </div>
                  </div>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td align="center" style="padding: 20px 25px 30px 25px; border-top: 1px solid #e5e7eb;">
                  <p style="font-size: 12px; color: ${STYLES.TEXT_COLOR_SECONDARY}; margin: 0;">
                    Este mensaje fue enviado desde el formulario de contacto en <a href="https://tu-dominio-sniptic.com" style="color: ${STYLES.BRAND_PRIMARY_COLOR}; text-decoration: none;">tu-dominio-sniptic.com</a>.
                  </p>
                  <p style="font-size: 12px; color: ${STYLES.TEXT_COLOR_SECONDARY}; margin: 5px 0 0 0;">
                    Sniptic &copy; ${new Date().getFullYear()}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  `
}
