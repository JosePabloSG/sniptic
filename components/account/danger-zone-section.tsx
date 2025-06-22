"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAccount } from '@/hooks/use-account'
import { AlertTriangle, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function DangerZoneSection() {
  const { accountData, deleteAccount } = useAccount()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const user = accountData.user
  const expectedConfirmation = 'DELETE'

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== expectedConfirmation) return

    setIsDeleting(true)
    try {
      const result = await deleteAccount()
      if (result.success) {
        toast.success('Cuenta eliminada exitosamente.')
        // Redirigir a la página de inicio después de eliminar la cuenta
        setTimeout(() => {
          router.push('/')
        }, 1500)
      } else {
        toast.error(result.error || 'No se pudo eliminar la cuenta.')
      }
    } finally {
      setIsDeleting(false)
    }
  }

  const canDelete = deleteConfirmation === expectedConfirmation

  return (
    <>
      <Card className="border-destructive/20">
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-destructive mb-2">ZONA DE PELIGRO</h3>
            </div>

            <div className="border border-destructive/20 rounded-lg p-4 bg-destructive/5">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-destructive mb-2">Solicitar eliminación de cuenta</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Eliminar tu cuenta es permanente y no se puede deshacer. Tus datos serán eliminados
                    inmediatamente y no se podrán recuperar.
                  </p>
                  <Button
                    onClick={() => setShowDeleteDialog(true)}
                    variant="destructive"
                    size="sm"
                  >
                    Solicitar eliminar cuenta
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              <span>Confirmar eliminación de cuenta</span>
            </DialogTitle>
            <DialogDescription className="text-left">
              Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta
              y todos tus datos serán eliminados inmediatamente de nuestros servidores.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive font-medium">
                ⚠️ Los siguientes datos serán eliminados:
              </p>
              <ul className="mt-2 text-sm text-muted-foreground space-y-1">
                <li>• Tu perfil de usuario</li>
                <li>• Todos tus snippets de código</li>
                <li>• Proyectos y clasificaciones</li>
                <li>• Configuraciones y preferencias</li>
              </ul>
            </div>

            <div>
              <Label htmlFor="delete-confirmation" className="text-sm font-medium">
                Para confirmar, escribe <code className="bg-muted px-1 py-0.5 rounded text-sm">DELETE</code> en el campo de abajo:
              </Label>
              <Input
                id="delete-confirmation"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder="Escribe DELETE aquí"
                className="mt-2"
                autoComplete="off"
              />
            </div>

            {user?.email && (
              <div className="text-sm text-muted-foreground">
                <p>Cuenta que será eliminada: <strong>{user.email}</strong></p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              onClick={() => {
                setShowDeleteDialog(false)
                setDeleteConfirmation('')
              }}
              variant="outline"
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDeleteAccount}
              variant="destructive"
              disabled={!canDelete || isDeleting}
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar cuenta'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
