// Core Assessment Types

export interface Demographics {
  sessionId: string
  userId?: string
  faculty: string
  yearOfStudy: string
  courseLoad: string
}

export interface QuestionResponse {
  questionId: string
  value: number // -2 to +2
  timestamp: Date
}

export interface MetricScore {
  raw: number
  normalized: number // -100 to +100
  tier: string
  description: string
}

export interface Mindset {
  type: "growth" | "fixed"
  score: number
  strength: number
}

export interface StudyStyle {
  score: number
  title: string
}

export interface Archetype {
  name: string
  fitScore: number
  distance: number
}

export interface CompleteProfile {
  sessionId: string
  userId?: string
  demographics: Demographics
  layer1_detailedMetrics: Record<string, MetricScore>
  layer2_mindset: Mindset
  layer3_studyStyles: Record<string, StudyStyle>
  layer4_archetype: {
    primary: Archetype
    secondary: Archetype
  }
  personaIdentity: string
  calculatedAt: string
}

export interface AssessmentState {
  demographics: Demographics | null
  responses: QuestionResponse[]
  currentQuestionIndex: number
  isComplete: boolean
  profile: CompleteProfile | null
}

// Question Structure
export interface Question {
  id: string
  number: number
  text: string
  dimension: string
  type: "likert" | "scenario"
  leftLabel?: string
  rightLabel?: string
  options?: Array<{
    label: string
    value: number
  }>
}

// CMS Content Types
export interface ArchetypeContent {
  id: string
  slug: string
  name: string
  core_philosophy: string
  defining_traits: string[]
}

export interface InteractionStory {
  id: string
  archetype_id: string
  title: string
  narrative: string
  metrics_in_play: Record<string, "high" | "low">
  story_order: number
}

export interface GrowthStrategy {
  id: string
  archetype_id: string
  title: string
  strategy_text: string
  metrics_addressed: string[]
  context_filters: {
    years: string[]
    faculties: string[]
    courseLoads: string[]
  }
  strategy_order: number
}

export interface ArchetypeMetric {
  id: string
  archetype_id: string
  metric_name: string
  is_strength: boolean
  level: string
  behavior_description: string
}

export interface ArchetypeChallenge {
  id: string
  archetype_id: string
  challenge_title: string
  challenge_description: string
  challenge_order: number
}

// Personalized Report Types
export interface PersonalizedReport {
  archetype: ArchetypeContent
  interactionStories: InteractionStory[]
  metrics: Record<string, MetricScore>
  strategies: GrowthStrategy[]
  challenges: ArchetypeChallenge[]
  userContext: {
    faculty: string
    yearOfStudy: string
    courseLoad: string
  }
}

export interface Tool {
  id: string
  name: string
  description: string
  category: string
  url?: string
  icon_url?: string
  archetype_tools?: Array<{
    is_primary: boolean
    justification: string
    tool_order: number
    archetype_id: string
  }>
  tool_tags?: Array<{ tag: string }>
}

export interface Technique {
  id: string
  name: string
  description: string
  category: string
  technique_tools?: Array<{
    tool_id: string
    tools: Tool
  }>
}

export interface ArchetypeTool {
  id: string
  archetype_id: string
  tool_id: string
  is_primary: boolean
  justification: string
  tool_order: number
}

export interface ToolTag {
  id: string
  tool_id: string
  tag: string
}
