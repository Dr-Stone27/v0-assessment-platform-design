-- Seed The Organizer archetype

-- Insert archetype
INSERT INTO archetypes (slug, name, core_philosophy, defining_traits)
VALUES (
  'organizer',
  'The Organizer',
  'Your academic journey is defined by a profound appreciation for structure, order, and meticulous planning. You thrive in environments where expectations are clear and progress can be systematically tracked. Your core philosophy is that effective preparation and diligent execution lead to predictable success.',
  '["Systematic Planner: You instinctively break down large tasks into manageable steps and schedule your time with precision", "Detail-Oriented: Your focus on organization extends to your notes and materials, which are meticulously ordered", "Goal-Driven: You set clear objectives and demonstrate strong self-regulation", "Reliable & Punctual: You consistently meet deadlines and commitments", "Process-Focused: You find comfort in following established methods"]'::jsonb
)
ON CONFLICT (slug) DO NOTHING;

-- Get the archetype ID for subsequent inserts
DO $$
DECLARE
  organizer_id UUID;
BEGIN
  SELECT id INTO organizer_id FROM archetypes WHERE slug = 'organizer';

  -- Insert interaction stories
  INSERT INTO interaction_stories (archetype_id, title, narrative, metrics_in_play, story_order)
  VALUES
    (
      organizer_id,
      'The Planner''s Paradox',
      'Your greatest strength is your ability to create a clear, predictable, and systematic plan. You are a master of Time Management, which gives you a profound sense of control and preparedness. This very strength, however, creates your primary challenge: your plans are like efficient train tracks, and when an unexpected event forces you off the rails, it can cause significant stress. This is the Planner''s Paradox: your deep need for structure (Rigidity) is the natural trade-off for your exceptional planning skills.',
      '{"Time Management": "high", "Adaptability": "low"}'::jsonb,
      1
    ),
    (
      organizer_id,
      'The ''Analysis Paralysis'' Engine',
      'You excel at the process of learning—breaking down projects, creating outlines, and organizing your notes. This world-class Task Management ensures no detail is missed. However, your intense focus on preparation can sometimes delay the actual engagement with a topic''s deeper questions. You run the risk of spending so much time organizing the material that you inadvertently engage in Surface Learning, delaying the messy, unpredictable work of true critical analysis. Your challenge is to trust your preparation and know when it''s time to dive into the deep end.',
      '{"Task Management": "high", "Critical Thinking": "low"}'::jsonb,
      2
    );

  -- Insert core strengths
  INSERT INTO archetype_metrics (archetype_id, metric_name, is_strength, level, behavior_description)
  VALUES
    (organizer_id, 'Time Management', true, 'High', 'You consistently schedule your week, block out study times, and rarely leave assignments until the last minute, demonstrating proactive and efficient allocation of your time.'),
    (organizer_id, 'Task Management', true, 'High', 'You excel at breaking large projects into sub-tasks, assigning micro-deadlines, and tracking progress daily, maintaining a clear, prioritized list of study tasks.'),
    (organizer_id, 'Note-Taking & Organization', true, 'High', 'Your notes are systematically organized with headings, bullet points, and diagrams, and you review them weekly to stay on top of key concepts.'),
    (organizer_id, 'Self-Regulation', true, 'High', 'You consistently set specific goals for each study session and adhere to them, demonstrating strong ability to plan, monitor, and evaluate your learning.'),
    (organizer_id, 'Retention & Spaced Practice', true, 'High', 'You review your class notes and materials regularly throughout the term, not just before exams, promoting long-term memory retention.');

  -- Insert development areas
  INSERT INTO archetype_metrics (archetype_id, metric_name, is_strength, level, behavior_description)
  VALUES
    (organizer_id, 'Collaborative Skills', false, 'Moderate to Low', 'You often prefer to study or solve academic problems on your own and may struggle to initiate group study sessions.'),
    (organizer_id, 'Adaptability', false, 'Moderate', 'While you thrive on structure, unexpected changes to your schedule or study plan can cause stress or anxiety.'),
    (organizer_id, 'Well-Being & Stress Management', false, 'Moderate', 'Your strong drive for organization can sometimes lead to feeling anxious when routines are disrupted.'),
    (organizer_id, 'Critical Thinking', false, 'Moderate', 'Your intense focus on organizing and preparation can sometimes delay engagement with deeper concepts.'),
    (organizer_id, 'Digital Literacy', false, 'Moderate', 'While proficient in established tools, you might benefit from exploring new educational apps.');

  -- Insert common challenges
  INSERT INTO archetype_challenges (archetype_id, challenge_title, challenge_description, challenge_order)
  VALUES
    (organizer_id, 'Group Project Frustration', 'You often struggle when group projects arise, as you prefer to plan your own timelines and find it difficult to align with less structured approaches of peers.', 1),
    (organizer_id, 'Anxiety from Disruption', 'Unexpected events or last-minute changes can trigger significant anxiety and feeling of loss of control.', 2),
    (organizer_id, '''Analysis Paralysis''', 'You might spend so much time meticulously organizing that you inadvertently delay actual study or production work.', 3),
    (organizer_id, 'Over-reliance on Known Systems', 'Your strong preference for consistency can make you rigid, resisting new study methods or tools.', 4),
    (organizer_id, 'Burnout Risk', 'Your high standards can lead to neglecting rest and self-care, increasing vulnerability to burnout.', 5);

  -- Insert growth strategies
  INSERT INTO growth_strategies (archetype_id, title, strategy_text, metrics_addressed, context_filters, strategy_order)
  VALUES
    (
      organizer_id,
      'Cultivate a "Flexible Buffer" in Your Schedule',
      'Each evening, reserve a 30-minute ''buffer block'' in your calendar for unplanned tasks or last-minute changes. This way, if an assignment''s scope expands or a quick, urgent task arises, you have a built-in cushion that accommodates the unexpected without derailing your entire plan.',
      '["Adaptability", "Time Management", "Well-Being & Stress Management"]'::jsonb,
      '{"years": ["Year 1 (Freshman)", "Year 2 (Sophomore)", "Year 3 (Junior)", "Year 4+ (Senior/Final year)"], "faculties": ["Engineering", "Business", "Computer Science"], "courseLoads": ["5-6 courses", "7+ courses"]}'::jsonb,
      1
    ),
    (
      organizer_id,
      'Engage in "Strategic Collaboration Loops"',
      'Identify one or two classmates in your department and commit to a short, weekly (e.g., 30-minute) "knowledge exchange" session. You can share quick summaries of your notes, discuss challenging concepts, or brainstorm initial ideas for projects. This low-stakes interaction builds collaborative muscle without compromising your independent planning.',
      '["Collaborative Skills", "Adaptability", "Critical Thinking"]'::jsonb,
      '{"years": ["Year 1 (Freshman)", "Year 2 (Sophomore)"], "faculties": ["Social Sciences", "Arts & Humanities", "Sciences"], "courseLoads": []}'::jsonb,
      2
    ),
    (
      organizer_id,
      'Implement the "Minimum Viable Outline" Approach',
      'When starting a new assignment, instead of creating an elaborate, multi-page outline from the outset, limit yourself to a "quick-start" guide: jot down just 3-5 essential bullet points. Dive into drafting the core content immediately. You can return to a more detailed outline after you''ve developed the basic structure.',
      '["Task Management", "Critical Thinking", "Self-Regulation"]'::jsonb,
      '{"years": [], "faculties": ["Arts & Humanities", "Law", "Social Sciences"], "courseLoads": []}'::jsonb,
      3
    ),
    (
      organizer_id,
      'Schedule "Idea Incubation" Time',
      'Dedicate 15-20 minutes a few times a week to simply explore topics loosely related to your studies without a rigid agenda. This could involve reading an interesting article, watching a documentary, or just free-associating about a course concept. This encourages idea incubation and fosters more divergent critical thinking.',
      '["Concentration & Focus", "Critical Thinking", "Adaptability"]'::jsonb,
      '{"years": ["Postgraduate/Master''s/PhD"], "faculties": ["Sciences", "Social Sciences"], "courseLoads": []}'::jsonb,
      4
    ),
    (
      organizer_id,
      'Practice "Flexible Tool Integration"',
      'Challenge yourself to try one new digital study tool or app each month for a specific organizational or learning task. Even if it''s just for a small project, experimenting helps you expand your digital literacy and find optimal tools that complement your structured approach.',
      '["Digital Literacy", "Adaptability"]'::jsonb,
      '{"years": [], "faculties": ["Engineering", "Business", "Computer Science"], "courseLoads": []}'::jsonb,
      5
    ),
    (
      organizer_id,
      'Implement a "Disruption Reflection" Prompt',
      'Once a week, spend 5 minutes journaling about a time your strict plan was unexpectedly disrupted. Reflect on how you felt, what immediate reaction you had, and one small, alternative way you could have adapted more smoothly. This mindful reflection helps manage stress and strengthens adaptability.',
      '["Well-Being & Stress Management", "Adaptability", "Metacognitive Monitoring"]'::jsonb,
      '{"years": ["Year 1 (Freshman)", "Year 2 (Sophomore)"], "faculties": [], "courseLoads": []}'::jsonb,
      6
    );
END $$;
