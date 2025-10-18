-- Seed Tools Bank with all tools from the document

-- Insert Tools
INSERT INTO tools (name, description, category, url) VALUES
-- Organizer Tools
('Trello', 'Task and project management with boards and checklists', 'Task Management', 'https://trello.com'),
('Notion', 'Multi-functional workspace for planning, notes, databases', 'Workspace', 'https://notion.so'),
('Forest', 'Pomodoro-based time tracking app that gamifies focus', 'Time Management', 'https://www.forestapp.cc'),
('Todoist', 'Simple, robust to-do list with calendar integration', 'Task Management', 'https://todoist.com'),
('ClickUp', 'More advanced project tracking (great for power users)', 'Project Management', 'https://clickup.com'),
('Google Calendar', 'Planning and time blocking', 'Time Management', 'https://calendar.google.com'),

-- Deep Diver Tools
('Obsidian', 'Local-first knowledge graph with markdown and backlinking', 'Note-Taking', 'https://obsidian.md'),
('Anki', 'Spaced repetition flashcard system for long-term retention', 'Learning', 'https://ankiweb.net'),
('MindMeister', 'Mind mapping tool for conceptual connections', 'Visual Learning', 'https://www.mindmeister.com'),
('Notebook LM', 'AI-assisted research and notebook synthesis', 'AI Learning', 'https://notebooklm.google.com'),
('Zotero', 'Reference manager + research note tagging', 'Research', 'https://www.zotero.org'),
('RemNote', 'Combines note-taking with spaced repetition', 'Learning', 'https://www.remnote.com'),
('LiquidText', 'Advanced reading and annotation (great for PDF synthesis)', 'Reading', 'https://www.liquidtext.net'),

-- Collaborator Tools
('Google Docs', 'Real-time collaborative writing and editing', 'Collaboration', 'https://docs.google.com'),
('Miro', 'Shared whiteboard for brainstorming and planning', 'Collaboration', 'https://miro.com'),
('Slack', 'Asynchronous/synchronous communication tool', 'Communication', 'https://slack.com'),
('Discord', 'Community communication and voice chat', 'Communication', 'https://discord.com'),
('Loom', 'Record and share quick videos for asynchronous feedback', 'Video', 'https://www.loom.com'),
('Figma', 'Visual collaboration and prototyping', 'Design', 'https://www.figma.com'),

-- Adaptive Learner Tools
('ChatGPT', 'AI tutor for real-time guidance and custom learning', 'AI Learning', 'https://chatgpt.com'),
('Gemini', 'Google AI assistant for learning support', 'AI Learning', 'https://gemini.google.com'),
('Claude', 'Anthropic AI for detailed explanations and learning', 'AI Learning', 'https://claude.ai'),
('Tana', 'Combines structure with AI-driven content suggestions', 'Workspace', 'https://tana.inc'),
('Scrintal', 'Visual note-taking meets networked thinking', 'Note-Taking', 'https://scrintal.com'),
('Heptabase', 'Visual + hierarchical note organization ideal for nonlinear learners', 'Note-Taking', 'https://heptabase.com'),

-- Reflective Learner Tools
('Evernote', 'Journaling, capturing reflections across devices', 'Journaling', 'https://evernote.com'),
('Roam Research', 'Networked thinking for pattern recognition in personal growth', 'Note-Taking', 'https://roamresearch.com'),
('Day One', 'Dedicated journaling tool (mood, photo, voice, etc.)', 'Journaling', 'https://dayoneapp.com'),
('Diaro', 'Lightweight journaling + mood tracking', 'Journaling', 'https://diaro.app'),
('Journey', 'Guided journaling with prompts', 'Journaling', 'https://journey.cloud'),

-- Universal Technique Tools
('Quizlet', 'Active recall and spaced repetition flashcards', 'Learning', 'https://quizlet.com'),
('NeuraCache', 'AI-powered spaced repetition', 'Learning', 'https://neuracache.com'),
('Pomofocus', 'Simple Pomodoro timer', 'Time Management', 'https://pomofocus.io'),
('WhatsApp', 'Communication and collaboration', 'Communication', 'https://www.whatsapp.com')
ON CONFLICT DO NOTHING;

-- Insert Tool Tags
INSERT INTO tool_tags (tool_id, tag) 
SELECT id, 'Time Management' FROM tools WHERE name IN ('Forest', 'Google Calendar', 'Pomofocus')
UNION ALL
SELECT id, 'Spaced Repetition' FROM tools WHERE name IN ('Anki', 'RemNote', 'NeuraCache', 'Quizlet')
UNION ALL
SELECT id, 'Active Recall' FROM tools WHERE name IN ('Anki', 'Obsidian', 'Quizlet')
UNION ALL
SELECT id, 'Visual Mapping' FROM tools WHERE name IN ('Miro', 'MindMeister', 'Heptabase', 'Scrintal')
UNION ALL
SELECT id, 'Metacognitive Journaling' FROM tools WHERE name IN ('Day One', 'Roam Research', 'Evernote', 'Notion')
UNION ALL
SELECT id, 'AI-Powered Learning' FROM tools WHERE name IN ('ChatGPT', 'Claude', 'Gemini', 'Notebook LM', 'Tana')
UNION ALL
SELECT id, 'Concept Synthesis' FROM tools WHERE name IN ('Obsidian', 'Roam Research', 'LiquidText', 'Scrintal')
UNION ALL
SELECT id, 'Peer Feedback' FROM tools WHERE name IN ('Google Docs', 'Loom', 'Miro', 'Slack', 'Discord')
UNION ALL
SELECT id, 'Task Management' FROM tools WHERE name IN ('Trello', 'Todoist', 'ClickUp', 'Notion')
UNION ALL
SELECT id, 'Collaboration' FROM tools WHERE name IN ('Google Docs', 'Miro', 'Figma', 'Notion')
ON CONFLICT DO NOTHING;

-- Link tools to archetypes (Organizer)
INSERT INTO archetype_tools (archetype_id, tool_id, is_primary, justification, tool_order)
SELECT a.id, t.id, true, 'Essential for organizing tasks and projects', 1
FROM archetypes a, tools t
WHERE a.slug = 'organizer' AND t.name = 'Trello'
UNION ALL
SELECT a.id, t.id, true, 'Comprehensive workspace for planning and organization', 2
FROM archetypes a, tools t
WHERE a.slug = 'organizer' AND t.name = 'Notion'
UNION ALL
SELECT a.id, t.id, true, 'Gamified Pomodoro timer for focused study sessions', 3
FROM archetypes a, tools t
WHERE a.slug = 'organizer' AND t.name = 'Forest'
UNION ALL
SELECT a.id, t.id, false, 'Simple and robust to-do list management', 4
FROM archetypes a, tools t
WHERE a.slug = 'organizer' AND t.name = 'Todoist'
UNION ALL
SELECT a.id, t.id, false, 'Advanced project tracking for complex workflows', 5
FROM archetypes a, tools t
WHERE a.slug = 'organizer' AND t.name = 'ClickUp'
UNION ALL
SELECT a.id, t.id, false, 'Time blocking and calendar management', 6
FROM archetypes a, tools t
WHERE a.slug = 'organizer' AND t.name = 'Google Calendar'

-- Link tools to archetypes (Deep Diver)
UNION ALL
SELECT a.id, t.id, true, 'Knowledge graph for deep synthesis and connections', 1
FROM archetypes a, tools t
WHERE a.slug = 'deep-diver' AND t.name = 'Obsidian'
UNION ALL
SELECT a.id, t.id, true, 'Spaced repetition for long-term retention', 2
FROM archetypes a, tools t
WHERE a.slug = 'deep-diver' AND t.name = 'Anki'
UNION ALL
SELECT a.id, t.id, true, 'Mind mapping for conceptual connections', 3
FROM archetypes a, tools t
WHERE a.slug = 'deep-diver' AND t.name = 'MindMeister'
UNION ALL
SELECT a.id, t.id, false, 'AI-assisted research synthesis', 4
FROM archetypes a, tools t
WHERE a.slug = 'deep-diver' AND t.name = 'Notebook LM'
UNION ALL
SELECT a.id, t.id, false, 'Reference management and research organization', 5
FROM archetypes a, tools t
WHERE a.slug = 'deep-diver' AND t.name = 'Zotero'
UNION ALL
SELECT a.id, t.id, false, 'Note-taking with integrated spaced repetition', 6
FROM archetypes a, tools t
WHERE a.slug = 'deep-diver' AND t.name = 'RemNote'

-- Link tools to archetypes (Collaborator)
UNION ALL
SELECT a.id, t.id, true, 'Real-time collaborative writing', 1
FROM archetypes a, tools t
WHERE a.slug = 'collaborator' AND t.name = 'Google Docs'
UNION ALL
SELECT a.id, t.id, true, 'Shared whiteboard for group brainstorming', 2
FROM archetypes a, tools t
WHERE a.slug = 'collaborator' AND t.name = 'Miro'
UNION ALL
SELECT a.id, t.id, true, 'Team communication and coordination', 3
FROM archetypes a, tools t
WHERE a.slug = 'collaborator' AND t.name = 'Slack'
UNION ALL
SELECT a.id, t.id, false, 'Collaborative workspace and wikis', 4
FROM archetypes a, tools t
WHERE a.slug = 'collaborator' AND t.name = 'Notion'
UNION ALL
SELECT a.id, t.id, false, 'Asynchronous video feedback', 5
FROM archetypes a, tools t
WHERE a.slug = 'collaborator' AND t.name = 'Loom'
UNION ALL
SELECT a.id, t.id, false, 'Visual collaboration and design', 6
FROM archetypes a, tools t
WHERE a.slug = 'collaborator' AND t.name = 'Figma'

-- Link tools to archetypes (Adaptive Learner)
UNION ALL
SELECT a.id, t.id, true, 'Flexible workspace for adaptive learning', 1
FROM archetypes a, tools t
WHERE a.slug = 'adaptive-learner' AND t.name = 'Notion'
UNION ALL
SELECT a.id, t.id, true, 'AI tutor for personalized guidance', 2
FROM archetypes a, tools t
WHERE a.slug = 'adaptive-learner' AND t.name = 'ChatGPT'
UNION ALL
SELECT a.id, t.id, true, 'Visual adaptive mapping of concepts', 3
FROM archetypes a, tools t
WHERE a.slug = 'adaptive-learner' AND t.name = 'Miro'
UNION ALL
SELECT a.id, t.id, false, 'AI-driven content suggestions', 4
FROM archetypes a, tools t
WHERE a.slug = 'adaptive-learner' AND t.name = 'Tana'
UNION ALL
SELECT a.id, t.id, false, 'Visual networked note-taking', 5
FROM archetypes a, tools t
WHERE a.slug = 'adaptive-learner' AND t.name = 'Scrintal'
UNION ALL
SELECT a.id, t.id, false, 'Visual hierarchical organization', 6
FROM archetypes a, tools t
WHERE a.slug = 'adaptive-learner' AND t.name = 'Heptabase'

-- Link tools to archetypes (Reflective Thinker)
UNION ALL
SELECT a.id, t.id, true, 'Reflective journaling with synthesis', 1
FROM archetypes a, tools t
WHERE a.slug = 'reflective-thinker' AND t.name = 'Notebook LM'
UNION ALL
SELECT a.id, t.id, true, 'Cross-device journaling and reflection', 2
FROM archetypes a, tools t
WHERE a.slug = 'reflective-thinker' AND t.name = 'Evernote'
UNION ALL
SELECT a.id, t.id, true, 'Networked thinking for pattern recognition', 3
FROM archetypes a, tools t
WHERE a.slug = 'reflective-thinker' AND t.name = 'Roam Research'
UNION ALL
SELECT a.id, t.id, false, 'Dedicated journaling with mood tracking', 4
FROM archetypes a, tools t
WHERE a.slug = 'reflective-thinker' AND t.name = 'Day One'
UNION ALL
SELECT a.id, t.id, false, 'Lightweight journaling with mood tracking', 5
FROM archetypes a, tools t
WHERE a.slug = 'reflective-thinker' AND t.name = 'Diaro'
UNION ALL
SELECT a.id, t.id, false, 'Guided journaling with prompts', 6
FROM archetypes a, tools t
WHERE a.slug = 'reflective-thinker' AND t.name = 'Journey'
ON CONFLICT DO NOTHING;
