"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadarChart } from "@/components/radar-chart"
import { MetricBar } from "@/components/metric-bar"
import { METRIC_DESCRIPTIONS } from "@/lib/constants/metric-descriptions"
import type { CompleteProfile } from "@/lib/types"
import { Brain, TrendingUp, Target, Lightbulb } from "lucide-react"

interface PrintableReportProps {
  profile: CompleteProfile
}

export function PrintableReport({ profile }: PrintableReportProps) {
  const metrics = Object.entries(profile.layer1_detailedMetrics)
  const topStrengths = metrics
    .sort((a, b) => b[1].normalized - a[1].normalized)
    .slice(0, 3)
  const developmentAreas = metrics
    .sort((a, b) => a[1].normalized - b[1].normalized)
    .slice(0, 3)

  return (
    <div className="printable-report bg-white text-black p-8 max-w-4xl mx-auto" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Brain className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Learning Profile Report</h1>
        </div>
        <p className="text-lg text-gray-600">{profile.personaIdentity}</p>
        <p className="text-sm text-gray-500 mt-2">
          Generated on {new Date(profile.calculatedAt).toLocaleDateString()}
        </p>
      </div>

      {/* Primary Archetype */}
      <Card className="mb-8 border-2 border-blue-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-blue-900">
            {profile.layer4_archetype.primary.name}
          </CardTitle>
          <CardDescription className="text-base">
            Your primary learning archetype with {profile.layer4_archetype.primary.fitScore}% match
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-4">
            <div className="w-full max-w-md">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Fit Score</span>
                <span className="font-semibold">{profile.layer4_archetype.primary.fitScore}%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all"
                  style={{ width: `${profile.layer4_archetype.primary.fitScore}%` }}
                />
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 text-center">
            Secondary archetype: {profile.layer4_archetype.secondary.name} ({profile.layer4_archetype.secondary.fitScore}% match)
          </p>
        </CardContent>
      </Card>

      {/* Mindset */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-xl">Mindset Assessment</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold capitalize text-gray-900">
                {profile.layer2_mindset.type} Mindset
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {profile.layer2_mindset.type === "growth"
                  ? "You believe abilities can be developed through effort and learning."
                  : "You may benefit from embracing challenges as opportunities for growth."}
              </p>
            </div>
            <Badge
              variant={profile.layer2_mindset.type === "growth" ? "default" : "secondary"}
              className="text-base px-4 py-2"
            >
              Score: {profile.layer2_mindset.score > 0 ? "+" : ""}
              {profile.layer2_mindset.score}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Radar Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Learning Dimensions Overview</CardTitle>
          <CardDescription>Visual representation of your 12 learning dimensions</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <RadarChart metrics={profile.layer1_detailedMetrics} size={400} />
        </CardContent>
      </Card>

      {/* Strengths and Development Areas */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <CardTitle className="text-lg">Top Strengths</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {topStrengths.map(([key, metric]) => (
                <li key={key} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-gray-900">
                      {METRIC_DESCRIPTIONS[key].name}
                    </p>
                    <p className="text-xs text-gray-600">{metric.tier}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-600" />
              <CardTitle className="text-lg">Development Areas</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {developmentAreas.map(([key, metric]) => (
                <li key={key} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-gray-900">
                      {METRIC_DESCRIPTIONS[key].name}
                    </p>
                    <p className="text-xs text-gray-600">{metric.tier}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Detailed Metrics Breakdown</CardTitle>
          <CardDescription>Complete scores across all 12 learning dimensions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {metrics.map(([key, metric]) => (
            <MetricBar
              key={key}
              label={METRIC_DESCRIPTIONS[key].name}
              score={metric.normalized}
              tier={metric.tier}
              description={metric.description}
            />
          ))}
        </CardContent>
      </Card>

      {/* Study Styles */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Study Style Categories</CardTitle>
          <CardDescription>Your approach across four key learning dimensions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(profile.layer3_studyStyles).map(([key, style]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold capitalize text-gray-900">{key}</h4>
                  <span className="text-sm font-semibold text-gray-600">
                    {style.score > 0 ? "+" : ""}
                    {style.score}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{style.title}</p>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${((style.score + 100) / 200) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 border-t border-gray-300 pt-4">
        <p>Session ID: {profile.sessionId}</p>
        <p className="mt-1">
          This report was generated by the Learning Archetype Assessment Platform
        </p>
      </div>
    </div>
  )
}
