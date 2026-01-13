-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create assessment_results table to store user assessment data
CREATE TABLE IF NOT EXISTS public.assessment_results (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    session_id TEXT NOT NULL UNIQUE,
    
    -- Demographics
    year_of_study TEXT NOT NULL,
    faculty TEXT NOT NULL,
    course_load TEXT NOT NULL,
    
    -- Layer 1: Detailed Metrics (JSONB for flexibility)
    detailed_metrics JSONB NOT NULL,
    
    -- Layer 2: Mindset
    mindset_type TEXT NOT NULL,
    mindset_score INTEGER NOT NULL,
    
    -- Layer 3: Study Styles (JSONB)
    study_styles JSONB NOT NULL,
    
    -- Layer 4: Archetype
    primary_archetype TEXT NOT NULL,
    primary_archetype_fit_score NUMERIC(5,2) NOT NULL,
    secondary_archetype TEXT NOT NULL,
    secondary_archetype_fit_score NUMERIC(5,2) NOT NULL,
    
    -- Persona
    persona_identity TEXT NOT NULL,
    
    -- Responses (store all question responses)
    responses JSONB NOT NULL,
    
    -- Personalized Report (if generated)
    personalized_report JSONB,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    calculated_at TIMESTAMP WITH TIME ZONE NOT NULL,
    
    -- Email sent tracking
    report_email_sent BOOLEAN DEFAULT FALSE,
    report_email_sent_at TIMESTAMP WITH TIME ZONE
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_assessment_results_user_id ON public.assessment_results(user_id);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_assessment_results_created_at ON public.assessment_results(created_at DESC);

-- Create index on session_id for quick lookups
CREATE INDEX IF NOT EXISTS idx_assessment_results_session_id ON public.assessment_results(session_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Users can only read their own assessment results
CREATE POLICY "Users can view own assessment results"
    ON public.assessment_results
    FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert their own assessment results
CREATE POLICY "Users can insert own assessment results"
    ON public.assessment_results
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own assessment results
CREATE POLICY "Users can update own assessment results"
    ON public.assessment_results
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Users can delete their own assessment results
CREATE POLICY "Users can delete own assessment results"
    ON public.assessment_results
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_assessment_results_updated_at
    BEFORE UPDATE ON public.assessment_results
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create a view for easy access to user assessment summaries
CREATE OR REPLACE VIEW public.user_assessment_summary AS
SELECT 
    ar.id,
    ar.user_id,
    ar.session_id,
    ar.primary_archetype,
    ar.primary_archetype_fit_score,
    ar.secondary_archetype,
    ar.mindset_type,
    ar.created_at,
    ar.report_email_sent,
    u.email,
    u.raw_user_meta_data->>'full_name' as full_name
FROM public.assessment_results ar
JOIN auth.users u ON ar.user_id = u.id;

-- Grant access to the view
GRANT SELECT ON public.user_assessment_summary TO authenticated;
