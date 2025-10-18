import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface ToolCardProps {
  name: string
  description: string
  category: string
  url?: string
  isPrimary?: boolean
  justification?: string
  tags?: string[]
}

export function ToolCard({ name, description, category, url, isPrimary, justification, tags }: ToolCardProps) {
  return (
    <Card className={`h-full flex flex-col ${isPrimary ? "border-2 border-blue-500 bg-blue-50" : ""}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>{category}</CardDescription>
          </div>
          {isPrimary && <Badge className="bg-blue-600">Top Pick</Badge>}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <p className="text-sm text-slate-600">{description}</p>

        {justification && (
          <div className="bg-slate-50 p-3 rounded-md border border-slate-200">
            <p className="text-xs font-semibold text-slate-700 mb-1">Why this tool:</p>
            <p className="text-sm text-slate-600">{justification}</p>
          </div>
        )}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {url && (
          <Button asChild className="w-full mt-auto bg-transparent" variant="outline">
            <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              Visit Tool
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
