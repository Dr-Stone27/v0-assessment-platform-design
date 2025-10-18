import type { LucideIcon } from "lucide-react"
import { 
  Target, 
  Clock, 
  CheckSquare, 
  Brain, 
  Focus, 
  Smartphone, 
  Users, 
  RefreshCw, 
  FileText, 
  BookOpen, 
  Lightbulb, 
  Heart,
  Calendar,
  Search,
  MessageSquare,
  BookMarked,
  Zap
} from "lucide-react"

export interface MetricInfo {
  key: string
  name: string
  icon: LucideIcon
  description: string
}

export interface ArchetypeInfo {
  key: string
  name: string
  icon: LucideIcon
  description: string
  color: string
}

export const METRICS_INFO: MetricInfo[] = [
  {
    key: "self-regulation",
    name: "Self-Regulation",
    icon: Target,
    description: "Your ability to set goals, stick to plans, and resist distractions while studying."
  },
  {
    key: "time-management",
    name: "Time Management",
    icon: Clock,
    description: "How well you plan, schedule, and allocate time for your academic work."
  },
  {
    key: "task-management",
    name: "Task Management",
    icon: CheckSquare,
    description: "Your approach to breaking down projects and prioritizing study tasks."
  },
  {
    key: "metacognitive-monitoring",
    name: "Metacognitive Monitoring",
    icon: Brain,
    description: "How often you check your understanding and adjust your learning approach."
  },
  {
    key: "concentration",
    name: "Concentration",
    icon: Focus,
    description: "Your ability to maintain focus and resist distractions during study sessions."
  },
  {
    key: "digital-literacy",
    name: "Digital Literacy",
    icon: Smartphone,
    description: "Your comfort and skill with digital tools and managing digital distractions."
  },
  {
    key: "collaboration",
    name: "Collaboration",
    icon: Users,
    description: "Your preference for working with others versus studying independently."
  },
  {
    key: "adaptability",
    name: "Adaptability",
    icon: RefreshCw,
    description: "How well you adjust to changes in your study plans and learning environment."
  },
  {
    key: "note-taking",
    name: "Note-Taking",
    icon: FileText,
    description: "Your approach to organizing and structuring information while learning."
  },
  {
    key: "retention",
    name: "Retention",
    icon: BookOpen,
    description: "Your strategies for remembering information over the long term."
  },
  {
    key: "critical-thinking",
    name: "Critical Thinking",
    icon: Lightbulb,
    description: "Your tendency to analyze concepts deeply versus memorizing surface facts."
  },
  {
    key: "well-being",
    name: "Well-being",
    icon: Heart,
    description: "How well you manage stress and maintain balance during intense study periods."
  }
]

export const ARCHETYPES_INFO: ArchetypeInfo[] = [
  {
    key: "organizer",
    name: "The Organizer",
    icon: Calendar,
    description: "You thrive on structure and systematic planning. You excel at breaking down complex projects into manageable steps and maintaining detailed schedules.",
    color: "blue"
  },
  {
    key: "deep-diver",
    name: "Deep Diver",
    icon: Search,
    description: "You're driven by curiosity and love exploring concepts in depth. You prefer to understand the 'why' behind information rather than just memorizing facts.",
    color: "purple"
  },
  {
    key: "collaborator",
    name: "Collaborator",
    icon: Users,
    description: "You learn best through interaction and teamwork. You enjoy discussing ideas with others and find group study sessions highly effective.",
    color: "green"
  },
  {
    key: "adaptive-learner",
    name: "Adaptive Learner",
    icon: RefreshCw,
    description: "You're flexible and tech-savvy, quickly adapting to new learning methods and tools. You enjoy experimenting with different approaches.",
    color: "orange"
  },
  {
    key: "reflective-thinker",
    name: "Reflective Thinker",
    icon: BookMarked,
    description: "You're introspective and metacognitive, regularly reflecting on your learning process and seeking deeper understanding of yourself as a learner.",
    color: "pink"
  }
]

export const ASSESSMENT_STEPS = [
  {
    step: 1,
    title: "Answer 29 Questions",
    description: "Complete our research-backed assessment covering 12 key learning dimensions through a mix of scenarios and rating scales.",
    icon: MessageSquare
  },
  {
    step: 2,
    title: "Get Your Profile",
    description: "Receive a detailed analysis of your learning style with scores across all dimensions and your primary archetype match.",
    icon: Brain
  },
  {
    step: 3,
    title: "Access Resources",
    description: "Explore personalized tools, techniques, and strategies tailored specifically to your learning archetype and development areas.",
    icon: Zap
  }
]
