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
  const archetypeId = searchParams.get("archetypeId")
  const tag = searchParams.get("tag")

  try {
    let query = supabase.from("tools").select(
      `
        id,
        name,
        description,
        category,
        url,
        icon_url,
        archetype_tools (
          is_primary,
          justification,
          tool_order,
          archetype_id
        ),
        tool_tags (tag)
      `,
    )

    if (archetypeId) {
      query = query.eq("archetype_tools.archetype_id", archetypeId)
    }

    if (tag) {
      query = query.eq("tool_tags.tag", tag)
    }

    const { data, error } = await query

    if (error) throw error

    return Response.json(data)
  } catch (error) {
    console.error("[v0] Error fetching tools:", error)
    return Response.json({ error: "Failed to fetch tools" }, { status: 500 })
  }
}
