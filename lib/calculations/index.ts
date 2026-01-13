import type { QuestionResponse, Demographics, CompleteProfile, MetricScore, Mindset, StudyStyle } from "../types"
import { ARCHETYPE_TEMPLATES, type ArchetypeName } from "../constants/archetype-templates"
import { getTierForScore } from "../constants/metric-descriptions"

// Question to dimension mapping (questions 1-26 only)
const QUESTION_MAPPING: Record<number, string> = {
  1: "self-regulation",
  2: "self-regulation",
  3: "self-regulation",
  4: "time-management",
  5: "time-management",
  6: "time-management",
  7: "task-management",
  8: "task-management",
  9: "metacognitive-monitoring",
  10: "metacognitive-monitoring",
  11: "concentration",
  12: "concentration",
  13: "digital-literacy",
  14: "digital-literacy",
  15: "collaboration",
  16: "collaboration",
  17: "adaptability",
  18: "adaptability",
  19: "note-taking",
  20: "note-taking",
  21: "retention",
  22: "retention",
  23: "critical-thinking",
  24: "critical-thinking",
  25: "well-being",
  26: "well-being",
}

interface RawDimensionScore {
  raw: number
  maxPossible: number
  questionCount: number
}

export function calculateCompleteProfile(responses: QuestionResponse[], demographics: Demographics): CompleteProfile {
  // Validation: All 29 questions must be answered
  if (responses.length !== 29) {
    throw new Error(
      `Incomplete assessment: ${responses.length}/29 questions answered. All questions must be completed.`,
    )
  }

  // STEP 1: Calculate raw scores for 12 dimensions (questions 1-26 only)
  const rawScores = calculateRawScores(responses)

  // STEP 2: Normalize to -100 to +100 scale
  const normalizedScores = normalizeScores(rawScores)

  // STEP 3: Calculate mindset (questions 27-29 only) - INDEPENDENT
  const mindset = calculateMindset(responses)

  // STEP 4: Calculate study styles (Layer 3)
  const studyStyles = calculateStudyStyles(normalizedScores)

  // STEP 5: Determine archetype using vector distance (Layer 4)
  const archetypes = determineArchetypeByVectorDistance(normalizedScores)

  // STEP 6: Assemble complete profile
  return {
    sessionId: demographics.sessionId,
    userId: demographics.userId,
    demographics: {
      sessionId: demographics.sessionId,
      faculty: demographics.faculty,
      yearOfStudy: demographics.yearOfStudy,
      courseLoad: demographics.courseLoad,
    },
    layer1_detailedMetrics: normalizedScores,
    layer2_mindset: mindset,
    layer3_studyStyles: studyStyles,
    layer4_archetype: {
      primary: {
        name: archetypes.primary.name,
        fitScore: archetypes.primary.fitScore,
        distance: archetypes.primary.distance,
      },
      secondary: {
        name: archetypes.secondary.name,
        fitScore: archetypes.secondary.fitScore,
        distance: archetypes.secondary.distance,
      },
    },
    personaIdentity: `${archetypes.primary.name} with a ${mindset.type === "growth" ? "Growth" : "Fixed"} Mindset`,
    calculatedAt: new Date().toISOString(),
  }
}

function calculateRawScores(responses: QuestionResponse[]): Record<string, RawDimensionScore> {
  const dimensionScores: Record<string, RawDimensionScore> = {
    "self-regulation": { raw: 0, maxPossible: 0, questionCount: 0 },
    "time-management": { raw: 0, maxPossible: 0, questionCount: 0 },
    "task-management": { raw: 0, maxPossible: 0, questionCount: 0 },
    "metacognitive-monitoring": { raw: 0, maxPossible: 0, questionCount: 0 },
    concentration: { raw: 0, maxPossible: 0, questionCount: 0 },
    "digital-literacy": { raw: 0, maxPossible: 0, questionCount: 0 },
    collaboration: { raw: 0, maxPossible: 0, questionCount: 0 },
    adaptability: { raw: 0, maxPossible: 0, questionCount: 0 },
    "note-taking": { raw: 0, maxPossible: 0, questionCount: 0 },
    retention: { raw: 0, maxPossible: 0, questionCount: 0 },
    "critical-thinking": { raw: 0, maxPossible: 0, questionCount: 0 },
    "well-being": { raw: 0, maxPossible: 0, questionCount: 0 },
  }

  // Process questions 1-26 only
  responses.forEach((response) => {
    const questionNum = Number.parseInt(response.questionId.replace("q", ""))

    if (questionNum >= 1 && questionNum <= 26) {
      const dimension = QUESTION_MAPPING[questionNum]

      if (dimension) {
        // Response value is already -2 to +2
        dimensionScores[dimension].raw += response.value
        dimensionScores[dimension].maxPossible += 2 // Max per question
        dimensionScores[dimension].questionCount += 1
      }
    }
  })

  return dimensionScores
}

function normalizeScores(rawScores: Record<string, RawDimensionScore>): Record<string, MetricScore> {
  const normalized: Record<string, MetricScore> = {}

  Object.keys(rawScores).forEach((dimension) => {
    const { raw, maxPossible } = rawScores[dimension]

    // Formula: (Raw Score / Max Raw Score) × 100
    const normalizedScore = (raw / maxPossible) * 100
    const roundedScore = Math.round(normalizedScore)

    // Get descriptive tier
    const tier = getTierForScore(dimension, roundedScore)

    normalized[dimension] = {
      raw: raw,
      normalized: roundedScore,
      tier: tier.title,
      description: tier.description,
    }
  })

  return normalized
}

function calculateMindset(responses: QuestionResponse[]): Mindset {
  // Questions 27, 28, 29 ONLY
  let totalScore = 0;
  [27, 28, 29].forEach((questionNum) => {
    const response = responses.find((r) => r.questionId === `q${questionNum}`)
    if (response) {
      totalScore += response.value // Already -2 to +2
    }
  })

  // Threshold rule: >= +1 = Growth, <= 0 = Fixed
  const mindsetType = totalScore >= 1 ? "growth" : "fixed"

  return {
    type: mindsetType,
    score: totalScore,
    strength: Math.abs(totalScore),
  }
}

function calculateStudyStyles(normalizedScores: Record<string, MetricScore>): Record<string, StudyStyle> {
  const styleGroups = {
    planning: ["self-regulation", "time-management", "task-management"],
    processing: ["metacognitive-monitoring", "critical-thinking", "note-taking", "retention"],
    execution: ["concentration", "adaptability", "well-being"],
    engagement: ["collaboration", "digital-literacy"],
  }

  const styles: Record<string, StudyStyle> = {}

  Object.keys(styleGroups).forEach((styleName) => {
    const dimensions = styleGroups[styleName as keyof typeof styleGroups]
    const scores = dimensions.map((dim) => normalizedScores[dim].normalized)
    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)

    styles[styleName] = {
      score: avgScore,
      title: getStyleTitle(styleName, avgScore),
    }
  })

  return styles
}

function getStyleTitle(styleName: string, score: number): string {
  const titles: Record<string, Record<string, string>> = {
    planning: {
      high: "Highly Structured Planner",
      moderate: "Flexible Planner",
      low: "Spontaneous Responder",
    },
    processing: {
      high: "Deep & Deliberate Processor",
      moderate: "Balanced Processor",
      low: "Quick & Surface Processor",
    },
    execution: {
      high: "Focused & Resilient Executor",
      moderate: "Adaptive Executor",
      low: "Reactive Executor",
    },
    engagement: {
      high: "Collaborative & Tech-Savvy",
      moderate: "Selectively Engaged",
      low: "Independent & Tech-Cautious",
    },
  }

  const absScore = Math.abs(score)
  if (absScore >= 50) return titles[styleName].high
  if (absScore >= 20) return titles[styleName].moderate
  return titles[styleName].low
}

function determineArchetypeByVectorDistance(normalizedScores: Record<string, MetricScore>) {
  const distances: Record<string, number> = {}

  // Calculate Euclidean distance to each archetype template
  Object.keys(ARCHETYPE_TEMPLATES).forEach((archetypeName) => {
    const template = ARCHETYPE_TEMPLATES[archetypeName as ArchetypeName]
    let sumOfSquares = 0

    Object.keys(template).forEach((dimension) => {
      const userScore = normalizedScores[dimension].normalized
      const templateScore = template[dimension as keyof typeof template]
      const difference = userScore - templateScore
      sumOfSquares += difference * difference
    })

    const distance = Math.sqrt(sumOfSquares)
    distances[archetypeName] = distance
  })

  // Sort by distance (lowest = best fit)
  const sortedArchetypes = Object.entries(distances)
    .sort((a, b) => a[1] - b[1])
    .map(([name, distance]) => ({
      name,
      distance: Math.round(distance * 10) / 10,
      fitScore: calculateFitScore(distance),
    }))

  return {
    primary: sortedArchetypes[0],
    secondary: sortedArchetypes[1],
    allFits: sortedArchetypes,
  }
}

function calculateFitScore(distance: number): number {
  // Convert distance to percentage (0-100%)
  // Lower distance = higher fit
  // Max theoretical distance ≈ 600 (rough estimate based on score ranges)
  const maxDistance = 600
  const fitScore = Math.max(0, 100 - (distance / maxDistance) * 100)
  return Math.round(fitScore)
}
