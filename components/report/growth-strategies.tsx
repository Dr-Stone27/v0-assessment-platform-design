import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, CheckCircle2 } from "lucide-react"
import type { GrowthStrategy } from "@/lib/types"

interface GrowthStrategiesProps {
  strategies: GrowthStrategy[]
}

export function GrowthStrategies({ strategies }: GrowthStrategiesProps) {
  if (strategies.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          <CardTitle>Your Personalized Action Plan</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          These strategies are specifically selected for your learning profile, academic context, and course load.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {strategies.map((strategy, index) => {
            const metricsAddressed = Array.isArray(strategy.metrics_addressed) ? strategy.metrics_addressed : []

            return (
              <div key={strategy.id} className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 shrink-0 mt-0.5">
                    <span className="text-sm font-semibold text-primary">{index + 1}</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-base text-balance leading-snug">{strategy.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{strategy.strategy_text}</p>
                    {metricsAddressed.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {metricsAddressed.map((metric) => (
                          <Badge key={metric} variant="outline" className="text-xs">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            {metric}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
