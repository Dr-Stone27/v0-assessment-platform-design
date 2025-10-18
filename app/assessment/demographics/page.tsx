"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAssessment } from "@/lib/context/assessment-context"
import { generateSessionId } from "@/lib/storage"
import { ArrowRight } from "lucide-react"

export default function DemographicsPage() {
  const router = useRouter()
  const { setDemographics } = useAssessment()

  const [faculty, setFaculty] = useState("")
  const [yearOfStudy, setYearOfStudy] = useState("")
  const [courseLoad, setCourseLoad] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!faculty || !yearOfStudy || !courseLoad) {
      return
    }

    setDemographics({
      sessionId: generateSessionId(),
      faculty,
      yearOfStudy,
      courseLoad,
    })

    router.push("/assessment/questions")
  }

  const isValid = faculty && yearOfStudy && courseLoad

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Before We Begin</h1>
            <p className="text-muted-foreground">
              Help us understand your academic context to provide more relevant insights.
            </p>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Your Academic Profile</CardTitle>
              <CardDescription>This information helps us contextualize your results.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Faculty */}
                <div className="space-y-2">
                  <Label htmlFor="faculty">Faculty / Program</Label>
                  <Select value={faculty} onValueChange={setFaculty}>
                    <SelectTrigger id="faculty">
                      <SelectValue placeholder="Select your faculty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arts">Arts & Humanities</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="health">Health Sciences</SelectItem>
                      <SelectItem value="social-sciences">Social Sciences</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Year of Study */}
                <div className="space-y-2">
                  <Label htmlFor="year">Year of Study</Label>
                  <Select value={yearOfStudy} onValueChange={setYearOfStudy}>
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">First Year</SelectItem>
                      <SelectItem value="2">Second Year</SelectItem>
                      <SelectItem value="3">Third Year</SelectItem>
                      <SelectItem value="4">Fourth Year</SelectItem>
                      <SelectItem value="5+">Fifth Year or Beyond</SelectItem>
                      <SelectItem value="graduate">Graduate Student</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Course Load */}
                <div className="space-y-2">
                  <Label htmlFor="courseLoad">Current Course Load</Label>
                  <Select value={courseLoad} onValueChange={setCourseLoad}>
                    <SelectTrigger id="courseLoad">
                      <SelectValue placeholder="Select your course load" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="part-time">Part-time (1-2 courses)</SelectItem>
                      <SelectItem value="moderate">Moderate (3-4 courses)</SelectItem>
                      <SelectItem value="full-time">Full-time (5-6 courses)</SelectItem>
                      <SelectItem value="heavy">Heavy (7+ courses)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit Button */}
                <Button type="submit" disabled={!isValid} className="w-full" size="lg">
                  Continue to Assessment
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Privacy Note */}
          <p className="text-center text-sm text-muted-foreground">
            Your information is stored locally on your device and is never shared.
          </p>
        </div>
      </div>
    </div>
  )
}
