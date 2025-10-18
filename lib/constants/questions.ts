import type { Question } from "../types"

export const ASSESSMENT_QUESTIONS: Question[] = [
  // Questions 1-2: Self-Regulation (Likert)
  {
    id: "q1",
    number: 1,
    text: "I set specific goals for each study session and stick to them.",
    dimension: "self-regulation",
    type: "likert",
    leftLabel: "Strongly Disagree",
    rightLabel: "Strongly Agree",
  },
  {
    id: "q2",
    number: 2,
    text: "I often switch tasks without finishing what I started (e.g., I begin an assignment, then check social media mid-way).",
    dimension: "self-regulation",
    type: "likert",
    leftLabel: "Strongly Disagree",
    rightLabel: "Strongly Agree",
  },

  // Question 3: Self-Regulation (Scenario)
  {
    id: "q3",
    number: 3,
    text: "If you're in the middle of studying and a friend invites you to a party, you would...",
    dimension: "self-regulation",
    type: "scenario",
    options: [
      { label: "A. Politely decline and keep studying until you hit your goal.", value: 2 },
      { label: "B. Tell them you'll join later, then finish your study block first.", value: 1 },
      { label: "C. Study for a bit longer, then go for a short while.", value: 0 },
      { label: "D. Pause studying and go to the party, planning to resume afterward.", value: -1 },
      { label: "E. Drop your study plans and head straight to the party.", value: -2 },
    ],
  },

  // Question 4: Time Management (Scenario)
  {
    id: "q4",
    number: 4,
    text: "You have a big project due in two weeks. You would...",
    dimension: "time-management",
    type: "scenario",
    options: [
      { label: "A. Break it into clear tasks with deadlines and follow that schedule.", value: 2 },
      { label: "B. Write down the tasks now, but tweak the plan as you go.", value: 1 },
      { label: "C. Start most parts early but leave some pieces for the last few days.", value: 0 },
      { label: "D. Delay most of it until the final 2–3 days before it's due.", value: -1 },
      { label: "E. Put it all off and cram it into one long session right before the deadline.", value: -2 },
    ],
  },

  // Questions 5-6: Time Management (Likert)
  {
    id: "q5",
    number: 5,
    text: "I often feel like I don't have enough time to complete all my study tasks.",
    dimension: "time-management",
    type: "likert",
    leftLabel: "Strongly Disagree",
    rightLabel: "Strongly Agree",
  },
  {
    id: "q6",
    number: 6,
    text: "I schedule specific hours each week for studying and try to stick to that schedule.",
    dimension: "time-management",
    type: "likert",
    leftLabel: "Strongly Disagree",
    rightLabel: "Strongly Agree",
  },

  // Question 7: Task Management (Likert)
  {
    id: "q7",
    number: 7,
    text: "I keep a clear, prioritized list of study tasks and follow it during my study sessions.",
    dimension: "task-management",
    type: "likert",
    leftLabel: "Strongly Disagree",
    rightLabel: "Strongly Agree",
  },

  // Question 8: Task Management (Scenario)
  {
    id: "q8",
    number: 8,
    text: 'A new, "urgent" study task comes up while you\'re working on something else. You would...',
    dimension: "task-management",
    type: "scenario",
    options: [
      { label: "A. Finish your current task before even looking at the new one.", value: 2 },
      { label: "B. Jot down the new task, then complete your current one first.", value: 1 },
      { label: "C. Switch immediately to the new task, planning to return later.", value: 0 },
      { label: "D. Drop your original task and focus fully on the new request.", value: -1 },
      { label: "E. Abandon both tasks and do something completely different.", value: -2 },
    ],
  },

  // Questions 9-10: Metacognitive Monitoring (Likert)
  {
    id: "q9",
    number: 9,
    text: "I regularly stop during studying to check if I really understand the material before moving on.",
    dimension: "metacognitive-monitoring",
    type: "likert",
    leftLabel: "Strongly Disagree",
    rightLabel: "Strongly Agree",
  },
  {
    id: "q10",
    number: 10,
    text: "I often only realize I didn't fully understand something after I've already completed the task.",
    dimension: "metacognitive-monitoring",
    type: "likert",
    leftLabel: "Strongly Disagree",
    rightLabel: "Strongly Agree",
  },

  // Questions 11-12: Concentration (Likert)
  {
    id: "q11",
    number: 11,
    text: "I can usually focus on studying even if I'm in a noisy or distracting environment.",
    dimension: "concentration",
    type: "likert",
    leftLabel: "Strongly Disagree",
    rightLabel: "Strongly Agree",
  },
  {
    id: "q12",
    number: 12,
    text: "Minor interruptions (like a phone notification or noise) often derail my focus when I'm studying.",
    dimension: "concentration",
    type: "likert",
    leftLabel: "Strongly Disagree",
    rightLabel: "Strongly Agree",
  },

  // Questions 13-14: Digital Literacy (Likert)
  {
    id: "q13",
    number: 13,
    text: "I enjoy trying new educational apps or tools and usually learn how to use them quickly.",
    dimension: "digital-literacy",
    type: "likert",
    leftLabel: "Strongly Disagree",
    rightLabel: "Strongly Agree",
  },
  {
    id: "q14",
    number: 14,
    text: "My phone or computer notifications frequently interrupt my studying.",
    dimension: "digital-literacy",
    type: "likert",
    leftLabel: "Strongly Disagree",
    rightLabel: "Strongly Agree",
  },

  // Questions 15-16: Collaboration (Likert)
  {
    id: "q15",
    number: 15,
    text: "I enjoy collaborating with classmates (studying together or working on projects) to learn or solve problems.",
    dimension: "collaboration",
    type: "likert",
    leftLabel: "Strongly Disagree",
    rightLabel: "Strongly Agree",
  },
  {
    id: "q16",
    number: 16,
    text: "I usually prefer to study or solve academic problems on my own rather than asking others for help.",
    dimension: "collaboration",
    type: "likert",
    leftLabel: "Strongly Disagree",
    rightLabel: "Strongly Agree",
  },

  // Questions 17-18: Adaptability (Likert)
  {
    id: "q17",
    number: 17,
    text: "When my study plan changes unexpectedly, I can quickly adapt and come up with a new plan.",
    dimension: "adaptability",
    type: "likert",
    leftLabel: "Strongly Disagree",
    rightLabel: "Strongly Agree",
  },
  {
    id: "q18",
    number: 18,
    text: "Changes to my schedule or study plan often make me feel stressed or anxious.",
    dimension: "adaptability",
    type: "likert",
    leftLabel: "Strongly Disagree",
    rightLabel: "Strongly Agree",
  },

  // Questions 19-20: Note-Taking (Likert)
  {
    id: "q19",
    number: 19,
    text: "I organize my notes with headings, bullet points, or diagrams to keep information clear.",
    dimension: "note-taking",
    type: "likert",
    leftLabel: "Strongly Disagree",
    rightLabel: "Strongly Agree",
  },
  {
    id: "q20",
    number: 20,
    text: "I often write notes in a hurry without organizing them, resulting in confusing scribbles.",
    dimension: "note-taking",
    type: "likert",
    leftLabel: "Strongly Disagree",
    rightLabel: "Strongly Agree",
  },

  // Question 21: Retention (Likert)
  {
    id: "q21",
    number: 21,
    text: "I review my class notes and materials regularly throughout the term, not just before exams.",
    dimension: "retention",
    type: "likert",
    leftLabel: "Strongly Disagree",
    rightLabel: "Strongly Agree",
  },

  // Question 22: Retention (Scenario)
  {
    id: "q22",
    number: 22,
    text: "An exam is one week away. You would...",
    dimension: "retention",
    type: "scenario",
    options: [
      { label: "A. Review your notes weekly throughout the term and continue that habit.", value: 2 },
      { label: "B. Do some early review but still plan for a couple of cramming sessions.", value: 1 },
      { label: "C. Wait until 2–3 days before and then study intensively.", value: 0 },
      { label: "D. Begin studying the night before the exam only.", value: -1 },
      { label: "E. Skip scheduled review and try to learn everything during the exam itself.", value: -2 },
    ],
  },

  // Questions 23-24: Critical Thinking (Likert)
  {
    id: "q23",
    number: 23,
    text: "I try to understand the underlying ideas behind what I learn, rather than just memorizing facts.",
    dimension: "critical-thinking",
    type: "likert",
    leftLabel: "Strongly Disagree",
    rightLabel: "Strongly Agree",
  },
  {
    id: "q24",
    number: 24,
    text: "I often rely on rote memorization instead of understanding the concepts deeply.",
    dimension: "critical-thinking",
    type: "likert",
    leftLabel: "Strongly Disagree",
    rightLabel: "Strongly Agree",
  },

  // Questions 25-26: Well-being (Likert)
  {
    id: "q25",
    number: 25,
    text: "I regularly take breaks and practice self-care (like exercise or relaxation) to manage stress during study periods.",
    dimension: "well-being",
    type: "likert",
    leftLabel: "Strongly Disagree",
    rightLabel: "Strongly Agree",
  },
  {
    id: "q26",
    number: 26,
    text: "I often force myself to keep studying even when I'm physically or mentally exhausted.",
    dimension: "well-being",
    type: "likert",
    leftLabel: "Strongly Disagree",
    rightLabel: "Strongly Agree",
  },

  // Questions 27-28: Mindset (Likert)
  {
    id: "q27",
    number: 27,
    text: "You can learn new things, but you can't really change your basic intelligence or core study abilities.",
    dimension: "mindset",
    type: "likert",
    leftLabel: "Strongly Agree",
    rightLabel: "Strongly Disagree",
  },
  {
    id: "q28",
    number: 28,
    text: "When I have to put a lot of effort into a subject, it usually means I'm not naturally good at it.",
    dimension: "mindset",
    type: "likert",
    leftLabel: "Strongly Agree",
    rightLabel: "Strongly Disagree",
  },

  // Question 29: Mindset (Scenario)
  {
    id: "q29",
    number: 29,
    text: "You receive a much lower grade than you expected on a major assignment. Your initial, gut reaction is to think:",
    dimension: "mindset",
    type: "scenario",
    options: [
      {
        label:
          "A. This proves I'm just not cut out for this subject. I should probably avoid courses like this in the future.",
        value: -2,
      },
      { label: "B. I'm so frustrated. I'm clearly not smart enough to have done well on this.", value: -1 },
      {
        label:
          "C. I'm disappointed, but I need to figure out what I misunderstood. I'll ask the instructor for specific feedback on how to improve my approach for next time.",
        value: 2,
      },
    ],
  },
]
