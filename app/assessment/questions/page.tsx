"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAssessment } from "@/lib/context/assessment-context"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const LIKERT_SCALE_VALUES = [
  { value: -2, label: "Strongly Disagree" },
  { value: -1, label: "Somewhat Disagree" },
  { value: 0, label: "Neutral" },
  { value: 1, label: "Somewhat Agree" },
  { value: 2, label: "Strongly Agree" },
]

export default function QuestionsPage() {
  const router = useRouter()
  const { state, currentQuestion, recordResponse, nextQuestion, previousQuestion, progress } = useAssessment()
  const [selectedValue, setSelectedValue] = useState<number | null>(null)

  // Redirect if no demographics
  useEffect(() => {
    if (!state.demographics) {
      router.push("/assessment/demographics")
    }
  }, [state.demographics, router])

  // Load existing response for current question
  useEffect(() => {
    if (currentQuestion) {
      const existingResponse = state.responses.find((r) => r.questionId === currentQuestion.id)
      setSelectedValue(existingResponse?.value ?? null)
    }
  }, [currentQuestion, state.responses])

  if (!currentQuestion) {
    return null
  }

  const handleSelect = (value: number) => {
    setSelectedValue(value)
    recordResponse({
      questionId: currentQuestion.id,
      value,
      timestamp: new Date(),
    })
  }

  const handleNext = () => {
    if (currentQuestion.number === 29) {
      // Last question - go to results
      router.push("/assessment/results")
    } else {
      nextQuestion()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion.number === 1) {
      router.push("/assessment/demographics")
    } else {
      previousQuestion()
    }
  }

  const canProceed = selectedValue !== null

  const isLikert = currentQuestion.type === "likert"
  const isScenario = currentQuestion.type === "scenario"

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {currentQuestion.number} of 29</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card>
            <CardHeader>
              <CardDescription className="text-xs uppercase tracking-wide">
                {currentQuestion.dimension.replace("-", " ")}
              </CardDescription>
              <CardTitle className="text-2xl text-balance leading-relaxed">{currentQuestion.text}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Likert Scale Questions */}
              {isLikert && (
                <>
                  {/* Scale Labels */}
                  <div className="flex justify-between items-start gap-4 text-sm">
                    <div className="flex-1 text-left">
                      <p className="font-medium text-muted-foreground">{currentQuestion.leftLabel}</p>
                    </div>
                    <div className="flex-1 text-right">
                      <p className="font-medium text-muted-foreground">{currentQuestion.rightLabel}</p>
                    </div>
                  </div>

                  {/* Scale Buttons */}
                  <div className="flex justify-between  overflow-auto py-2 gap-2">
                    {LIKERT_SCALE_VALUES.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSelect(option.value)}
                        className={cn(
                          "flex-1 flex shrink-0 flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                          "hover:border-primary/50 hover:bg-primary/5",
                          selectedValue === option.value
                            ? "border-primary bg-primary/10 shadow-sm"
                            : "border-border bg-background",
                        )}
                      >
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
                            selectedValue === option.value
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-muted-foreground/30",
                          )}
                        >
                          {selectedValue === option.value && (
                            <div className="w-3 h-3 rounded-full bg-primary-foreground" />
                          )}
                        </div>
                        <span className="text-xs text-center text-muted-foreground">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Scenario Questions */}
              {isScenario && currentQuestion.options && (
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      className={cn(
                        "w-full text-left p-4 rounded-lg border-2 transition-all",
                        "hover:border-primary/50 hover:bg-primary/5",
                        selectedValue === option.value
                          ? "border-primary bg-primary/10 shadow-sm"
                          : "border-border bg-background",
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all",
                            selectedValue === option.value
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-muted-foreground/30",
                          )}
                        >
                          {selectedValue === option.value && (
                            <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                          )}
                        </div>
                        <span className="text-sm text-foreground">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between gap-4 pt-4">
                <Button variant="outline" onClick={handlePrevious} size="lg">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Previous
                </Button>
                <Button onClick={handleNext} disabled={!canProceed} size="lg">
                  {currentQuestion.number === 29 ? "View Results" : "Next"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Helper Text */}
          <p className="text-center text-sm text-muted-foreground">
            {isLikert && "Choose the option that best reflects your agreement with the statement."}
            {isScenario && "Select the option that best describes what you would do in this situation."}
          </p>
        </div>
      </div>
    </div>
  )
}
