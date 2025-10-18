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

  try {
    const { data, error } = await supabase.from("techniques").select(
      `
        id,
        name,
        description,
        category,
        technique_tools (
          tool_id,
          tools (
            id,
            name,
            url
          )
        )
      `,
    )

    if (error) throw error

    return Response.json(data)
  } catch (error) {
    console.error("[v0] Error fetching techniques:", error)
    return Response.json({ error: "Failed to fetch techniques" }, { status: 500 })
  }
}
