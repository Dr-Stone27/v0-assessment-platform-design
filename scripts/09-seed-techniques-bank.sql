-- Seed Techniques Bank with evidence-based learning techniques

-- Insert Techniques
INSERT INTO techniques (name, description, category) VALUES
-- Memory Techniques
('Spaced Repetition', 'Review material at increasing intervals to strengthen long-term memory retention. Based on the forgetting curve research by Ebbinghaus.', 'Memory'),
('Active Recall', 'Test yourself without looking at notes or materials. This strengthens memory pathways and improves retention more than passive review.', 'Memory'),
('Elaborative Interrogation', 'Ask yourself "why" and "how" questions about the material to create deeper understanding and connections.', 'Memory'),
('Dual Coding', 'Combine verbal and visual information to create multiple pathways for memory storage and retrieval.', 'Memory'),
('Method of Loci', 'Associate information with specific locations in a familiar place to create spatial memory cues.', 'Memory'),
('Peg System', 'Use a pre-memorized sequence of "pegs" to associate with new information for easier recall.', 'Memory'),

-- Time Management Techniques
('Pomodoro Technique', 'Work in focused 25-minute intervals followed by 5-minute breaks. After 4 pomodoros, take a longer 15-30 minute break.', 'Time Management'),
('Time Blocking', 'Schedule specific time slots for different tasks and activities to create structure and prevent procrastination.', 'Time Management'),
('Eisenhower Matrix', 'Categorize tasks by urgency and importance to prioritize effectively and focus on what matters most.', 'Time Management'),
('Two-Minute Rule', 'If a task takes less than two minutes, do it immediately rather than adding it to your to-do list.', 'Time Management'),
('Energy Management', 'Schedule demanding tasks during your peak energy hours and lighter tasks during low-energy periods.', 'Time Management'),

-- Metacognitive Techniques
('Metacognitive Journaling', 'Regularly reflect on your learning process, what strategies work best, and how you can improve your approach.', 'Metacognition'),
('Self-Explanation', 'Explain concepts out loud or in writing as if teaching someone else to identify gaps in understanding.', 'Metacognition'),
('Think-Aloud Protocol', 'Verbalize your thought process while solving problems to make your reasoning explicit and identify errors.', 'Metacognition'),
('Learning Logs', 'Keep a record of what you learned, how you learned it, and what strategies were most effective.', 'Metacognition'),
('Reflection Questions', 'Ask yourself specific questions about your learning: "What did I learn?", "How did I learn it?", "What would I do differently?"', 'Metacognition'),

-- Study Techniques
('Feynman Technique', 'Explain a concept in simple terms as if teaching a child, then identify gaps and simplify further.', 'Study Methods'),
('Cornell Note-Taking', 'Divide your page into three sections: notes, cues, and summary. Use the cue column for questions and keywords.', 'Study Methods'),
('Mind Mapping', 'Create visual diagrams that show relationships between concepts using branches, colors, and images.', 'Study Methods'),
('SQ3R Method', 'Survey, Question, Read, Recite, Review. A systematic approach to reading and studying textbooks.', 'Study Methods'),
('Chunking', 'Break large amounts of information into smaller, manageable chunks that are easier to process and remember.', 'Study Methods'),
('Interleaving', 'Mix different types of problems or subjects during study sessions rather than focusing on one topic at a time.', 'Study Methods'),

-- Critical Thinking Techniques
('Socratic Questioning', 'Ask a series of questions to explore ideas, challenge assumptions, and arrive at deeper understanding.', 'Critical Thinking'),
('Six Thinking Hats', 'Examine problems from six different perspectives: facts, emotions, negative, positive, creative, and control.', 'Critical Thinking'),
('Lateral Thinking', 'Approach problems from unexpected angles and challenge conventional assumptions to find creative solutions.', 'Critical Thinking'),
('Argument Mapping', 'Create visual diagrams that show the structure of arguments, including premises, conclusions, and logical connections.', 'Critical Thinking'),
('Devil''s Advocate', 'Intentionally argue against your own position to test the strength of your reasoning and identify weaknesses.', 'Critical Thinking'),

-- Collaboration Techniques
('Peer Teaching', 'Teach concepts to classmates to reinforce your own understanding and help others learn.', 'Collaboration'),
('Study Groups', 'Regular meetings with peers to discuss material, share notes, and work through problems together.', 'Collaboration'),
('Peer Review', 'Exchange work with classmates for feedback and constructive criticism before final submission.', 'Collaboration'),
('Jigsaw Method', 'Each group member becomes an expert on one topic, then teaches the others in the group.', 'Collaboration'),
('Think-Pair-Share', 'Think individually, discuss with a partner, then share ideas with the larger group.', 'Collaboration'),

-- Digital Learning Techniques
('Digital Flashcards', 'Use spaced repetition software like Anki or Quizlet to create and review digital flashcards.', 'Digital Learning'),
('Screen Recording', 'Record yourself explaining concepts or solving problems to review and identify areas for improvement.', 'Digital Learning'),
('Online Discussion Forums', 'Participate in course discussion boards to engage with material and learn from diverse perspectives.', 'Digital Learning'),
('Video Annotation', 'Take notes and highlight key points while watching educational videos to enhance engagement.', 'Digital Learning'),
('Digital Mind Mapping', 'Use software like MindMeister or XMind to create interactive, collaborative mind maps.', 'Digital Learning')
ON CONFLICT DO NOTHING;

-- Link techniques to tools (technique_tools mapping)
INSERT INTO technique_tools (technique_id, tool_id)
SELECT t.id, tools.id
FROM techniques t
CROSS JOIN tools
WHERE 
  -- Spaced Repetition tools
  (t.name = 'Spaced Repetition' AND tools.name IN ('Anki', 'RemNote', 'NeuraCache', 'Quizlet'))
  OR
  -- Active Recall tools
  (t.name = 'Active Recall' AND tools.name IN ('Anki', 'Obsidian', 'Quizlet'))
  OR
  -- Visual Mapping tools
  (t.name = 'Mind Mapping' AND tools.name IN ('Miro', 'MindMeister', 'Heptabase', 'Scrintal'))
  OR
  (t.name = 'Digital Mind Mapping' AND tools.name IN ('Miro', 'MindMeister', 'Heptabase', 'Scrintal'))
  OR
  -- Time Management tools
  (t.name = 'Pomodoro Technique' AND tools.name IN ('Forest', 'Pomofocus'))
  OR
  (t.name = 'Time Blocking' AND tools.name IN ('Google Calendar', 'Notion', 'Trello'))
  OR
  -- Note-Taking tools
  (t.name = 'Cornell Note-Taking' AND tools.name IN ('Notion', 'Evernote', 'Obsidian'))
  OR
  (t.name = 'Metacognitive Journaling' AND tools.name IN ('Day One', 'Roam Research', 'Evernote', 'Notion'))
  OR
  -- Collaboration tools
  (t.name = 'Study Groups' AND tools.name IN ('Google Docs', 'Miro', 'Slack', 'Discord'))
  OR
  (t.name = 'Peer Teaching' AND tools.name IN ('Google Docs', 'Loom', 'Miro'))
  OR
  (t.name = 'Peer Review' AND tools.name IN ('Google Docs', 'Loom', 'Miro'))
  OR
  -- Digital Learning tools
  (t.name = 'Digital Flashcards' AND tools.name IN ('Anki', 'Quizlet', 'NeuraCache'))
  OR
  (t.name = 'Screen Recording' AND tools.name IN ('Loom'))
  OR
  (t.name = 'Video Annotation' AND tools.name IN ('LiquidText', 'Notion'))
  OR
  -- AI-Powered Learning
  (t.name = 'Self-Explanation' AND tools.name IN ('ChatGPT', 'Claude', 'Gemini'))
  OR
  (t.name = 'Feynman Technique' AND tools.name IN ('ChatGPT', 'Claude', 'Gemini', 'Notebook LM'))
  OR
  (t.name = 'Socratic Questioning' AND tools.name IN ('ChatGPT', 'Claude', 'Gemini'))
ON CONFLICT DO NOTHING;
