-- Create Resource Bank tables for tools, techniques, and archetype resources

-- Tools table
CREATE TABLE IF NOT EXISTS tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- e.g., "Task Management", "Note-Taking", "Collaboration"
  url TEXT,
  icon_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Techniques table
CREATE TABLE IF NOT EXISTS techniques (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- e.g., "Memory", "Time Management", "Metacognition"
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Archetype Tools mapping (many-to-many)
CREATE TABLE IF NOT EXISTS archetype_tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  archetype_id UUID REFERENCES archetypes(id) ON DELETE CASCADE,
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT false, -- true for top 3 tools
  justification TEXT, -- Why this tool is recommended for this archetype
  tool_order INTEGER, -- Order within archetype
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(archetype_id, tool_id)
);

-- Technique Tools mapping (many-to-many)
CREATE TABLE IF NOT EXISTS technique_tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  technique_id UUID REFERENCES techniques(id) ON DELETE CASCADE,
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(technique_id, tool_id)
);

-- Tool Tags for cross-filtering
CREATE TABLE IF NOT EXISTS tool_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  tag TEXT NOT NULL, -- e.g., "Spaced Repetition", "Time Blocking", "Collaboration"
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tool_id, tag)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_archetype_tools_archetype ON archetype_tools(archetype_id);
CREATE INDEX IF NOT EXISTS idx_archetype_tools_tool ON archetype_tools(tool_id);
CREATE INDEX IF NOT EXISTS idx_technique_tools_technique ON technique_tools(technique_id);
CREATE INDEX IF NOT EXISTS idx_technique_tools_tool ON technique_tools(tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_tags_tool ON tool_tags(tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_tags_tag ON tool_tags(tag);

-- Enable Row Level Security (RLS)
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE techniques ENABLE ROW LEVEL SECURITY;
ALTER TABLE archetype_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE technique_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_tags ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to tools"
  ON tools FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to techniques"
  ON techniques FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to archetype_tools"
  ON archetype_tools FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to technique_tools"
  ON technique_tools FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to tool_tags"
  ON tool_tags FOR SELECT
  USING (true);
