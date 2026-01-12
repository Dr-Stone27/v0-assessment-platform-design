import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  BarChart3,
  Target,
  Users,
  BookOpen,
  LogIn,
  UserPlus,
  Sparkles,
  Clock,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  TrendingUp,
  Shield,
  Zap,
  MessageSquare,
  Star,
  Quote,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Badge */}
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Research-Backed Learning Assessment
            </Badge>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text">
              Unlock Your Full
              <span className="text-primary block md:inline">
                {" "}
                Learning Potential
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Discover your unique learning archetype through our
              scientifically-designed assessment. Get personalized strategies
              that transform how you study, retain information, and achieve
              academic excellence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              {user ? (
                <Button
                  asChild
                  size="lg"
                  className="text-lg px-8 h-14 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <Link href="/assessment/demographics">
                    Start Your Assessment
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button
                    asChild
                    size="lg"
                    className="text-lg px-8 h-14 rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    <Link href="/auth/signup">
                      <UserPlus className="w-5 h-5 mr-2" />
                      Get Started Free
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 h-14 rounded-full"
                  >
                    <Link href="/auth/signin">
                      <LogIn className="w-5 h-5 mr-2" />
                      Sign In
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>10-15 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>29 research-backed questions</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-500" />
                <span>100% confidential</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Understanding Your Learning Style Matters
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Students who understand their learning preferences perform
                better academically and experience less study-related stress.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center border-none border transition-shadow bg-background">
                <CardHeader className="pb-2">
                  <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <TrendingUp className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-4xl font-bold text-primary">
                    85%
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    of students report improved study effectiveness after
                    identifying their learning style
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-none border transition-shadow bg-background">
                <CardHeader className="pb-2">
                  <div className="mx-auto w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mb-2">
                    <GraduationCap className="w-7 h-7 text-green-500" />
                  </div>
                  <CardTitle className="text-4xl font-bold text-green-500">
                    40%
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    reduction in time wasted on ineffective study methods
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-none border transition-shadow bg-background">
                <CardHeader className="pb-2">
                  <div className="mx-auto w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mb-2">
                    <Brain className="w-7 h-7 text-blue-500" />
                  </div>
                  <CardTitle className="text-4xl font-bold text-blue-500">
                    12
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    learning dimensions analyzed for a comprehensive profile
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-none border transition-shadow bg-background">
                <CardHeader className="pb-2">
                  <div className="mx-auto w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center mb-2">
                    <Zap className="w-7 h-7 text-purple-500" />
                  </div>
                  <CardTitle className="text-4xl font-bold text-purple-500">
                    5
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    unique learning archetypes with tailored strategies
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                Simple Process
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Three simple steps to discover your learning archetype and start
                studying smarter.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 relative">
                    <MessageSquare className="w-8 h-8 text-primary" />
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                      1
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Take the Assessment
                  </h3>
                  <p className="text-muted-foreground">
                    Answer 29 thoughtfully designed questions about your study
                    habits, preferences, and challenges. No right or wrong
                    answers!
                  </p>
                </div>
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-primary/50 to-transparent" />
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 relative">
                    <BarChart3 className="w-8 h-8 text-primary" />
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                      2
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Get Your Profile
                  </h3>
                  <p className="text-muted-foreground">
                    Receive a detailed breakdown of your scores across 12
                    learning dimensions and discover your primary learning
                    archetype.
                  </p>
                </div>
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-primary/50 to-transparent" />
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 relative">
                    <Sparkles className="w-8 h-8 text-primary" />
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                      3
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Apply Your Insights
                  </h3>
                  <p className="text-muted-foreground">
                    Access personalized tools, techniques, and strategies
                    designed specifically for your learning style.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Archetypes Preview */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                5 Unique Archetypes
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Which Learner Are You?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our assessment identifies your dominant learning archetype from
                five research-based profiles.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <Card className="border-2 border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 hover:shadow-md transition-all">
                <CardHeader className="pb-2 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-2">
                    <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-base text-blue-700 dark:text-blue-300">
                    The Organizer
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Structured, systematic, detail-oriented
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 bg-purple-50/50 dark:bg-purple-950/20 hover:shadow-md transition-all">
                <CardHeader className="pb-2 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-2">
                    <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-base text-purple-700 dark:text-purple-300">
                    Deep Diver
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Curious, analytical, thorough
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-green-50/50 dark:bg-green-950/20 hover:shadow-md transition-all">
                <CardHeader className="pb-2 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-2">
                    <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-base text-green-700 dark:text-green-300">
                    Collaborator
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Social, interactive, team-oriented
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-200 bg-orange-50/50 dark:bg-orange-950/20 hover:shadow-md transition-all">
                <CardHeader className="pb-2 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center mb-2">
                    <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <CardTitle className="text-base text-orange-700 dark:text-orange-300">
                    Adaptive Learner
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Flexible, tech-savvy, versatile
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-pink-200 bg-pink-50/50 dark:bg-pink-950/20 hover:shadow-md transition-all">
                <CardHeader className="pb-2 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center mb-2">
                    <BookOpen className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <CardTitle className="text-base text-pink-700 dark:text-pink-300">
                    Reflective Thinker
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Introspective, mindful, self-aware
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {/* <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                Student Success Stories
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Students Say
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-background to-muted/50">
                <CardContent className="pt-6">
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  <p className="text-muted-foreground mb-4 italic">
                    "I always thought I was bad at studying. Turns out, I'm a
                    Collaborator who was trying to learn like an Organizer. Once
                    I started study groups, everything clicked!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        JM
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">James M.</p>
                      <p className="text-xs text-muted-foreground">
                        Engineering Student
                      </p>
                    </div>
                    <div className="ml-auto flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-background to-muted/50">
                <CardContent className="pt-6">
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  <p className="text-muted-foreground mb-4 italic">
                    "As a Deep Diver, I learned to embrace my need to understand
                    concepts fully before moving on. My grades improved because
                    I stopped rushing through material."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                      <span className="text-purple-600 dark:text-purple-400 font-semibold">
                        SK
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Sarah K.</p>
                      <p className="text-xs text-muted-foreground">
                        Pre-Med Student
                      </p>
                    </div>
                    <div className="ml-auto flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6">
              <Brain className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of students who have discovered their learning
              archetype and started studying smarter, not harder.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="text-lg px-10 h-14 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <Link href={user ? "/assessment/demographics" : "/auth/signup"}>
                  {user ? "Start Your Assessment" : "Get Started Free"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Free • 10-15 minutes • Instant results
            </p>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 md:py-20 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-background overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <CardHeader className="md:border-r border-secondary/10 flex flex-col justify-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary/10 mb-4">
                    <BookOpen className="w-7 h-7 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl mb-2">
                    Learning Resource Library
                  </CardTitle>
                  <CardDescription className="text-base">
                    Explore our curated collection of study tools, techniques,
                    and strategies — even before taking the assessment.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-center items-start p-8 bg-secondary/5">
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                      <span>Study tools for every learning style</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                      <span>Proven techniques from learning science</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                      <span>Archetype-specific strategies</span>
                    </li>
                  </ul>
                  <Button
                    asChild
                    variant="secondary"
                    size="lg"
                    className="rounded-full"
                  >
                    <Link href="/resources">
                      Browse Resources
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <footer className="py-12 border-t bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              <div>
                <Shield className="w-6 h-6 text-muted-foreground mx-auto mb-3" />
                <h4 className="font-medium mb-1">Privacy First</h4>
                <p className="text-sm text-muted-foreground">
                  Your responses are stored locally and never shared without
                  consent.
                </p>
              </div>
              <div>
                <GraduationCap className="w-6 h-6 text-muted-foreground mx-auto mb-3" />
                <h4 className="font-medium mb-1">Research-Based</h4>
                <p className="text-sm text-muted-foreground">
                  Built on established educational research and learning
                  science.
                </p>
              </div>
              <div>
                <Users className="w-6 h-6 text-muted-foreground mx-auto mb-3" />
                <h4 className="font-medium mb-1">For Students</h4>
                <p className="text-sm text-muted-foreground">
                  Designed specifically for university students of all
                  disciplines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
