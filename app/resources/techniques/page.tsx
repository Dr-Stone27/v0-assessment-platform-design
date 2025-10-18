"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, BookOpen, Clock, Brain, Users, Lightbulb, Smartphone } from "lucide-react"

interface Technique {
  id: string
  name: string
  description: string
  category: string
  technique_tools?: Array<{
    tool_id: string
    tools: {
      id: string
      name: string
      url: string
    }
  }>
}

const CATEGORIES = [
  { id: "memory", name: "Memory", icon: Brain, color: "bg-purple-50 border-purple-200" },
  { id: "time-management", name: "Time Management", icon: Clock, color: "bg-blue-50 border-blue-200" },
  { id: "metacognition", name: "Metacognition", icon: BookOpen, color: "bg-green-50 border-green-200" },
  { id: "study-methods", name: "Study Methods", icon: Lightbulb, color: "bg-orange-50 border-orange-200" },
  { id: "critical-thinking", name: "Critical Thinking", icon: Brain, color: "bg-red-50 border-red-200" },
  { id: "collaboration", name: "Collaboration", icon: Users, color: "bg-indigo-50 border-indigo-200" },
  { id: "digital-learning", name: "Digital Learning", icon: Smartphone, color: "bg-teal-50 border-teal-200" }
]

export default function TechniquesBank() {
  const [techniques, setTechniques] = useState<Technique[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("memory")

  useEffect(() => {
    const fetchTechniques = async () => {
      try {
        const response = await fetch("/api/resources/techniques")
        const data = await response.json()
        setTechniques(data)
      } catch (error) {
        console.error("[v0] Error fetching techniques:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTechniques()
  }, [])

  const techniquesByCategory = techniques.reduce((acc, technique) => {
    const category = technique.category.toLowerCase().replace(/\s+/g, '-')
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(technique)
    return acc
  }, {} as Record<string, Technique[]>)

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
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Techniques Bank</h1>
          <p className="text-lg text-slate-600">
            Discover evidence-based learning techniques organized by category. Each technique includes recommended tools and detailed explanations.
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-8">
            {CATEGORIES.map((category) => {
              const Icon = category.icon
              return (
                <TabsTrigger key={category.id} value={category.id} className="text-xs sm:text-sm">
                  <Icon className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {/* Techniques for Each Category */}
          {CATEGORIES.map((category) => {
            const categoryTechniques = techniquesByCategory[category.id] || []
            const Icon = category.icon

            return (
              <TabsContent key={category.id} value={category.id} className="space-y-6">
                {/* Category Description */}
                <Card className={`border-2 ${category.color}`}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${category.color.replace('50', '100')}`}>
                        <Icon className={`w-6 h-6 ${category.color.replace('50', '600').replace('border-', 'text-')}`} />
                      </div>
                      <div>
                        <CardTitle>{category.name} Techniques</CardTitle>
                        <CardDescription>
                          {categoryTechniques.length} evidence-based techniques for improving your {category.name.toLowerCase()} skills.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Techniques Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {loading ? (
                    <>
                      <Skeleton className="h-64" />
                      <Skeleton className="h-64" />
                      <Skeleton className="h-64" />
                    </>
                  ) : categoryTechniques.length > 0 ? (
                    categoryTechniques.map((technique) => (
                      <Card key={technique.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg">{technique.name}</CardTitle>
                          <Badge variant="secondary" className="w-fit">
                            {technique.category}
                          </Badge>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-sm leading-relaxed mb-4">
                            {technique.description}
                          </CardDescription>
                          
                          {/* Recommended Tools */}
                          {technique.technique_tools && technique.technique_tools.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-slate-700 mb-2">Recommended Tools:</h4>
                              <div className="flex flex-wrap gap-1">
                                {technique.technique_tools.map((toolMapping) => (
                                  <Badge key={toolMapping.tool_id} variant="outline" className="text-xs">
                                    {toolMapping.tools.name}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8 text-slate-500">
                      No techniques found for this category.
                    </div>
                  )}
                </div>
              </TabsContent>
            )
          })}
        </Tabs>

        {/* Quick Reference Section */}
        <Card className="mt-12 bg-slate-50 border-slate-200">
          <CardHeader>
            <CardTitle>How to Use These Techniques</CardTitle>
            <CardDescription>
              Tips for effectively implementing these evidence-based learning strategies.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Start Small</h3>
                <p className="text-slate-600 text-sm">
                  Choose 1-2 techniques that align with your learning archetype and practice them consistently before adding more.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Combine Techniques</h3>
                <p className="text-slate-600 text-sm">
                  Many techniques work better together. For example, combine spaced repetition with active recall for maximum retention.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Track Your Progress</h3>
                <p className="text-slate-600 text-sm">
                  Use metacognitive journaling to reflect on which techniques work best for different subjects and situations.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Adapt to Your Style</h3>
                <p className="text-slate-600 text-sm">
                  Modify techniques to fit your learning preferences and the specific requirements of your courses.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
