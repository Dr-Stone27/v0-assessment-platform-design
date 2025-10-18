import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    },
  )

  const { searchParams } = new URL(request.url)
  const archetypeId = searchParams.get("id")

  try {
    let query = supabase.from("archetypes").select(
      `
      id,
      name,
      slug,
      core_philosophy,
      defining_traits,
      archetype_tools (
        tool_id,
        is_primary,
        justification,
        tool_order,
        tools (
          id,
          name,
          description,
          category,
          url
        )
      ),
      interaction_stories (
        id,
        title,
        narrative,
        metrics_in_play,
        story_order
      ),
      growth_strategies (
        id,
        title,
        strategy_text,
        metrics_addressed,
        strategy_order
      )
    `,
    )

    if (archetypeId) {
      query = query.eq("id", archetypeId)
    }

    const { data, error } = await query

    if (error) throw error

    return Response.json(archetypeId ? data?.[0] : data)
  } catch (error) {
    console.error("[v0] Error fetching archetypes:", error)
    return Response.json({ error: "Failed to fetch archetypes" }, { status: 500 })
  }
}
