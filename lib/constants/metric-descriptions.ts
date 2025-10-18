// Complete Score-to-Description Translation System

interface MetricTier {
  range: [number, number]
  title: string
  description: string
}

interface MetricDefinition {
  name: string
  tiers: MetricTier[]
}

export const METRIC_DESCRIPTIONS: Record<string, MetricDefinition> = {
  "self-regulation": {
    name: "Self-Regulation vs. Impulsivity",
    tiers: [
      {
        range: [70, 100],
        title: "Highly Disciplined",
        description:
          "You have a remarkable ability to set goals and stick to them, consistently demonstrating strong self-control.",
      },
      {
        range: [30, 69],
        title: "Structured Approach",
        description:
          "You are effective at creating and following plans, preferring a structured approach to your work.",
      },
      {
        range: [-29, 29],
        title: "Balanced Approach",
        description: "You flexibly blend planning with spontaneity, adapting your approach to the situation at hand.",
      },
      {
        range: [-69, -30],
        title: "Spontaneous",
        description:
          "You are often motivated by in-the-moment ideas and inspiration, preferring to act when you feel ready.",
      },
      {
        range: [-100, -70],
        title: "Highly Spontaneous",
        description:
          "You are strongly driven by impulse and inspiration, often finding structured plans to be restrictive.",
      },
    ],
  },
  "time-management": {
    name: "Time Management vs. Time Urgency",
    tiers: [
      {
        range: [70, 100],
        title: "Proactive Planner",
        description: "You excel at managing your time well in advance, systematically avoiding last-minute pressure.",
      },
      {
        range: [30, 69],
        title: "Effective Planner",
        description:
          "You are skilled at scheduling your tasks and generally prefer to complete work ahead of deadlines.",
      },
      {
        range: [-29, 29],
        title: "Flexible Scheduler",
        description:
          "You balance proactive planning with the ability to effectively use pressure as a motivator when needed.",
      },
      {
        range: [-69, -30],
        title: "Pressure-Driven",
        description:
          "You tend to do your most effective work when a deadline is approaching, using urgency to fuel your focus.",
      },
      {
        range: [-100, -70],
        title: "Highly Deadline-Driven",
        description: "You rely heavily on the pressure of imminent deadlines to initiate and complete your tasks.",
      },
    ],
  },
  "task-management": {
    name: "Task Management vs. Task Reactivity",
    tiers: [
      {
        range: [70, 100],
        title: "Systematic Prioritizer",
        description:
          "You have a clear, systematic process for breaking down projects and addressing the most important tasks first.",
      },
      {
        range: [30, 69],
        title: "Organized Task Manager",
        description:
          "You tend to maintain a prioritized list of tasks, allowing you to take a proactive approach to your workload.",
      },
      {
        range: [-29, 29],
        title: "Adaptive Task Handler",
        description:
          "You are capable of following a plan but are also comfortable reacting and reprioritizing when new tasks emerge.",
      },
      {
        range: [-69, -30],
        title: "Reactive Prioritizer",
        description:
          "You tend to address tasks as they come up, prioritizing based on what feels most urgent in the moment.",
      },
      {
        range: [-100, -70],
        title: "Highly Reactive",
        description:
          "Your workflow is primarily driven by incoming requests and immediate demands, rather than a pre-set plan.",
      },
    ],
  },
  "metacognitive-monitoring": {
    name: "Metacognitive Monitoring vs. Blind Execution",
    tiers: [
      {
        range: [70, 100],
        title: "Highly Self-Aware Learner",
        description:
          "You are exceptionally skilled at monitoring your own understanding and adjusting your learning process in real-time.",
      },
      {
        range: [30, 69],
        title: "Reflective Learner",
        description:
          "You regularly pause to check your comprehension, showing a strong awareness of your own learning.",
      },
      {
        range: [-29, 29],
        title: "Balanced Processor",
        description:
          "You combine periods of self-reflection with a trust in your ability to execute tasks automatically.",
      },
      {
        range: [-69, -30],
        title: "Intuitive Executor",
        description:
          "You tend to trust your instincts and rhythm, often completing tasks efficiently without constant self-monitoring.",
      },
      {
        range: [-100, -70],
        title: "Automatic Executor",
        description:
          "You are highly skilled at executing tasks from start to finish without pausing, trusting your process completely.",
      },
    ],
  },
  concentration: {
    name: "Concentration vs. Distractibility",
    tiers: [
      {
        range: [70, 100],
        title: "Deeply Focused",
        description:
          "You possess an exceptional ability to tune out distractions and maintain deep concentration for long periods.",
      },
      {
        range: [30, 69],
        title: "Focused",
        description:
          "You are generally able to maintain your focus and manage distractions effectively during study sessions.",
      },
      {
        range: [-29, 29],
        title: "Flexible Focus",
        description:
          "Your focus shifts between intense concentration and allowing for periodic distractions that can help incubate ideas.",
      },
      {
        range: [-69, -30],
        title: "Prone to Distraction",
        description: "You find that your focus can be easily derailed by interruptions or your own wandering thoughts.",
      },
      {
        range: [-100, -70],
        title: "Highly Distractible",
        description:
          "Maintaining sustained focus is a significant challenge, as you are highly sensitive to external and internal stimuli.",
      },
    ],
  },
  "digital-literacy": {
    name: "Digital Literacy vs. Digital Overload",
    tiers: [
      {
        range: [70, 100],
        title: "Tech-Savvy Innovator",
        description:
          "You are highly skilled at finding, learning, and integrating new digital tools to enhance your learning.",
      },
      {
        range: [30, 69],
        title: "Competent User",
        description:
          "You are comfortable and proficient with the digital tools you need, using them responsibly and effectively.",
      },
      {
        range: [-29, 29],
        title: "Balanced Digital Habit",
        description:
          "You use necessary digital tools but are also mindful of setting boundaries to prevent digital overload.",
      },
      {
        range: [-69, -30],
        title: "Prone to Digital Overload",
        description:
          "You often find that digital notifications and the sheer number of tools can be overwhelming and interrupt your flow.",
      },
      {
        range: [-100, -70],
        title: "Prefers Analog Methods",
        description:
          "You strongly prefer traditional or offline methods of study, finding the digital world to be a source of distraction.",
      },
    ],
  },
  collaboration: {
    name: "Collaboration vs. Independence",
    tiers: [
      {
        range: [70, 100],
        title: "Natural Collaborator",
        description:
          "You thrive in group settings, actively seeking out and excelling in collaborative work and shared learning.",
      },
      {
        range: [30, 69],
        title: "Prefers Teamwork",
        description: "You enjoy working with others and generally believe that collaboration leads to better outcomes.",
      },
      {
        range: [-29, 29],
        title: "Situational Collaborator",
        description:
          "You are equally comfortable working in a team or on your own, choosing the best approach for the task.",
      },
      {
        range: [-69, -30],
        title: "Prefers Independence",
        description: "You tend to do your best work alone, preferring to rely on your own insights and efforts.",
      },
      {
        range: [-100, -70],
        title: "Strongly Independent",
        description: "You have a very strong preference for studying and solving problems on your own.",
      },
    ],
  },
  adaptability: {
    name: "Adaptability vs. Rigidity",
    tiers: [
      {
        range: [70, 100],
        title: "Highly Adaptable",
        description:
          "You are exceptionally skilled at pivoting your approach in response to unexpected changes, thriving in dynamic environments.",
      },
      {
        range: [30, 69],
        title: "Flexible",
        description: "You are comfortable adjusting your plans and methods when situations change.",
      },
      {
        range: [-29, 29],
        title: "Balanced Approach",
        description: "You value having a consistent plan but are capable of adapting when necessary.",
      },
      {
        range: [-69, -30],
        title: "Prefers Structure",
        description:
          "You work most effectively when you can follow a consistent, predictable routine and may feel stressed by unexpected changes.",
      },
      {
        range: [-100, -70],
        title: "Highly Methodical",
        description:
          "You rely heavily on established systems and routines, finding significant disruption to be a major challenge.",
      },
    ],
  },
  "note-taking": {
    name: "Structured Note-Taking vs. Unstructured Capture",
    tiers: [
      {
        range: [70, 100],
        title: "Systematic Note-Taker",
        description:
          "Your notes are meticulously organized with clear systems like headings and bullet points for easy review.",
      },
      {
        range: [30, 69],
        title: "Organized Note-Taker",
        description: "You generally keep your notes well-organized, prioritizing structure and clarity.",
      },
      {
        range: [-29, 29],
        title: "Hybrid Note-Taker",
        description:
          "You flexibly switch between structured outlines and more free-flowing methods depending on the subject.",
      },
      {
        range: [-69, -30],
        title: "Unstructured Note-Taker",
        description:
          "You tend to capture ideas as they come, focusing on getting information down rather than on organization.",
      },
      {
        range: [-100, -70],
        title: "Abstract Note-Taker",
        description: "Your notes are often a creative and unstructured collection of thoughts, connections, and ideas.",
      },
    ],
  },
  retention: {
    name: "Retention vs. Cramming",
    tiers: [
      {
        range: [70, 100],
        title: "Spaced Practice Master",
        description:
          "You instinctively and consistently review material over time, leading to excellent long-term retention.",
      },
      {
        range: [30, 69],
        title: "Consistent Reviewer",
        description:
          "You make a regular habit of reviewing your notes, strongly preferring long-term learning over cramming.",
      },
      {
        range: [-29, 29],
        title: "Strategic Reviewer",
        description: "You combine some regular review with focused, intensive study sessions closer to exams.",
      },
      {
        range: [-69, -30],
        title: "Intensive Reviewer",
        description: "You tend to learn best by studying intensively in the days leading up to an exam.",
      },
      {
        range: [-100, -70],
        title: "Relies on Cramming",
        description:
          "Your primary study method involves massing your learning into one or two long sessions right before a deadline.",
      },
    ],
  },
  "critical-thinking": {
    name: "Critical Thinking vs. Surface Learning",
    tiers: [
      {
        range: [70, 100],
        title: "Deep Analytical Thinker",
        description:
          "You are driven to understand the 'why' behind concepts, consistently analyzing underlying principles and connections.",
      },
      {
        range: [30, 69],
        title: "Inquisitive Learner",
        description:
          "You consistently seek to understand concepts on a deeper level rather than simply memorizing facts.",
      },
      {
        range: [-29, 29],
        title: "Pragmatic Learner",
        description:
          "You balance deep, abstract thinking with a practical focus on memorizing the core information needed to succeed.",
      },
      {
        range: [-69, -30],
        title: "Focuses on Core Facts",
        description:
          "You prioritize learning and memorizing the essential facts and information required for your courses.",
      },
      {
        range: [-100, -70],
        title: "Rote Memorizer",
        description:
          "Your primary approach to learning involves the direct memorization of facts, figures, and key terms.",
      },
    ],
  },
  "well-being": {
    name: "Well-being Management vs. Burnout Vulnerability",
    tiers: [
      {
        range: [70, 100],
        title: "Proactive Self-Care",
        description:
          "You are highly attuned to your mental and physical needs, consistently integrating breaks and self-care into your routine.",
      },
      {
        range: [30, 69],
        title: "Balanced Self-Manager",
        description:
          "You are good at recognizing signs of stress and generally take breaks when you need them to stay effective.",
      },
      {
        range: [-29, 29],
        title: "Situationally Mindful",
        description: "You manage your well-being but can also push through intense periods when necessary.",
      },
      {
        range: [-69, -30],
        title: "Intensity-Driven",
        description:
          "You have a tendency to push yourself very hard, sometimes prioritizing your goals over the need for rest.",
      },
      {
        range: [-100, -70],
        title: "Prone to Burnout",
        description:
          "You often force yourself to keep studying even when exhausted, making you highly vulnerable to burnout.",
      },
    ],
  },
}

export function getTierForScore(metricKey: string, score: number): MetricTier {
  const metric = METRIC_DESCRIPTIONS[metricKey]
  if (!metric) {
    throw new Error(`Unknown metric: ${metricKey}`)
  }

  const tier = metric.tiers.find((t) => score >= t.range[0] && score <= t.range[1])
  if (!tier) {
    throw new Error(`No tier found for metric ${metricKey} with score ${score}`)
  }

  return tier
}
