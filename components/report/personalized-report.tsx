"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { ArchetypeProfile } from "./archetype-profile"
import { InteractionStories } from "./interaction-stories"
import { StrengthsWeaknesses } from "./strengths-weaknesses"
import { GrowthStrategies } from "./growth-strategies"
import type { PersonalizedReport } from "@/lib/types"

interface ReportProps {
  report: PersonalizedReport | null
  isLoading?: boolean
  error?: string | null
}

export function PersonalizedReportComponent({ report, isLoading, error }: ReportProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </CardContent>
        </Card>
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Loading Report</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!report) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Report Available</AlertTitle>
        <AlertDescription>
          Unable to generate your personalized report. Please try completing the assessment again.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-8">
      {/* Archetype Profile */}
      <ArchetypeProfile archetype={report.archetype} />

      {/* Interaction Stories */}
      <InteractionStories stories={report.interactionStories} />

      {/* Strengths & Weaknesses */}
      <StrengthsWeaknesses metrics={report.metrics} />

      {/* Growth Strategies */}
      <GrowthStrategies strategies={report.strategies} />
    </div>
  )
}
