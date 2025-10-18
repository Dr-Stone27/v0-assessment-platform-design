-- Seed The Deep Diver archetype

INSERT INTO archetypes (slug, name, core_philosophy, defining_traits)
VALUES (
  'deep-diver',
  'The Deep Diver',
  'Your academic journey is a relentless quest for profound understanding and mastery. You are driven by an insatiable curiosity that compels you to explore every angle of a subject, never satisfied with superficial knowledge. Your core philosophy centers on the belief that true learning transcends memorization, demanding rigorous research and the achievement of mastery in niche topics.',
  '["Intellectually Curious: You are drawn to challenging topics and possess a natural desire to delve far beyond the surface", "Highly Focused: You can sustain attention for extended periods, often losing yourself in a topic", "Analytical Thinker: You excel at breaking down arguments and synthesizing new ideas", "Methodical in Mastery: You use effective learning techniques like retrieval practice and spaced repetition", "Independent Learner: Your pursuit of depth often means you prefer to work alone"]'::jsonb
)
ON CONFLICT (slug) DO NOTHING;

DO $$
DECLARE
  deep_diver_id UUID;
BEGIN
  SELECT id INTO deep_diver_id FROM archetypes WHERE slug = 'deep-diver';

  INSERT INTO interaction_stories (archetype_id, title, narrative, metrics_in_play, story_order)
  VALUES
    (
      deep_diver_id,
      'The Depth-Deadline Conflict',
      'At your core, you are driven by a relentless quest for mastery, a hallmark of your powerful Critical Thinking. You aren''t satisfied until you understand a topic from the inside out. This superpower is the direct cause of your most common struggle: a constant feeling of Time Urgency. It''s not that you''re ''bad'' at time management; it''s that you willingly and knowingly sacrifice external deadlines in your pursuit of profound understanding. This tension between your internal drive for depth and the external world''s demand for breadth is the central conflict you must navigate.',
      '{"Critical Thinking": "high", "Time Management": "low"}'::jsonb,
      1
    ),
    (
      deep_diver_id,
      'The Focus Fortress',
      'Your ability to enter a state of deep Concentration is your secret weapon. You can lose yourself in a topic for hours, plumbing its depths in a way few others can. To achieve this, you instinctively build a ''focus fortress'' around yourself, which often means preferring Independence. Your tendency to study alone isn''t about being anti-social; it''s a protective measure to guard your fragile state of deep focus from the interruptions of the outside world. The trade-off for your deep focus is often fewer opportunities for spontaneous, collaborative discovery.',
      '{"Concentration": "high", "Collaborative Skills": "low"}'::jsonb,
      2
    );

  INSERT INTO archetype_metrics (archetype_id, metric_name, is_strength, level, behavior_description)
  VALUES
    (deep_diver_id, 'Critical Thinking', true, 'High', 'You excel at analyzing arguments, identifying assumptions, and synthesizing new ideas, consistently trying to understand underlying principles rather than just memorizing facts.'),
    (deep_diver_id, 'Retention & Spaced Practice', true, 'High', 'You naturally use retrieval practice and revisit notes at spaced intervals, reviewing materials regularly throughout the term.'),
    (deep_diver_id, 'Concentration & Focus', true, 'High', 'You can lose yourself in a topic for hours without feeling fatigued, maintaining deep focus even in distracting environments.'),
    (deep_diver_id, 'Metacognitive Monitoring', true, 'High to Moderate', 'Your craving for in-depth understanding suggests strong awareness of your cognitive processes.'),
    (deep_diver_id, 'Self-Regulation', true, 'Moderate to High', 'Your ability to sustain long study sessions indicates strong capacity for planning and monitoring your learning.');

  INSERT INTO archetype_metrics (archetype_id, metric_name, is_strength, level, behavior_description)
  VALUES
    (deep_diver_id, 'Time Management', false, 'Moderate to Low', 'Immersing yourself in details sometimes causes you to miss deadlines or overlook broader tasks.'),
    (deep_diver_id, 'Collaborative Skills', false, 'Moderate', 'You frequently study alone, and while this supports deep focus, you might miss new perspectives from peers.'),
    (deep_diver_id, 'Adaptability', false, 'Moderate', 'Your preference for deep dives can make it challenging to pivot when coursework moves too quickly.'),
    (deep_diver_id, 'Digital Literacy', false, 'Moderate', 'Your traditional approach might mean you''re less inclined to explore new educational tools.'),
    (deep_diver_id, 'Well-Being & Stress Management', false, 'Moderate', 'Spending extensive time on one topic can lead to neglecting other aspects of well-being.');

  INSERT INTO archetype_challenges (archetype_id, challenge_title, challenge_description, challenge_order)
  VALUES
    (deep_diver_id, 'Deadline Management', 'You often struggle to complete other assignments on time because you dedicate extensive periods to deeply exploring one topic.', 1),
    (deep_diver_id, 'Frustration with Superficiality', 'You feel intensely frustrated when coursework moves too quickly or superficially.', 2),
    (deep_diver_id, 'Conciseness Difficulty', 'You may find it difficult to summarize complex ideas concisely for presentations or exams.', 3),
    (deep_diver_id, 'Isolation in Learning', 'Your preference for independent study can lead to academic isolation.', 4),
    (deep_diver_id, 'Ignoring Breadth for Depth', 'While you achieve profound depth in selected areas, you risk neglecting curriculum breadth.', 5),
    (deep_diver_id, 'Burnout from Intense Focus', 'Your intense focus can lead to neglecting breaks and self-care.', 6);

  INSERT INTO growth_strategies (archetype_id, title, strategy_text, metrics_addressed, context_filters, strategy_order)
  VALUES
    (
      deep_diver_id,
      'Implement Structured "Deep Dive" & "Breadth" Blocks',
      'Schedule at least two 90-minute sessions per week dedicated solely to one topic for deep reading and analysis. Crucially, also schedule separate, shorter (e.g., 45-minute) "Breadth Review" blocks for less complex or broader topics, ensuring all course material receives attention.',
      '["Time Management", "Task Management", "Concentration & Focus"]'::jsonb,
      '{"years": ["Postgraduate/Master''s/PhD", "Year 4+ (Senior/Final year)"], "faculties": [], "courseLoads": ["5-6 courses", "7+ courses"]}'::jsonb,
      1
    ),
    (
      deep_diver_id,
      'Utilize a "Priority Matrix" for Balanced Focus',
      'Before each study week, list all your assignments and readings. Rank them on a 2x2 matrix (Urgent vs. Important). Use this to decide where your next deep dive goes, ensuring critical deadlines are met while still allocating time for in-depth exploration.',
      '["Task Management", "Time Management", "Self-Regulation"]'::jsonb,
      '{"years": ["Year 4+ (Senior/Final year)", "Year 3 (Junior)"], "faculties": [], "courseLoads": []}'::jsonb,
      2
    ),
    (
      deep_diver_id,
      'Initiate a "2-Minute Deep Dive Summary" Peer Exchange',
      'Choose one friend or classmate and commit to sending them a 2-paragraph write-up of your deep dive findings once a week. This act of teaching someone else helps solidify concepts, improves your ability to summarize complex ideas concisely, and fosters collaborative habits.',
      '["Critical Thinking", "Collaborative Skills", "Self-Regulation"]'::jsonb,
      '{"years": [], "faculties": ["Arts & Humanities", "Social Sciences"], "courseLoads": []}'::jsonb,
      3
    ),
    (
      deep_diver_id,
      'Practice "Structured Summarization" for Clarity',
      'After every deep dive session, create a concise, bullet-point summary or mind map of the core arguments and key takeaways, limiting it to one page. This intentional practice of distillation strengthens your ability to extract essential information without losing nuance.',
      '["Critical Thinking", "Note-Taking & Organization", "Adaptability"]'::jsonb,
      '{"years": [], "faculties": ["Law", "Business"], "courseLoads": []}'::jsonb,
      4
    ),
    (
      deep_diver_id,
      'Explore Digital Tools for Research Synthesis',
      'Experiment with digital tools designed for research organization and synthesis (e.g., Zotero for citations, Obsidian for networked notes). These tools can streamline the collation of information from multiple sources, enhancing efficiency without sacrificing depth.',
      '["Digital Literacy", "Note-Taking & Organization"]'::jsonb,
      '{"years": ["Postgraduate/Master''s/PhD"], "faculties": ["Sciences", "Engineering"], "courseLoads": []}'::jsonb,
      5
    ),
    (
      deep_diver_id,
      'Integrate "Micro-Breaks" to Prevent Burnout',
      'For every 60-90 minutes of deep work, schedule a mandatory 5-10 minute "brain reset" break. This could be stretching, walking away from your study space, or doing something completely unrelated. This prevents mental fatigue and improves sustained concentration.',
      '["Well-Being & Stress Management", "Concentration & Focus"]'::jsonb,
      '{"years": [], "faculties": [], "courseLoads": ["7+ courses"]}'::jsonb,
      6
    );
END $$;
