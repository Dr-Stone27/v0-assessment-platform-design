import { type NextRequest, NextResponse } from "next/server"
import { generatePersonalizedReport } from "@/lib/report-generator"
import type { CompleteProfile } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { profile, userContext } = body as {
      profile: CompleteProfile
      userContext: {
        yearOfStudy: string
        faculty: string
        courseLoad: string
      }
    }

    if (!profile || !userContext) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const report = await generatePersonalizedReport(profile, userContext)

    return NextResponse.json(report)
  } catch (error) {
    console.error("[v0] Error in generate-report API:", error)
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 })
  }
}
