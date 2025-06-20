import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, FolderOpen } from 'lucide-react'
import type { SnippetWithRelations } from '@/types/database'

interface ProjectGroup {
  projectName: string
  snippets: SnippetWithRelations[]
  technologies: Array<{
    name: string
    color?: string
    type: 'language' | 'framework'
  }>
}

interface ProjectCardProps {
  project: ProjectGroup
  href: string
}

export function ProjectCard({ project, href }: ProjectCardProps) {
  const { projectName, snippets, technologies } = project

  const lastUpdate = new Date(
    Math.max(...snippets.map(s => new Date(s.updated_at).getTime()))
  )

  return (
    <Link href={href}>
      <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
              {projectName}
            </CardTitle>
            <FolderOpen className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-2xl font-bold">{snippets.length}</p>
              <p className="text-xs text-muted-foreground">Snippets</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{technologies.length}</p>
              <p className="text-xs text-muted-foreground">Tecnologías</p>
            </div>
          </div>

          {/* Technologies */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Tecnologías</h4>
            <div className="flex flex-wrap gap-2">
              {technologies.slice(0, 4).map((tech, index) => (
                <Badge
                  key={`${tech.name}-${index}`}
                  variant={tech.type === 'language' ? 'default' : 'outline'}
                  className="text-xs"
                  style={
                    tech.type === 'language' && tech.color
                      ? { backgroundColor: tech.color + '20', borderColor: tech.color, color: tech.color }
                      : undefined
                  }
                >
                  {tech.name}
                </Badge>
              ))}
              {technologies.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{technologies.length - 4} más
                </Badge>
              )}
            </div>
          </div>

          {/* Last Update */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Actualizado el {lastUpdate.toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
