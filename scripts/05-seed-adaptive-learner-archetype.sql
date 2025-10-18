-- Seed Adaptive Learner Archetype Content
INSERT INTO archetypes (name, slug, core_philosophy, defining_traits) VALUES (
  'The Adaptive Learner',
  'adaptive-learner',
  'Your academic journey is defined by a remarkable agility and openness to new approaches. You thrive on change and readily embrace new methods, tools, and environments. Your core philosophy is that learning is a dynamic process, and effective engagement requires continuous adjustment and a willingness to step outside your comfort zone.',
  -- Fixed ARRAY[] to JSONB array format
  '["Flexible & Agile: You easily pivot your study strategies in response to new course demands or unexpected changes.", "Open-Minded: You are eager to try new learning techniques, tools, or perspectives.", "Resilient: You bounce back quickly from setbacks or when initial plans don''t work out.", "Resourceful: You are adept at finding alternative solutions when faced with obstacles.", "Experimenter: You are willing to engage in trial-and-error to discover what works best in different situations."]'::jsonb
)
ON CONFLICT (slug) DO NOTHING;

-- Get the archetype ID
DO $$
DECLARE
  archetype_id UUID;
BEGIN
  SELECT id INTO archetype_id FROM archetypes WHERE slug = 'adaptive-learner';

  -- Insert Interaction Stories
  INSERT INTO interaction_stories (archetype_id, title, narrative, metrics_in_play, story_order) VALUES
  (
    archetype_id,
    'The Flexibility-Retention Trade-Off',
    'Your defining trait is your incredible Adaptability. You are a master of change, constantly experimenting with new tools and strategies to meet the demands of the moment. This "Shiny Object Syndrome" is a great strength in dynamic environments, but it creates a direct conflict with the mechanics of long-term memory. True Retention relies on consistent, spaced practice of a single method. Your constant, beneficial switching of strategies prevents the very routine needed to build deep, lasting knowledge, often leading you to rely on Cramming. Your core challenge is to strategically create pockets of consistency within your flexible approach.',
    '{"Adaptability": "high", "Retention & Spaced Practice": "low"}'::jsonb,
    1
  ),
  (
    archetype_id,
    'The Reactive Problem-Solver',
    'Your mind is geared for agile Critical Thinking and rapid problem-solving. When a new challenge arises, you can quickly analyze it and devise an effective solution. This strength wires you for Task Reactivity. You thrive on solving the new, urgent problem that just appeared, which often means the old, pre-set plan gets abandoned. You are less of a systematic planner and more of a brilliant troubleshooter, but this can make it difficult to make steady progress on long-term projects that require proactive, consistent effort.',
    '{"Critical Thinking": "high", "Task Management": "low"}'::jsonb,
    2
  );

  -- Insert Challenges
  INSERT INTO archetype_challenges (archetype_id, challenge_title, challenge_description, challenge_order) VALUES
  (
    archetype_id,
    'Lack of Consistent Systems',
    'Your adaptability can make it difficult to settle on a single, effective note-taking or study system, leading to fragmented organization and difficulty in sustained knowledge accumulation.',
    1
  ),
  (
    archetype_id,
    '"Shiny Object Syndrome"',
    'You might be prone to constantly switching between new study apps or methods, never fully mastering one before moving to the next, which can hinder the consistent application of effective learning strategies.',
    2
  ),
  (
    archetype_id,
    'Superficial Depth',
    'While you grasp new concepts quickly, a continuous shift in focus or method might prevent you from achieving deep, sustained understanding in a particular area, leading to surface-level knowledge.',
    3
  ),
  (
    archetype_id,
    'Time Efficiency Drain',
    'The process of adapting and experimenting with new approaches, while beneficial, can sometimes be less time-efficient than sticking to a proven method, particularly under tight deadlines.',
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
    'Establish a "Core 3" Note-Taking & Review System',
    'Experiment with different note-taking methods (e.g., Cornell, linear, mind map) and choose the "Core 3" that feel most comfortable and effective for different types of courses (e.g., one for lecture-heavy, one for conceptual, one for practical). Stick to these 3 consistently for a full term. Also, schedule a weekly 30-minute block specifically for reviewing these notes.',
    '["Note-Taking & Organization", "Retention & Spaced Practice", "Self-Regulation"]'::jsonb,
    '{"years": ["Year 1 (Freshman)"], "faculties": [], "courseLoads": []}'::jsonb,
    1
  ),
  (
    archetype_id,
    'Utilize a "Weekly Fixed Point" for Planning',
    'Despite your flexible nature, designate one specific hour each week (e.g., Sunday evening) as your "Fixed Point" planning time. During this hour, outline your key academic tasks for the upcoming week and allocate tentative time slots. This provides a flexible framework without rigid daily scheduling.',
    '["Time Management", "Task Management", "Self-Regulation"]'::jsonb,
    '{"years": ["Year 4+ (Senior/Final year)"], "faculties": [], "courseLoads": []}'::jsonb,
    2
  ),
  (
    archetype_id,
    'Implement "Deep Dive Cycles" within Your Adaptability',
    'For each major topic or module, commit to a "Deep Dive Cycle" of at least 2-3 weeks where you focus on a specific learning strategy (e.g., active recall with flashcards, teaching the material to a peer). Resist the urge to switch methods within this cycle, allowing for mastery before moving on.',
    '["Retention & Spaced Practice", "Concentration & Focus", "Critical Thinking"]'::jsonb,
    '{"years": [], "faculties": ["Sciences", "Engineering", "Computer Science", "Mathematics"], "courseLoads": []}'::jsonb,
    3
  ),
  (
    archetype_id,
    'Practice "Structured Reflection on Adaptation"',
    'After adapting to a significant change or overcoming an academic challenge, spend 10 minutes reflecting. Ask: "What did I adapt to?", "How did I adapt?", "What worked well?", and "What could be improved?". Journaling these insights helps convert reactive adaptation into proactive learning.',
    '["Metacognitive Monitoring", "Adaptability", "Well-Being & Stress Management"]'::jsonb,
    '{"years": [], "faculties": ["Design", "Arts & Humanities"], "courseLoads": ["7+ courses"]}'::jsonb,
    4
  ),
  (
    archetype_id,
    'Curate a "Digital Core Toolkit"',
    'Instead of endlessly experimenting with new digital tools, identify a "Core Toolkit" of 3-5 essential digital apps for different functions (e.g., one for note-taking, one for task management, one for collaborative documents). Become proficient in these before exploring new ones, using them consistently.',
    '["Digital Literacy", "Note-Taking & Organization", "Task Management"]'::jsonb,
    '{"years": [], "faculties": [], "courseLoads": []}'::jsonb,
    5
  ),
  (
    archetype_id,
    'Schedule "Active Rest" Intervals',
    'While you''re good at adapting to stress, proactively schedule short, meaningful breaks throughout your study day (e.g., 10 minutes of stretching, a short walk, or listening to music). These "active rest" intervals help to process information, reduce mental fatigue, and prevent cumulative stress.',
    '["Well-Being & Stress Management", "Concentration & Focus"]'::jsonb,
    '{"years": [], "faculties": [], "courseLoads": []}'::jsonb,
    6
  );

END $$;
