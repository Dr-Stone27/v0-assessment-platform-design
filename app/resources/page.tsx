"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { BookOpen, Wrench, Lightbulb } from "lucide-react"

export default function ResourcesHub() {
  const resources = [
    {
      title: "Tools Bank",
      description: "Discover tools organized by learning archetype. Find the perfect tools for your study style.",
      icon: Wrench,
      href: "/resources/tools",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      title: "Techniques Bank",
      description: "Learn evidence-based study techniques and discover which tools support each method.",
      icon: Lightbulb,
      href: "/resources/techniques",
      color: "bg-amber-50 border-amber-200",
      iconColor: "text-amber-600",
    },
    {
      title: "Archetype Guides",
      description: "Deep dive into each learning archetype with detailed breakdowns and personalized recommendations.",
      icon: BookOpen,
      href: "/resources/archetypes",
      color: "bg-emerald-50 border-emerald-200",
      iconColor: "text-emerald-600",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Learning Resources</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore tools, techniques, and archetype guides to optimize your learning journey. Whether you're an
            Organizer, Deep Diver, Collaborator, Adaptive Learner, or Reflective Thinker, find resources tailored to
            your style.
          </p>
        </div>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {resources.map((resource) => {
            const Icon = resource.icon
            return (
              <Link key={resource.href} href={resource.href}>
                <Card className={`h-full cursor-pointer transition-all hover:shadow-lg border-2 ${resource.color}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Icon className={`w-8 h-8 ${resource.iconColor}`} />
                    </div>
                    <CardTitle className="text-xl">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{resource.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Quick Info Section */}
        <Card className="bg-slate-50 border-slate-200">
          <CardHeader>
            <CardTitle>How to Use This Resource Bank</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">1. Discover Your Tools</h3>
                <p className="text-slate-600 text-sm">
                  Browse tools recommended for your learning archetype or search by technique.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">2. Learn Techniques</h3>
                <p className="text-slate-600 text-sm">
                  Understand evidence-based study techniques and how they connect to specific tools.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">3. Explore Archetypes</h3>
                <p className="text-slate-600 text-sm">
                  Get detailed insights into each learning archetype and personalized recommendations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
