"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { METRICS_INFO, ARCHETYPES_INFO, ASSESSMENT_STEPS } from "@/lib/constants/landing-content"
import { cn } from "@/lib/utils"

export function AssessmentIntro() {
  return (
    <div className="space-y-12">
      {/* How It Works Section */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="text-3xl text-center">How It Works</CardTitle>
          <CardDescription className="text-center text-lg">
            Our assessment uses a 4-layer analysis to provide deep insights into your learning style
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {ASSESSMENT_STEPS.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.step} className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Accordion with detailed sections */}
      <Accordion type="multiple" className="space-y-4">
        {/* 12 Learning Dimensions */}
        <AccordionItem value="dimensions" className="border rounded-lg px-6">
          <AccordionTrigger className="text-xl font-semibold hover:no-underline">
            The 12 Learning Dimensions
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <p className="text-muted-foreground mb-6">
              Our assessment measures your learning style across 12 key dimensions, each representing a different aspect of how you approach studying and learning.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {METRICS_INFO.map((metric) => {
                const Icon = metric.icon
                return (
                  <Card key={metric.key} className="border-2 hover:border-primary/20 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{metric.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm leading-relaxed">
                        {metric.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 5 Learning Archetypes */}
        <AccordionItem value="archetypes" className="border rounded-lg px-6">
          <AccordionTrigger className="text-xl font-semibold hover:no-underline">
            The 5 Learning Archetypes
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <p className="text-muted-foreground mb-6">
              Based on your responses, you'll be matched with one of five learning archetypes, each with unique strengths and recommended strategies.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ARCHETYPES_INFO.map((archetype) => {
                const Icon = archetype.icon
                return (
                  <Card 
                    key={archetype.key} 
                    className={cn(
                      "border-2 hover:shadow-md transition-all",
                      `border-${archetype.color}-200 hover:border-${archetype.color}-300`
                    )}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={cn(
                          "p-2 rounded-lg",
                          `bg-${archetype.color}-50`
                        )}>
                          <Icon className={cn("w-6 h-6", `text-${archetype.color}-600`)} />
                        </div>
                        <CardTitle className="text-xl">{archetype.name}</CardTitle>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "w-fit",
                          `bg-${archetype.color}-100 text-${archetype.color}-800 border-${archetype.color}-200`
                        )}
                      >
                        {archetype.name}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">
                        {archetype.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Research Foundation */}
        <AccordionItem value="research" className="border rounded-lg px-6">
          <AccordionTrigger className="text-xl font-semibold hover:no-underline">
            Research Foundation
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Our assessment is built on established educational research and learning science principles:
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>
                    <strong>Self-Regulated Learning Theory:</strong> Based on Zimmerman's model of self-regulation in learning
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>
                    <strong>Metacognitive Awareness:</strong> Incorporates Flavell's research on metacognitive monitoring
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>
                    <strong>Learning Styles Research:</strong> Draws from Kolb's experiential learning theory and VARK model
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>
                    <strong>Mindset Theory:</strong> Incorporates Dweck's growth vs. fixed mindset framework
                  </span>
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
