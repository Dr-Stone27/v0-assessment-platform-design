import { cn } from "@/lib/utils"

interface MetricBarProps {
  label: string
  score: number
  tier: string
  description: string
}

export function MetricBar({ label, score, tier, description }: MetricBarProps) {
  // Convert -100 to +100 scale to 0-100 for display
  const displayScore = ((score + 100) / 200) * 100

  // Determine color based on score
  const getColor = (score: number) => {
    const abs = Math.abs(score)
    if (abs >= 70) return "bg-primary"
    if (abs >= 30) return "bg-chart-2"
    return "bg-muted"
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <div className="space-y-1">
          <h4 className="font-medium text-sm">{label}</h4>
          <p className="text-xs text-muted-foreground">{tier}</p>
        </div>
        <span className="text-sm font-semibold tabular-nums">
          {score > 0 ? "+" : ""}
          {score}
        </span>
      </div>
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn("absolute top-0 left-0 h-full transition-all rounded-full", getColor(score))}
          style={{ width: `${displayScore}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
