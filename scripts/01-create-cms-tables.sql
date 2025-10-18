-- Create CMS tables for archetype content management

-- Archetypes table
CREATE TABLE IF NOT EXISTS archetypes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  core_philosophy TEXT NOT NULL,
  defining_traits JSONB NOT NULL, -- Array of trait strings
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Interaction Stories table
CREATE TABLE IF NOT EXISTS interaction_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  archetype_id UUID REFERENCES archetypes(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  narrative TEXT NOT NULL,
  metrics_in_play JSONB NOT NULL, -- {metric1: "high/low", metric2: "high/low"}
  story_order INTEGER NOT NULL, -- 1 or 2 for each archetype
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Growth Strategies table
CREATE TABLE IF NOT EXISTS growth_strategies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  archetype_id UUID REFERENCES archetypes(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  strategy_text TEXT NOT NULL,
  metrics_addressed JSONB NOT NULL, -- Array of metric names
  context_filters JSONB NOT NULL, -- {years: [], faculties: [], courseLoads: []}
  strategy_order INTEGER NOT NULL, -- 1-6 for each archetype
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Metric Strengths/Weaknesses descriptions by archetype
CREATE TABLE IF NOT EXISTS archetype_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  archetype_id UUID REFERENCES archetypes(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  is_strength BOOLEAN NOT NULL, -- true for strength, false for development area
  level TEXT NOT NULL, -- "High", "Moderate to High", "Moderate", "Moderate to Low", "Low"
  behavior_description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(archetype_id, metric_name)
);

-- Common challenges by archetype
CREATE TABLE IF NOT EXISTS archetype_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  archetype_id UUID REFERENCES archetypes(id) ON DELETE CASCADE,
  challenge_title TEXT NOT NULL,
  challenge_description TEXT NOT NULL,
  challenge_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_interaction_stories_archetype ON interaction_stories(archetype_id);
CREATE INDEX IF NOT EXISTS idx_growth_strategies_archetype ON growth_strategies(archetype_id);
CREATE INDEX IF NOT EXISTS idx_archetype_metrics_archetype ON archetype_metrics(archetype_id);
CREATE INDEX IF NOT EXISTS idx_archetype_challenges_archetype ON archetype_challenges(archetype_id);

-- Enable Row Level Security (RLS)
ALTER TABLE archetypes ENABLE ROW LEVEL SECURITY;
ALTER TABLE interaction_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE growth_strategies ENABLE ROW LEVEL SECURITY;
ALTER TABLE archetype_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE archetype_challenges ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (content is public)
CREATE POLICY "Allow public read access to archetypes"
  ON archetypes FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to interaction_stories"
  ON interaction_stories FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to growth_strategies"
  ON growth_strategies FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to archetype_metrics"
  ON archetype_metrics FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to archetype_challenges"
  ON archetype_challenges FOR SELECT
  USING (true);
