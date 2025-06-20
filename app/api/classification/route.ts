import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { ClassificationService } from '@/services/classification.service'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const classificationService = new ClassificationService(true) // true = server-side
    const data = await classificationService.getClassificationData(user.id)

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching classification data:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { categoryId, languageId } = body

    const classificationService = new ClassificationService(true) // true = server-side

    let data
    if (categoryId) {
      data = await classificationService.getSnippetsByCategory(user.id, categoryId)
    } else if (languageId) {
      data = await classificationService.getSnippetsByLanguage(user.id, languageId)
    } else {
      data = await classificationService.getSnippetsWithRelations(user.id)
    }

    return NextResponse.json({ snippets: data })
  } catch (error) {
    console.error('Error filtering snippets:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
