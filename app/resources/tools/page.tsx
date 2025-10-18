"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface Tool {
  id: string
  name: string
  description: string
  category: string
  url?: string
  archetype_tools?: Array<{
    is_primary: boolean
    justification: string
    tool_order: number
    archetype_id: string
  }>
  tool_tags?: Array<{ tag: string }>
}

interface ArchetypeTools {
  [key: string]: {
    name: string
    tools: Tool[]
    primaryTools: Tool[]
  }
}

const ARCHETYPES = [
  { id: "organizer", name: "Organizer", color: "bg-blue-50 border-blue-200" },
  { id: "deep-diver", name: "Deep Diver", color: "bg-purple-50 border-purple-200" },
  { id: "collaborator", name: "Collaborator", color: "bg-green-50 border-green-200" },
  { id: "adaptive-learner", name: "Adaptive Learner", color: "bg-orange-50 border-orange-200" },
  { id: "reflective-thinker", name: "Reflective Thinker", color: "bg-pink-50 border-pink-200" },
]

export default function ToolsBank() {
  const [tools, setTools] = useState<ArchetypeTools>({})
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("organizer")

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch("/api/resources/tools")
        const data = await response.json()

        // Group tools by archetype
        const grouped: ArchetypeTools = {}
        ARCHETYPES.forEach((arch) => {
          grouped[arch.id] = {
            name: arch.name,
            tools: [],
            primaryTools: [],
          }
        })

        // This is a placeholder - in production, you'd fetch actual archetype-specific tools
        // For now, we'll show all tools and let the database structure handle the mapping
        setTools(grouped)
      } catch (error) {
        console.error("[v0] Error fetching tools:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTools()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/resources" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Resources
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Tools Bank</h1>
          <p className="text-lg text-slate-600">
            Discover tools recommended for each learning archetype. Each tool is curated to support specific learning
            styles and study techniques.
          </p>
        </div>

        {/* Archetype Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            {ARCHETYPES.map((arch) => (
              <TabsTrigger key={arch.id} value={arch.id} className="text-sm">
                {arch.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tools Grid for Each Archetype */}
          {ARCHETYPES.map((arch) => (
            <TabsContent key={arch.id} value={arch.id} className="space-y-6">
              {/* Archetype Description */}
              <Card className={`border-2 ${arch.color}`}>
                <CardHeader>
                  <CardTitle>{arch.name} Tools</CardTitle>
                  <CardDescription>
                    Tools specifically recommended for {arch.name} learners. Top picks are highlighted.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Top Picks Section */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Top Picks</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {loading ? (
                    <>
                      <Skeleton className="h-64" />
                      <Skeleton className="h-64" />
                      <Skeleton className="h-64" />
                    </>
                  ) : (
                    <div className="col-span-full text-center py-8 text-slate-500">
                      Tools will appear here once populated from the database.
                    </div>
                  )}
                </div>
              </div>

              {/* Explore More Section */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Explore More</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {loading ? (
                    <>
                      <Skeleton className="h-64" />
                      <Skeleton className="h-64" />
                      <Skeleton className="h-64" />
                    </>
                  ) : (
                    <div className="col-span-full text-center py-8 text-slate-500">
                      Additional tools will appear here once populated from the database.
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Universal Techniques Section */}
        <Card className="mt-12 bg-slate-50 border-slate-200">
          <CardHeader>
            <CardTitle>Universal Techniques & Tools</CardTitle>
            <CardDescription>These techniques and tools are valuable across all learning archetypes.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { technique: "Spaced Repetition", tools: "Anki, RemNote, NeuraCache" },
                  { technique: "Active Recall", tools: "Anki, Obsidian, Quizlet" },
                  { technique: "Visual Mapping", tools: "Miro, MindMeister, Heptabase" },
                  { technique: "Pomodoro / Time-Blocking", tools: "Forest, Pomofocus, Google Calendar" },
                  { technique: "Metacognitive Journaling", tools: "Day One, Roam, Evernote" },
                  { technique: "AI-Powered Learning", tools: "ChatGPT, Claude, Gemini, Notebook LM" },
                ].map((item) => (
                  <div key={item.technique} className="p-4 bg-white rounded-lg border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-2">{item.technique}</h3>
                    <p className="text-sm text-slate-600">{item.tools}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
