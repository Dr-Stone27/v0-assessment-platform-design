import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Target } from "lucide-react"
import type { MetricScore } from "@/lib/types"
import { METRIC_DESCRIPTIONS } from "@/lib/constants/metric-descriptions"

interface StrengthsWeaknessesProps {
  metrics: Record<string, MetricScore>
}

export function StrengthsWeaknesses({ metrics }: StrengthsWeaknessesProps) {
  const sortedMetrics = Object.entries(metrics).sort((a, b) => b[1].normalized - a[1].normalized)

  const topStrengths = sortedMetrics.slice(0, 5)
  const developmentAreas = sortedMetrics.slice(-5).reverse()

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Strengths */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <CardTitle>Your Strengths</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">These are your top 5 learning dimensions where you excel.</p>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {topStrengths.map(([key, metric], index) => (
              <li key={key} className="space-y-1">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground w-4">#{index + 1}</span>
                    <p className="font-medium text-sm">{METRIC_DESCRIPTIONS[key]?.name || key}</p>
                  </div>
                  <span className="text-xs font-semibold text-primary tabular-nums">+{metric.normalized}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pl-6">{metric.description}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Development Areas */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-chart-2" />
            <CardTitle>Growth Opportunities</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            These are areas where focused development can enhance your learning.
          </p>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {developmentAreas.map(([key, metric], index) => (
              <li key={key} className="space-y-1">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground w-4">#{index + 1}</span>
                    <p className="font-medium text-sm">{METRIC_DESCRIPTIONS[key]?.name || key}</p>
                  </div>
                  <span className="text-xs font-semibold text-chart-2 tabular-nums">{metric.normalized}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pl-6">{metric.description}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
