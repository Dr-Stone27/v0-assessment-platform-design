-- Seed Collaborator Archetype Content
INSERT INTO archetypes (name, slug, core_philosophy, defining_traits) VALUES (
  'The Collaborator',
  'collaborator',
  'Your academic journey is energized by interaction and shared learning. You believe that knowledge grows richer through discussion, debate, and collective problem-solving. Your core philosophy is rooted in the idea that diverse perspectives and shared intellectual effort lead to more robust understanding and innovative solutions.',
  '["Interpersonal Communicator: You excel at articulating your thoughts and actively listening to others, making group work highly effective.", "Team-Oriented: You naturally seek out opportunities to work with peers, believing that two heads are better than one.", "Facilitator: You often help bridge gaps in understanding within a group and encourage participation from all members.", "Open-Minded: You are receptive to different viewpoints and readily integrate feedback into your own understanding.", "Network Builder: You naturally connect with peers and instructors, expanding your academic and professional circles."]'::jsonb
)
ON CONFLICT (slug) DO NOTHING;

-- Get the archetype ID
DO $$
DECLARE
  archetype_id UUID;
BEGIN
  SELECT id INTO archetype_id FROM archetypes WHERE slug = 'collaborator';

  -- Insert Interaction Stories
  INSERT INTO interaction_stories (archetype_id, title, narrative, metrics_in_play, story_order) VALUES
  (
    archetype_id,
    'The External Motivation Engine',
    'You are energized and motivated by interaction; Collaboration is the fuel in your academic engine. Group deadlines, peer discussions, and shared goals drive you forward. This social engine is so powerful that when you work alone, you may find your motivation wanes. Your challenge with Impulsivity or procrastination in solo work is a direct result of your greatest strength: your primary source of regulation and discipline is external, found within the dynamic energy of a group.',
    '{"Collaboration": "high", "Self-Regulation": "low"}'::jsonb,
    1
  ),
  (
    archetype_id,
    'The Group-Sourced Brain',
    'In a group setting, you are incredibly Adaptable, skillfully navigating different personalities and pivoting based on new ideas. You thrive on the live exchange of information. Because you are so adept at learning through discussion, you may under-develop the habit of personal, Structured Note-Taking. You often rely on shared documents or the "group memory," meaning your personal, organized knowledge base can sometimes be neglected. Your challenge is to build a personal system for internalizing the knowledge that you so expertly help the group create.',
    '{"Adaptability": "high", "Note-Taking & Organization": "low"}'::jsonb,
    2
  );

  -- Insert Challenges
  INSERT INTO archetype_challenges (archetype_id, challenge_title, challenge_description, challenge_order) VALUES
  (
    archetype_id,
    'Solo Work Struggles',
    'You often struggle with assignments that require extensive independent work, as you thrive on external input and may find it harder to maintain motivation or structure without a group dynamic.',
    1
  ),
  (
    archetype_id,
    'Over-Reliance on Others',
    'You might sometimes rely too heavily on peers to drive progress or solve problems, potentially hindering the development of your own independent problem-solving skills.',
    2
  ),
  (
    archetype_id,
    'Blurred Boundaries',
    'Your enthusiasm for collaboration can lead to difficulty in setting personal boundaries, taking on too much group work, or allowing collaborative tasks to spill into time needed for individual study.',
    3
  ),
  (
    archetype_id,
    'Distraction in Solo Study',
    'The stimulation of constant communication and group activity can make it difficult to transition into periods of quiet, focused individual study, leading to distractibility.',
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
    'Implement a "Solo Sprint" Before Group Meetings',
    'Before every group meeting or collaborative study session, dedicate 30 minutes to an hour to review the material independently, identify your own questions, and outline your initial thoughts. This ensures you arrive prepared to contribute meaningfully, rather than relying solely on the group to guide your understanding.',
    '["Self-Regulation", "Critical Thinking", "Time Management"]'::jsonb,
    '{"years": [], "faculties": ["Business", "Engineering"], "courseLoads": []}'::jsonb,
    1
  ),
  (
    archetype_id,
    'Use a "Personal Task Tracker" for Individual Work',
    'Maintain a separate, simple task list or digital tracker (e.g., Google Keep, Trello board) specifically for your individual assignments and readings. Prioritize 1-2 solo tasks each day, even small ones, to build consistency in managing your independent workload alongside group commitments.',
    '["Task Management", "Time Management", "Self-Regulation"]'::jsonb,
    '{"years": ["Year 1 (Freshman)", "Year 2 (Sophomore)"], "faculties": [], "courseLoads": ["5-6 courses", "7+ courses"]}'::jsonb,
    2
  ),
  (
    archetype_id,
    'Schedule "Uninterrupted Focus Blocks"',
    'Identify 2-3 specific 60-90 minute blocks in your weekly schedule where you commit to absolute individual focus. Turn off notifications, close distracting tabs, and work on a solo assignment or difficult reading. This helps train your concentration for deep work.',
    '["Concentration & Focus", "Time Management", "Well-Being & Stress Management"]'::jsonb,
    '{"years": ["Year 4+ (Senior/Final year)"], "faculties": ["Computer Science", "Mathematics"], "courseLoads": []}'::jsonb,
    3
  ),
  (
    archetype_id,
    'Develop a "Hybrid Note-Taking System"',
    'While shared notes are great for group work, create a personal note-taking system where you regularly synthesize and reorganize key information from lectures and readings in your own words. This could be through mind maps, Cornell notes, or digital apps like Notion. This ensures personal retention and understanding.',
    '["Note-Taking & Organization", "Retention & Spaced Practice", "Critical Thinking"]'::jsonb,
    '{"years": [], "faculties": ["Arts & Humanities", "Social Sciences"], "courseLoads": []}'::jsonb,
    4
  ),
  (
    archetype_id,
    'Practice "Strategic Digital Disengagement"',
    'For your scheduled "Uninterrupted Focus Blocks" and during personal review times, intentionally disable communication app notifications (e.g., WhatsApp, Discord). Inform your group that you''ll be offline for a specific period but will respond later. This manages digital overload and improves individual focus.',
    '["Digital Literacy", "Concentration & Focus", "Well-Being & Stress Management"]'::jsonb,
    '{"years": [], "faculties": [], "courseLoads": []}'::jsonb,
    5
  ),
  (
    archetype_id,
    'Form a "Skill-Swap" Study Pair',
    'Find one peer who excels in an area you want to develop (e.g., time management, essay outlining). Offer to help them with an area where you''re strong (e.g., brainstorming, group facilitation) in exchange for their insights. This structured peer learning can fill your individual skill gaps.',
    '["Collaborative Skills", "Adaptability", "Self-Regulation"]'::jsonb,
    '{"years": [], "faculties": [], "courseLoads": []}'::jsonb,
    6
  );

END $$;
