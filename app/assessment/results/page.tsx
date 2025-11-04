"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAssessment } from "@/lib/context/assessment-context";
import { calculateCompleteProfile } from "@/lib/calculations";
import { RadarChart } from "@/components/radar-chart";
import { MetricBar } from "@/components/metric-bar";
import { PersonalizedReportComponent } from "@/components/report/personalized-report";
import { METRIC_DESCRIPTIONS } from "@/lib/constants/metric-descriptions";
import {
  Download,
  RotateCcw,
  Brain,
  TrendingUp,
  Target,
  Lightbulb,
  FileText,
  BookOpen,
} from "lucide-react";
import type { CompleteProfile, PersonalizedReport } from "@/lib/types";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ResultsPage() {
  const router = useRouter();
  const { state, completeAssessment, resetAssessment } = useAssessment();
  const [profile, setProfile] = useState<CompleteProfile | null>(null);
  const [personalizedReport, setPersonalizedReport] =
    useState<PersonalizedReport | null>(null);
  const [isCalculating, setIsCalculating] = useState(true);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("report");
  const isMobile = useIsMobile();

  useEffect(() => {
    // Redirect if no demographics or incomplete responses
    if (!state.demographics) {
      router.push("/assessment/demographics");
      return;
    }

    if (state.responses.length !== 29) {
      router.push("/assessment/questions");
      return;
    }

    // Calculate profile if not already done
    if (!state.profile) {
      try {
        const calculatedProfile = calculateCompleteProfile(
          state.responses,
          state.demographics
        );
        setProfile(calculatedProfile);
        completeAssessment(calculatedProfile);
      } catch (error) {
        console.error("[v0] Failed to calculate profile:", error);
      } finally {
        setIsCalculating(false);
      }
    } else {
      setProfile(state.profile);
      setIsCalculating(false);
    }
  }, [state, router, completeAssessment]);

  useEffect(() => {
    async function fetchPersonalizedReport() {
      if (!profile || !state.demographics) return;

      setIsLoadingReport(true);
      setReportError(null);

      try {
        const response = await fetch("/api/generate-report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            profile,
            userContext: {
              yearOfStudy: state.demographics.yearOfStudy,
              faculty: state.demographics.faculty,
              courseLoad: state.demographics.courseLoad,
            },
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate report");
        }

        const report = await response.json();
        setPersonalizedReport(report);
      } catch (error) {
        console.error("[v0] Error generating personalized report:", error);
        setReportError(
          "Unable to generate personalized report. Please try again later."
        );
      } finally {
        setIsLoadingReport(false);
      }
    }

    fetchPersonalizedReport();
  }, [profile, state.demographics]);

  const handleReset = () => {
    if (
      confirm(
        "Are you sure you want to start a new assessment? Your current results will be lost."
      )
    ) {
      resetAssessment();
      router.push("/assessment/demographics");
    }
  };

  if (isCalculating || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          <p className="text-muted-foreground">
            Calculating your learning profile...
          </p>
        </div>
      </div>
    );
  }

  const metrics = Object.entries(profile.layer1_detailedMetrics);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Your Learning Profile</h1>
            <p className="text-xl text-muted-foreground">
              {profile.personaIdentity}
            </p>
          </div>

          {/* Primary Archetype Card */}
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-3xl">
                    {profile.layer4_archetype.primary.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    Your primary learning archetype with{" "}
                    {profile.layer4_archetype.primary.fitScore}% match
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  Primary
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Fit Score</span>
                    <span className="font-semibold">
                      {profile.layer4_archetype.primary.fitScore}%
                    </span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{
                        width: `${profile.layer4_archetype.primary.fitScore}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Secondary archetype:{" "}
                <span className="font-medium text-foreground">
                  {profile.layer4_archetype.secondary.name}
                </span>{" "}
                ({profile.layer4_archetype.secondary.fitScore}% match)
              </p>
            </CardContent>
          </Card>

          {/* Mindset Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                <CardTitle>Mindset Assessment</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="basis-[65%]">
                  <p className="text-2xl font-bold capitalize">
                    {profile.layer2_mindset.type} Mindset
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {profile.layer2_mindset.type === "growth"
                      ? "You believe abilities can be developed through effort and learning."
                      : "You may benefit from embracing challenges as opportunities for growth."}
                  </p>
                </div>
                <Badge
                  variant={
                    profile.layer2_mindset.type === "growth"
                      ? "default"
                      : "secondary"
                  }
                  className="text-base px-4 py-2"
                >
                  Score: {profile.layer2_mindset.score > 0 ? "+" : ""}
                  {profile.layer2_mindset.score}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for detailed views */}
          <div className="space-y-6">
            {/* Desktop Tabs */}
            {!isMobile ? (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="report">
                    <FileText className="w-4 h-4 mr-2" />
                    Your Report
                  </TabsTrigger>
                  <TabsTrigger value="overview">
                    <Target className="w-4 h-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="metrics">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Detailed Metrics
                  </TabsTrigger>
                  <TabsTrigger value="styles">
                    <Brain className="w-4 h-4 mr-2" />
                    Study Styles
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            ) : (
              /* Mobile Select */
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select View" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="report">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>Your Report</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="overview">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      <span>Overview</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="metrics">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>Detailed Metrics</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="styles">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      <span>Study Styles</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            )}

            {/* Tab Content - Conditional rendering based on activeTab */}
            <div className="space-y-6">
              {/* Personalized Report */}
              {activeTab === "report" && (
                <PersonalizedReportComponent
                  report={personalizedReport}
                  isLoading={isLoadingReport}
                  error={reportError}
                />
              )}

              {/* Overview */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Learning Profile at a Glance</CardTitle>
                      <CardDescription>
                        Visual representation of your 12 learning dimensions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RadarChart
                        metrics={profile.layer1_detailedMetrics}
                        size={500}
                      />
                    </CardContent>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Top Strengths</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {metrics
                            .sort((a, b) => b[1].normalized - a[1].normalized)
                            .slice(0, 3)
                            .map(([key, metric]) => (
                              <li key={key} className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                                <div>
                                  <p className="font-medium text-sm">
                                    {METRIC_DESCRIPTIONS[key].name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {metric.tier}
                                  </p>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Development Areas
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {metrics
                            .sort((a, b) => a[1].normalized - b[1].normalized)
                            .slice(0, 3)
                            .map(([key, metric]) => (
                              <li key={key} className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-chart-2 mt-2" />
                                <div>
                                  <p className="font-medium text-sm">
                                    {METRIC_DESCRIPTIONS[key].name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {metric.tier}
                                  </p>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Detailed Metrics */}
              {activeTab === "metrics" && (
                <Card>
                  <CardHeader>
                    <CardTitle>All 12 Learning Dimensions</CardTitle>
                    <CardDescription>
                      Detailed breakdown of your scores across all metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {metrics.map(([key, metric]) => (
                      <MetricBar
                        key={key}
                        label={METRIC_DESCRIPTIONS[key].name}
                        score={metric.normalized}
                        tier={metric.tier}
                        description={metric.description}
                      />
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Study Styles */}
              {activeTab === "styles" && (
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(profile.layer3_studyStyles).map(
                    ([key, style]) => (
                      <Card key={key}>
                        <CardHeader>
                          <CardTitle className="capitalize">{key}</CardTitle>
                          <CardDescription>{style.title}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Score
                              </span>
                              <span className="font-semibold tabular-nums">
                                {style.score > 0 ? "+" : ""}
                                {style.score}
                              </span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full transition-all"
                                style={{
                                  width: `${
                                    ((style.score + 100) / 200) * 100
                                  }%`,
                                }}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" size="lg" onClick={handleReset}>
              <RotateCcw className="mr-2 w-4 h-4" />
              Take Again
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/resources">
                <BookOpen className="mr-2 w-4 h-4" />
                Explore Resources
              </Link>
            </Button>
            <Button size="lg" disabled>
              <Download className="mr-2 w-4 h-4" />
              Download Report
            </Button>
          </div>

          {/* Footer Info */}
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="text-center text-sm text-muted-foreground space-y-2">
                <p>
                  <strong>Session ID:</strong> {profile.sessionId}
                </p>
                <p>
                  <strong>Completed:</strong>{" "}
                  {new Date(profile.calculatedAt).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
