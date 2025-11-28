import { createClient } from "@/lib/supabase/client";
import type {
  CompleteProfile,
  Demographics,
  QuestionResponse,
} from "@/lib/types";

export interface SaveAssessmentResultParams {
  profile: CompleteProfile;
  demographics: Demographics;
  responses: QuestionResponse[];
  personalizedReport?: any;
}

export async function saveAssessmentResultToDatabase(
  params: SaveAssessmentResultParams
) {
  const supabase = createClient();

  // Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User must be authenticated to save results");
  }

  const { profile, demographics, responses, personalizedReport } = params;

  // Prepare the data for insertion
  const assessmentData = {
    user_id: user.id,
    session_id: profile.sessionId,

    // Demographics
    year_of_study: demographics.yearOfStudy,
    faculty: demographics.faculty,
    course_load: demographics.courseLoad,

    // Layer 1: Detailed Metrics
    detailed_metrics: profile.layer1_detailedMetrics,

    // Layer 2: Mindset
    mindset_type: profile.layer2_mindset.type,
    mindset_score: profile.layer2_mindset.score,

    // Layer 3: Study Styles
    study_styles: profile.layer3_studyStyles,

    // Layer 4: Archetype
    primary_archetype: profile.layer4_archetype.primary.name,
    primary_archetype_fit_score: profile.layer4_archetype.primary.fitScore,
    secondary_archetype: profile.layer4_archetype.secondary.name,
    secondary_archetype_fit_score: profile.layer4_archetype.secondary.fitScore,

    // Persona
    persona_identity: profile.personaIdentity,

    // Responses
    responses: responses,

    // Personalized Report (if available)
    personalized_report: personalizedReport || null,

    // Metadata
    calculated_at: profile.calculatedAt,
  };

  // Insert or update the assessment result
  const { data, error } = await supabase
    .from("assessment_results")
    .upsert(assessmentData, {
      onConflict: "session_id",
    })
    .select()
    .single();

  if (error) {
    console.error("Error saving assessment result:", error);
    throw error;
  }

  return data;
}

export async function getUserAssessmentResults(userId?: string) {
  const supabase = createClient();

  let queryUserId = userId;

  if (!queryUserId) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    queryUserId = user?.id;
  }

  if (!queryUserId) {
    return [];
  }

  const { data, error } = await supabase
    .from("assessment_results")
    .select("*")
    .eq("user_id", queryUserId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching assessment results:", error);
    return [];
  }

  return data;
}

export async function getAssessmentResultBySessionId(sessionId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("assessment_results")
    .select("*")
    .eq("session_id", sessionId)
    .single();

  if (error) {
    console.error("Error fetching assessment result:", error);
    return null;
  }

  return data;
}

export async function markReportEmailAsSent(sessionId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("assessment_results")
    .update({
      report_email_sent: true,
      report_email_sent_at: new Date().toISOString(),
    })
    .eq("session_id", sessionId);

  if (error) {
    console.error("Error marking email as sent:", error);
    throw error;
  }
}
