import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Code2, Calendar, FolderOpen } from 'lucide-react'
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
  onClick: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { projectName, snippets, technologies } = project

  return (
    <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
            {projectName}
          </CardTitle>
          <FolderOpen className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Technologies */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Tecnologías</h4>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
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
          </div>
        </div>

        {/* Snippet Count */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Code2 className="h-4 w-4" />
            <span>{snippets.length} snippet{snippets.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>
              {new Date(
                Math.max(...snippets.map(s => new Date(s.updated_at).getTime()))
              ).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* View Details Button */}
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            onClick()
          }}
        >
          Ver detalles
        </Button>
      </CardContent>
    </Card>
  )
}
