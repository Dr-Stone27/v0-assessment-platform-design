"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { AssessmentState, Demographics, QuestionResponse, CompleteProfile } from "../types"
import { saveAssessmentState, loadAssessmentState, clearAssessmentState } from "../storage"
import { ASSESSMENT_QUESTIONS } from "../constants/questions"

interface AssessmentContextType {
  state: AssessmentState
  setDemographics: (demographics: Demographics) => void
  recordResponse: (response: QuestionResponse) => void
  goToQuestion: (index: number) => void
  nextQuestion: () => void
  previousQuestion: () => void
  completeAssessment: (profile: CompleteProfile) => void
  resetAssessment: () => void
  currentQuestion: (typeof ASSESSMENT_QUESTIONS)[0] | null
  progress: number
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined)

const initialState: AssessmentState = {
  demographics: null,
  responses: [],
  currentQuestionIndex: 0,
  isComplete: false,
  profile: null,
}

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AssessmentState>(initialState)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load saved state on mount
  useEffect(() => {
    const saved = loadAssessmentState()
    if (saved) {
      setState(saved)
    }
    setIsLoaded(true)
  }, [])

  // Save state whenever it changes
  useEffect(() => {
    if (isLoaded) {
      saveAssessmentState(state)
    }
  }, [state, isLoaded])

  const setDemographics = (demographics: Demographics) => {
    setState((prev) => ({
      ...prev,
      demographics,
    }))
  }

  const recordResponse = (response: QuestionResponse) => {
    setState((prev) => {
      // Remove any existing response for this question
      const filteredResponses = prev.responses.filter((r) => r.questionId !== response.questionId)

      return {
        ...prev,
        responses: [...filteredResponses, response],
      }
    })
  }

  const goToQuestion = (index: number) => {
    setState((prev) => ({
      ...prev,
      currentQuestionIndex: Math.max(0, Math.min(index, ASSESSMENT_QUESTIONS.length - 1)),
    }))
  }

  const nextQuestion = () => {
    setState((prev) => ({
      ...prev,
      currentQuestionIndex: Math.min(prev.currentQuestionIndex + 1, ASSESSMENT_QUESTIONS.length - 1),
    }))
  }

  const previousQuestion = () => {
    setState((prev) => ({
      ...prev,
      currentQuestionIndex: Math.max(prev.currentQuestionIndex - 1, 0),
    }))
  }

  const completeAssessment = (profile: CompleteProfile) => {
    setState((prev) => ({
      ...prev,
      isComplete: true,
      profile,
    }))
  }

  const resetAssessment = () => {
    clearAssessmentState()
    setState(initialState)
  }

  const currentQuestion = ASSESSMENT_QUESTIONS[state.currentQuestionIndex] || null
  const progress = (state.responses.length / ASSESSMENT_QUESTIONS.length) * 100

  return (
    <AssessmentContext.Provider
      value={{
        state,
        setDemographics,
        recordResponse,
        goToQuestion,
        nextQuestion,
        previousQuestion,
        completeAssessment,
        resetAssessment,
        currentQuestion,
        progress,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  )
}

export function useAssessment() {
  const context = useContext(AssessmentContext)
  if (context === undefined) {
    throw new Error("useAssessment must be used within an AssessmentProvider")
  }
  return context
}
