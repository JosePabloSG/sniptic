import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function DELETE() {
  try {
    const supabase = await createClient()

    // Obtener el usuario actual
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    // Eliminar todos los snippets del usuario
    const { error: snippetsError } = await supabase
      .from('snippets')
      .delete()
      .eq('user_id', user.id)

    if (snippetsError) {
      console.error('Error eliminando snippets:', snippetsError)
      return NextResponse.json(
        { error: 'Error eliminando datos del usuario' },
        { status: 500 }
      )
    }

    // Eliminar el usuario de la autenticación
    // Nota: Esto requiere permisos de admin en una aplicación real
    // En Supabase, esto se hace típicamente a través de funciones Edge o RLS
    const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id)

    if (deleteError) {
      console.error('Error eliminando usuario:', deleteError)
      return NextResponse.json(
        { error: 'Error eliminando cuenta de usuario' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Cuenta eliminada exitosamente'
    })

  } catch (error) {
    console.error('Error en eliminación de cuenta:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
