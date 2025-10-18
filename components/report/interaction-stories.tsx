import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sparkles } from "lucide-react"
import type { InteractionStory } from "@/lib/types"

interface InteractionStoriesProps {
  stories: InteractionStory[]
}

export function InteractionStories({ stories }: InteractionStoriesProps) {
  if (stories.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <CardTitle>Your Unique Learning Dynamics</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          These interaction stories explain how your strengths and challenges work together to shape your learning
          experience.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {stories.map((story, index) => {
          const metricsInPlay =
            typeof story.metrics_in_play === "object" && story.metrics_in_play !== null
              ? Object.entries(story.metrics_in_play as Record<string, string>)
              : []

          return (
            <div key={story.id} className="space-y-3">
              {index > 0 && <Separator className="my-6" />}

              <div className="flex items-start justify-between gap-4">
                <h3 className="font-semibold text-lg text-balance">{story.title}</h3>
                <Badge variant="outline" className="shrink-0">
                  Story {index + 1}
                </Badge>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">{story.narrative}</p>

              {metricsInPlay.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {metricsInPlay.map(([metric, level]) => (
                    <Badge key={metric} variant={level === "high" ? "default" : "secondary"} className="text-xs">
                      {metric}: {level}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
