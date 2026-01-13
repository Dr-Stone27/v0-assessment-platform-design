import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, BarChart3, Target, Users, BookOpen } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <Brain className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-balance">Discover Your Learning Archetype</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Take our research-backed assessment to understand your unique learning style and unlock personalized
              strategies for academic success.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <BarChart3 className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">12 Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comprehensive analysis across planning, processing, execution, and engagement dimensions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Target className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">5 Archetypes</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Discover if you're an Organizer, Deep Diver, Collaborator, Adaptive Learner, or Reflective Thinker.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Personalized Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Receive tailored recommendations based on your strengths and areas for development.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <Card className="border-2 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Ready to Begin?</CardTitle>
              <CardDescription className="text-base">
                The assessment takes approximately 10-15 minutes to complete. Answer honestly for the most accurate
                results.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/assessment/demographics">Start Assessment</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-secondary/20 bg-secondary/5">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 mb-2 mx-auto">
                <BookOpen className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle className="text-2xl">Learning Resources</CardTitle>
              <CardDescription className="text-base">
                Explore tools, techniques, and archetype breakdowns to support your learning journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Link href="/resources">Browse Resources</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Info Section */}
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>Your responses are stored locally and never shared without your consent.</p>
            <p>This assessment is designed for university students and based on educational research.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
