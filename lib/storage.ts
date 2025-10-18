// LocalStorage utilities for persisting assessment state

import type { AssessmentState } from "./types"

const STORAGE_KEY = "assessment_state"

export function saveAssessmentState(state: AssessmentState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error("[v0] Failed to save assessment state:", error)
  }
}

export function loadAssessmentState(): AssessmentState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null

    const state = JSON.parse(stored)

    // Convert timestamp strings back to Date objects
    if (state.responses) {
      state.responses = state.responses.map((r: any) => ({
        ...r,
        timestamp: new Date(r.timestamp),
      }))
    }

    return state
  } catch (error) {
    console.error("[v0] Failed to load assessment state:", error)
    return null
  }
}

export function clearAssessmentState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error("[v0] Failed to clear assessment state:", error)
  }
}

export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}
