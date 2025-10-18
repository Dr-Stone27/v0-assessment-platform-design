-- Seed Reflective Thinker Archetype Content
INSERT INTO archetypes (name, slug, core_philosophy, defining_traits) VALUES (
  'The Reflective Thinker',
  'reflective-thinker',
  'Your academic journey is a contemplative and deliberate exploration, valuing depth of insight over rapid response. You are driven by a profound need to internalize, analyze, and fully comprehend information before forming conclusions or taking action. Your core philosophy is that true understanding emerges from thoughtful processing, allowing ideas to marinate and connections to reveal themselves.',
  '["Introspective & Deliberate: You naturally turn inward to process information, seeking quiet time for contemplation and carefully weighing options.", "Thorough Analyzer: You prefer to dissect information and consider all angles before committing to a course of action or expressing an opinion.", "Self-Aware: You possess a strong awareness of your own thoughts, feelings, and learning processes, often engaging in metacognitive monitoring.", "Pondering & Observant: You often take a thoughtful approach in discussions, preferring to listen and observe before contributing.", "Quality-Oriented: You prioritize depth and accuracy in your understanding and outputs over speed or superficial completion."]'::jsonb
)
ON CONFLICT (slug) DO NOTHING;

-- Get the archetype ID
DO $$
DECLARE
  archetype_id UUID;
BEGIN
  SELECT id INTO archetype_id FROM archetypes WHERE slug = 'reflective-thinker';

  -- Insert Interaction Stories
  INSERT INTO interaction_stories (archetype_id, title, narrative, metrics_in_play, story_order) VALUES
  (
    archetype_id,
    'The Insight-Action Gap',
    'Your superpower is your profound capacity for Metacognitive Monitoring—a deep self-awareness that allows you to think about your thinking. This is the engine of your insightful, high-quality work. However, this same engine can lead to "analysis paralysis." Your need to fully understand every angle before acting creates a challenge with Task Reactivity, making it difficult to start tasks or break them into simple, actionable steps. This gap between your deep insights and timely action is the primary hurdle you face, as you value correctness over speed.',
    '{"Metacognitive Monitoring": "high", "Task Management": "low"}'::jsonb,
    1
  ),
  (
    archetype_id,
    'The Processing Speed Mismatch',
    'Your Critical Thinking process is deep and deliberate, not fast. You prefer to internalize, analyze, and form a complete thought before sharing. This thoughtful process is at odds with the fast-paced, real-time nature of most group Collaboration. Your preference for Independence is not a dislike of people, but a mismatch in processing speed. You find it challenging to contribute your best ideas in a rapid-fire brainstorming session, as your insights require time and quiet contemplation to fully form.',
    '{"Critical Thinking": "high", "Collaborative Skills": "low"}'::jsonb,
    2
  );

  -- Insert Challenges
  INSERT INTO archetype_challenges (archetype_id, challenge_title, challenge_description, challenge_order) VALUES
  (
    archetype_id,
    'Production Delays ("Analysis Paralysis")',
    'You often spend too much time reflecting and internalizing information, inadvertently delaying the production of tangible outputs like papers, presentations, or finished assignments. This can lead to missed deadlines.',
    1
  ),
  (
    archetype_id,
    'Decision Paralysis',
    'Faced with sudden tasks or choices, you may overthink rather than taking immediate action, leading to missed opportunities or inefficient responses in fast-paced academic environments.',
    2
  ),
  (
    archetype_id,
    'Missed Collaborative Contributions',
    'Your quiet, observant nature can lead to missed opportunities in group settings where active participation and real-time idea exchange are valued; your profound insights may remain unshared.',
    3
  ),
  (
    archetype_id,
    'Pacing Issues',
    'You may struggle in fast-paced courses that demand quick processing and less time for deep contemplation, leading to feelings of being overwhelmed or left behind if you can''t keep pace with the material.',
    4
  );

  -- Insert Growth Strategies
  INSERT INTO growth_strategies (
    archetype_id, 
    title, 
    strategy_text, 
    metrics_addressed, 
    context_filters,
    strategy_order
  ) VALUES
  (
    archetype_id,
    'Implement a "Reflection-to-Action Sprint"',
    'After a dedicated reflection period (e.g., 30-45 minutes of deep thinking or journaling on a topic), set a 10-minute timer. During this "sprint," quickly list 3 specific, actionable tasks directly stemming from your reflection (e.g., "Outline the introduction to my essay," "Email professor for clarification on Topic X," "Draft 5 flashcards based on my insights"). Then, immediately begin executing the first task.',
    '["Task Management", "Time Management", "Self-Regulation"]'::jsonb,
    '{"years": [], "faculties": ["Arts & Humanities", "Business", "Law"], "courseLoads": []}'::jsonb,
    1
  ),
  (
    archetype_id,
    'Utilize "Think-Aloud" Recording for Metacognition',
    'For a complex problem, reading, or conceptual challenge, record yourself verbally thinking through your understanding, questions, and problem-solving steps for 5-10 minutes. Listening back helps you identify blind spots, verbalize your internal processes, and practice transitioning from pure reflection to articulated thought.',
    '["Metacognitive Monitoring", "Critical Thinking", "Collaborative Skills"]'::jsonb,
    '{"years": [], "faculties": ["Sciences", "Engineering", "Mathematics"], "courseLoads": []}'::jsonb,
    2
  ),
  (
    archetype_id,
    'Schedule "Briefing Back" Peer Sessions',
    'Find a study partner and commit to a weekly 15-minute "briefing back" session. Each of you briefly explains a complex concept you''ve recently reflected on, and the other asks clarifying questions. This low-stakes interaction encourages externalizing your insights and practicing concise, real-time communication.',
    '["Collaborative Skills", "Critical Thinking", "Adaptability"]'::jsonb,
    '{"years": [], "faculties": ["Arts & Humanities", "Social Sciences"], "courseLoads": []}'::jsonb,
    3
  ),
  (
    archetype_id,
    'Adopt "Reflective Digital Tools" for Streamlined Knowledge',
    'Explore a digital journaling app (e.g., Day One, Reflectly) or a personal knowledge management system (e.g., Obsidian, Roam Research) specifically designed for connecting and organizing thoughts. These tools can help you externalize your reflections, link related ideas, and quickly search through your internal monologues, making your deep dives more actionable and retrievable.',
    '["Digital Literacy", "Note-Taking & Organization", "Metacognitive Monitoring"]'::jsonb,
    '{"years": ["Postgraduate/Master''s/PhD"], "faculties": [], "courseLoads": []}'::jsonb,
    4
  ),
  (
    archetype_id,
    'Build in "Commitment Deadlines" for Flexibility',
    'For longer assignments, break them into smaller, self-imposed "commitment deadlines" for specific phases (e.g., "By Tuesday 5 PM: Thesis statement finalized & 3 main arguments outlined"). At these points, make a firm decision based on your reflection up to that point, even if it feels "imperfect," and commit to the next phase of action. This fosters adaptability and prevents over-analysis.',
    '["Adaptability", "Task Management", "Time Management"]'::jsonb,
    '{"years": ["Year 4+ (Senior/Final year)"], "faculties": ["Design", "Computer Science"], "courseLoads": []}'::jsonb,
    5
  ),
  (
    archetype_id,
    'Prioritize "Scheduled Unwind" Time & Mindful Breaks',
    'Your deep thinking can be mentally intensive. Explicitly block out non-negotiable "unwind time" in your schedule each day, even if it''s just 20-30 minutes for a walk, a hobby, or relaxation. Treat this just as importantly as a study session to prevent mental fatigue and ensure sustained well-being.',
    '["Well-Being & Stress Management", "Concentration & Focus"]'::jsonb,
    '{"years": [], "faculties": [], "courseLoads": ["7+ courses"]}'::jsonb,
    6
  );

END $$;
