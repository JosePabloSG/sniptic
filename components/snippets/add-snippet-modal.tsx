import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AddSnippetForm, type SnippetFormData } from './add-snippet-form'
import { useSnippetOperations } from '@/hooks/use-snippet-operations'
import { useUser } from '@/hooks/use-user'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import type { Category, Language, Framework } from '@/types/database'

interface AddSnippetModalProps {
  categories: Category[]
  languages: Language[]
  frameworks: Framework[]
  onSnippetAdded?: () => void
  trigger?: React.ReactNode
}

export function AddSnippetModal({
  categories,
  languages,
  frameworks,
  onSnippetAdded,
  trigger
}: AddSnippetModalProps) {
  const [open, setOpen] = useState(false)
  const { user } = useUser()
  const { createSnippet, loading, error } = useSnippetOperations()

  const handleSubmit = async (data: SnippetFormData) => {
    if (!user) {
      toast.error('Debes iniciar sesión para crear snippets')
      return
    }

    const result = await createSnippet(user.id, data)

    if (result) {
      toast.success('Snippet creado exitosamente')
      setOpen(false)
      onSnippetAdded?.()
    } else if (error) {
      toast.error(error)
    }
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const defaultTrigger = (
    <Button className="flex items-center gap-2">
      <Plus className="h-4 w-4" />
      Agregar Snippet
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <AddSnippetForm
          categories={categories}
          languages={languages}
          frameworks={frameworks}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  )
}
