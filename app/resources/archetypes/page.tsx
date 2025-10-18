"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Calendar, Search, Users, RefreshCw, BookMarked, Wrench, Target, Lightbulb } from "lucide-react"

interface Archetype {
  id: string
  name: string
  slug: string
  core_philosophy: string
  defining_traits: string[]
  archetype_tools?: Array<{
    tool_id: string
    is_primary: boolean
    justification: string
    tool_order: number
    tools: {
      id: string
      name: string
      description: string
      category: string
      url: string
    }
  }>
  interaction_stories?: Array<{
    id: string
    title: string
    narrative: string
    metrics_in_play: Record<string, string>
    story_order: number
  }>
  growth_strategies?: Array<{
    id: string
    title: string
    strategy_text: string
    metrics_addressed: string[]
    strategy_order: number
  }>
}

const ARCHETYPE_ICONS = {
  organizer: Calendar,
  "deep-diver": Search,
  collaborator: Users,
  "adaptive-learner": RefreshCw,
  "reflective-thinker": BookMarked
}

const ARCHETYPE_COLORS = {
  organizer: "bg-blue-50 border-blue-200 text-blue-800",
  "deep-diver": "bg-purple-50 border-purple-200 text-purple-800",
  collaborator: "bg-green-50 border-green-200 text-green-800",
  "adaptive-learner": "bg-orange-50 border-orange-200 text-orange-800",
  "reflective-thinker": "bg-pink-50 border-pink-200 text-pink-800"
}

export default function ArchetypesBank() {
  const [archetypes, setArchetypes] = useState<Archetype[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("organizer")

  useEffect(() => {
    const fetchArchetypes = async () => {
      try {
        const response = await fetch("/api/resources/archetypes")
        const data = await response.json()
        setArchetypes(Array.isArray(data) ? data : [data])
      } catch (error) {
        console.error("[v0] Error fetching archetypes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchArchetypes()
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
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Learning Archetypes</h1>
          <p className="text-lg text-slate-600">
            Explore the five learning archetypes in detail. Each archetype has unique strengths, challenges, and recommended strategies.
          </p>
        </div>

        {/* Archetype Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            {archetypes.map((archetype) => {
              const Icon = ARCHETYPE_ICONS[archetype.slug as keyof typeof ARCHETYPE_ICONS] || Calendar
              return (
                <TabsTrigger key={archetype.slug} value={archetype.slug} className="text-sm">
                  <Icon className="w-4 h-4 mr-2" />
                  {archetype.name.replace('The ', '')}
                </TabsTrigger>
              )
            })}
          </TabsList>

          {/* Archetype Details for Each */}
          {archetypes.map((archetype) => {
            const Icon = ARCHETYPE_ICONS[archetype.slug as keyof typeof ARCHETYPE_ICONS] || Calendar
            const colorClass = ARCHETYPE_COLORS[archetype.slug as keyof typeof ARCHETYPE_COLORS] || "bg-gray-50 border-gray-200 text-gray-800"

            return (
              <TabsContent key={archetype.slug} value={archetype.slug} className="space-y-8">
                {/* Archetype Overview */}
                <Card className={`border-2 ${colorClass.split(' ')[1]}`}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${colorClass.split(' ')[0]}`}>
                        <Icon className={`w-8 h-8 ${colorClass.split(' ')[2]}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-3xl mb-2">{archetype.name}</CardTitle>
                        <CardDescription className="text-base leading-relaxed">
                          {archetype.core_philosophy}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Defining Traits */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Defining Traits</CardTitle>
                    <CardDescription>Key characteristics that define this learning archetype</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {archetype.defining_traits?.map((trait, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <p className="text-sm leading-relaxed">{trait}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Tabs for detailed sections */}
                <Tabs defaultValue="tools" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="tools">
                      <Wrench className="w-4 h-4 mr-2" />
                      Tools
                    </TabsTrigger>
                    <TabsTrigger value="stories">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Stories
                    </TabsTrigger>
                    <TabsTrigger value="strategies">
                      <Target className="w-4 h-4 mr-2" />
                      Strategies
                    </TabsTrigger>
                  </TabsList>

                  {/* Recommended Tools */}
                  <TabsContent value="tools" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Recommended Tools</CardTitle>
                        <CardDescription>
                          Tools specifically curated for {archetype.name} learners
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {loading ? (
                          <div className="space-y-4">
                            <Skeleton className="h-24" />
                            <Skeleton className="h-24" />
                            <Skeleton className="h-24" />
                          </div>
                        ) : archetype.archetype_tools && archetype.archetype_tools.length > 0 ? (
                          <div className="space-y-4">
                            {archetype.archetype_tools
                              .sort((a, b) => a.tool_order - b.tool_order)
                              .map((toolMapping) => (
                                <div key={toolMapping.tool_id} className="border rounded-lg p-4">
                                  <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-semibold text-lg">{toolMapping.tools.name}</h4>
                                    {toolMapping.is_primary && (
                                      <Badge variant="default">Primary Tool</Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {toolMapping.tools.description}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    <strong>Why it works for you:</strong> {toolMapping.justification}
                                  </p>
                                  {toolMapping.tools.url && (
                                    <a
                                      href={toolMapping.tools.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block"
                                    >
                                      Visit Tool →
                                    </a>
                                  )}
                                </div>
                              ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-center py-8">
                            No tools available for this archetype.
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Interaction Stories */}
                  <TabsContent value="stories" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Learning Stories</CardTitle>
                        <CardDescription>
                          Real-world scenarios that illustrate how {archetype.name} learners approach challenges
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {loading ? (
                          <div className="space-y-4">
                            <Skeleton className="h-32" />
                            <Skeleton className="h-32" />
                          </div>
                        ) : archetype.interaction_stories && archetype.interaction_stories.length > 0 ? (
                          <div className="space-y-6">
                            {archetype.interaction_stories
                              .sort((a, b) => a.story_order - b.story_order)
                              .map((story) => (
                                <div key={story.id} className="border-l-4 border-primary pl-4">
                                  <h4 className="font-semibold text-lg mb-2">{story.title}</h4>
                                  <p className="text-sm leading-relaxed text-muted-foreground">
                                    {story.narrative}
                                  </p>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-center py-8">
                            No stories available for this archetype.
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Growth Strategies */}
                  <TabsContent value="strategies" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Growth Strategies</CardTitle>
                        <CardDescription>
                          Evidence-based strategies to help {archetype.name} learners develop and grow
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {loading ? (
                          <div className="space-y-4">
                            <Skeleton className="h-32" />
                            <Skeleton className="h-32" />
                            <Skeleton className="h-32" />
                          </div>
                        ) : archetype.growth_strategies && archetype.growth_strategies.length > 0 ? (
                          <div className="space-y-6">
                            {archetype.growth_strategies
                              .sort((a, b) => a.strategy_order - b.strategy_order)
                              .map((strategy) => (
                                <div key={strategy.id} className="border rounded-lg p-4">
                                  <h4 className="font-semibold text-lg mb-2">{strategy.title}</h4>
                                  <p className="text-sm leading-relaxed text-muted-foreground mb-3">
                                    {strategy.strategy_text}
                                  </p>
                                  {strategy.metrics_addressed && strategy.metrics_addressed.length > 0 && (
                                    <div>
                                      <p className="text-xs font-medium text-muted-foreground mb-1">
                                        Addresses these learning dimensions:
                                      </p>
                                      <div className="flex flex-wrap gap-1">
                                        {strategy.metrics_addressed.map((metric) => (
                                          <Badge key={metric} variant="outline" className="text-xs">
                                            {metric}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-center py-8">
                            No strategies available for this archetype.
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </main>
  )
}
