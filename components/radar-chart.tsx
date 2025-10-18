"use client"

import { useMemo } from "react"
import type { MetricScore } from "@/lib/types"

interface RadarChartProps {
  metrics: Record<string, MetricScore>
  size?: number
}

export function RadarChart({ metrics, size = 400 }: RadarChartProps) {
  const chartData = useMemo(() => {
    const dimensions = [
      { key: "self-regulation", label: "Self-Regulation", angle: 0 },
      { key: "time-management", label: "Time Mgmt", angle: 30 },
      { key: "task-management", label: "Task Mgmt", angle: 60 },
      { key: "metacognitive-monitoring", label: "Metacognition", angle: 90 },
      { key: "concentration", label: "Concentration", angle: 120 },
      { key: "digital-literacy", label: "Digital Literacy", angle: 150 },
      { key: "collaboration", label: "Collaboration", angle: 180 },
      { key: "adaptability", label: "Adaptability", angle: 210 },
      { key: "note-taking", label: "Note-Taking", angle: 240 },
      { key: "retention", label: "Retention", angle: 270 },
      { key: "critical-thinking", label: "Critical Thinking", angle: 300 },
      { key: "well-being", label: "Well-being", angle: 330 },
    ]

    const center = size / 2
    const maxRadius = (size / 2) * 0.7

    // Generate concentric circles for grid
    const circles = [20, 40, 60, 80, 100].map((percent) => ({
      radius: (maxRadius * percent) / 100,
      label: percent === 100 ? "+100" : percent === 0 ? "0" : "",
    }))

    // Generate axis lines
    const axes = dimensions.map((dim) => {
      const angleRad = (dim.angle * Math.PI) / 180
      return {
        x1: center,
        y1: center,
        x2: center + maxRadius * Math.cos(angleRad),
        y2: center + maxRadius * Math.sin(angleRad),
        label: dim.label,
        labelX: center + (maxRadius + 30) * Math.cos(angleRad),
        labelY: center + (maxRadius + 30) * Math.sin(angleRad),
      }
    })

    // Generate data polygon points
    const dataPoints = dimensions.map((dim) => {
      const score = metrics[dim.key]?.normalized || 0
      // Convert -100 to +100 scale to 0 to maxRadius
      const normalizedScore = ((score + 100) / 200) * maxRadius
      const angleRad = (dim.angle * Math.PI) / 180
      return {
        x: center + normalizedScore * Math.cos(angleRad),
        y: center + normalizedScore * Math.sin(angleRad),
      }
    })

    const polygonPoints = dataPoints.map((p) => `${p.x},${p.y}`).join(" ")

    return { center, maxRadius, circles, axes, dataPoints, polygonPoints }
  }, [metrics, size])

  return (
    <svg width={size} height={size} className="mx-auto">
      {/* Background circles */}
      {chartData.circles.map((circle, i) => (
        <circle
          key={i}
          cx={chartData.center}
          cy={chartData.center}
          r={circle.radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-border"
          opacity={0.3}
        />
      ))}

      {/* Axis lines */}
      {chartData.axes.map((axis, i) => (
        <g key={i}>
          <line
            x1={axis.x1}
            y1={axis.y1}
            x2={axis.x2}
            y2={axis.y2}
            stroke="currentColor"
            strokeWidth="1"
            className="text-border"
            opacity={0.3}
          />
          <text
            x={axis.labelX}
            y={axis.labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs fill-muted-foreground font-medium"
          >
            {axis.label}
          </text>
        </g>
      ))}

      {/* Data polygon */}
      <polygon
        points={chartData.polygonPoints}
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="2"
        className="text-primary"
      />

      {/* Data points */}
      {chartData.dataPoints.map((point, i) => (
        <circle key={i} cx={point.x} cy={point.y} r="4" fill="currentColor" className="text-primary" />
      ))}

      {/* Center point */}
      <circle cx={chartData.center} cy={chartData.center} r="3" fill="currentColor" className="text-muted-foreground" />
    </svg>
  )
}
