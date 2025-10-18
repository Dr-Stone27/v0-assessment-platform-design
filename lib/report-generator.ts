import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type {
  CompleteProfile,
  ArchetypeContent,
  InteractionStory,
  GrowthStrategy,
  ArchetypeChallenge,
  PersonalizedReport,
  MetricScore,
} from "./types"

export async function generatePersonalizedReport(
  profile: CompleteProfile,
  userContext: {
    yearOfStudy: string
    faculty: string
    courseLoad: string
  },
): Promise<PersonalizedReport> {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        },
      },
    },
  )

  const archetypeSlug = profile.layer4_archetype.primary.name
    .toLowerCase()
    .replace(/^the\s+/, "")
    .replace(/\s+/g, "-")

  // 1. Fetch the archetype
  const { data: archetype, error: archetypeError } = await supabase
    .from("archetypes")
    .select("*")
    .eq("slug", archetypeSlug)
    .single()

  if (archetypeError || !archetype) {
    throw new Error(`Archetype not found: ${archetypeSlug}`)
  }

  // 2. Fetch all interaction stories for this archetype
  const { data: allStories } = await supabase
    .from("interaction_stories")
    .select("*")
    .eq("archetype_id", archetype.id)
    .order("story_order")

  // 3. Score and select top 3 interaction stories based on user's metric gaps
  const topStories = selectTopInteractionStories(allStories || [], profile.layer1_detailedMetrics)

  // 4. Fetch challenges
  const { data: challenges } = await supabase
    .from("archetype_challenges")
    .select("*")
    .eq("archetype_id", archetype.id)
    .order("challenge_order")

  // 5. Fetch and filter strategies based on user context
  const { data: allStrategies } = await supabase
    .from("growth_strategies")
    .select("*")
    .eq("archetype_id", archetype.id)
    .order("strategy_order")

  const filteredStrategies = filterStrategiesByContext(allStrategies || [], userContext, profile.layer1_detailedMetrics)

  return {
    archetype: archetype as ArchetypeContent,
    interactionStories: topStories,
    metrics: profile.layer1_detailedMetrics,
    strategies: filteredStrategies,
    challenges: (challenges as ArchetypeChallenge[]) || [],
    userContext,
  }
}

function selectTopInteractionStories(
  stories: InteractionStory[],
  metrics: Record<string, MetricScore>,
): InteractionStory[] {
  const scoredStories = stories.map((story) => {
    let relevanceScore = 0

    // Parse metrics_in_play to calculate relevance
    const metricsInPlay = story.metrics_in_play as Record<string, string>

    for (const [metricKey, expectedLevel] of Object.entries(metricsInPlay)) {
      const metricScore = metrics[metricKey]?.normalized || 0

      // Check if the user's score matches the expected pattern
      if (expectedLevel === "high" && metricScore > 30) {
        relevanceScore += Math.abs(metricScore)
      } else if (expectedLevel === "low" && metricScore < -30) {
        relevanceScore += Math.abs(metricScore)
      }
    }

    return { story, relevanceScore }
  })

  // Sort by relevance and take top 3
  return scoredStories
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 3)
    .map((s) => s.story)
}

function filterStrategiesByContext(
  strategies: GrowthStrategy[],
  userContext: {
    yearOfStudy: string
    faculty: string
    courseLoad: string
  },
  metrics: Record<string, MetricScore>,
): GrowthStrategy[] {
  return strategies
    .filter((strategy) => {
      const filters = strategy.context_filters as {
        years?: string[]
        faculties?: string[]
        courseLoads?: string[]
      }

      // If no filters, include the strategy
      if (!filters.years && !filters.faculties && !filters.courseLoads) {
        return true
      }

      // Check year match
      const yearMatch = !filters.years || filters.years.length === 0 || filters.years.includes(userContext.yearOfStudy)

      // Check faculty match
      const facultyMatch =
        !filters.faculties || filters.faculties.length === 0 || filters.faculties.includes(userContext.faculty)

      // Check course load match
      const courseLoadMatch =
        !filters.courseLoads || filters.courseLoads.length === 0 || filters.courseLoads.includes(userContext.courseLoad)

      return yearMatch && facultyMatch && courseLoadMatch
    })
    .slice(0, 6) // Return top 6 most relevant strategies
}
