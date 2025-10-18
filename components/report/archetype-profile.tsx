import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Archetype } from "@/lib/types"

interface ArchetypeProfileProps {
  archetype: Archetype
}

export function ArchetypeProfile({ archetype }: ArchetypeProfileProps) {
  const traits = Array.isArray(archetype.defining_traits) ? archetype.defining_traits : []

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <CardTitle className="text-3xl text-balance">{archetype.name}</CardTitle>
            <CardDescription className="text-base leading-relaxed">{archetype.core_philosophy}</CardDescription>
          </div>
          <Badge variant="default" className="text-sm px-3 py-1 shrink-0">
            Your Archetype
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wide">Defining Traits</h4>
          <ul className="space-y-2">
            {traits.map((trait, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <p className="text-sm leading-relaxed">{trait}</p>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
