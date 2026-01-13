import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  getAssessmentResultBySessionId,
  markReportEmailAsSent,
} from "@/lib/supabase/assessment-results";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Get the assessment result
    const result = await getAssessmentResultBySessionId(sessionId);

    if (!result) {
      return NextResponse.json(
        { error: "Assessment result not found" },
        { status: 404 }
      );
    }

    // Verify the result belongs to the authenticated user
    if (result.user_id !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (!resend) {
      return NextResponse.json(
        {
          error:
            "Email service not configured. Please add RESEND_API_KEY to environment variables.",
        },
        { status: 500 }
      );
    }

    // Prepare email content
    const emailHtml = generateEmailHTML(result, user);

    // Send email
    const { data, error } = await resend.emails.send({
      from: "Learning Archetype <noreply@yourdomain.com>", // Update with your domain
      to: [user.email!],
      subject: `Your Learning Archetype Results - ${result.primary_archetype}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    // Mark email as sent
    await markReportEmailAsSent(sessionId);

    return NextResponse.json({
      success: true,
      messageId: data?.id,
    });
  } catch (error) {
    console.error("Error in send-report API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function generateEmailHTML(result: any, user: any): string {
  const userName =
    user.user_metadata?.full_name || user.email?.split("@")[0] || "there";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Learning Archetype Results</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: white;
      border-radius: 8px;
      padding: 40px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      color: white;
    }
    h1 {
      color: #1a1a1a;
      margin: 0 0 10px 0;
      font-size: 28px;
    }
    .archetype-badge {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 8px 20px;
      border-radius: 20px;
      font-weight: 600;
      margin: 20px 0;
    }
    .score {
      font-size: 18px;
      color: #666;
      margin: 10px 0;
    }
    .section {
      margin: 30px 0;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 8px;
    }
    .section h2 {
      margin-top: 0;
      color: #1a1a1a;
      font-size: 20px;
    }
    .metric {
      margin: 15px 0;
    }
    .metric-name {
      font-weight: 600;
      color: #333;
    }
    .metric-value {
      color: #667eea;
      font-weight: 600;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 14px 30px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🧠</div>
      <h1>Your Learning Archetype Results</h1>
      <p>Hi ${userName}! Here are your personalized learning assessment results.</p>
    </div>

    <div style="text-align: center;">
      <div class="archetype-badge">${result.primary_archetype}</div>
      <div class="score">Primary Archetype Match: ${
        result.primary_archetype_fit_score
      }%</div>
    </div>

    <div class="section">
      <h2>🎯 Your Profile Summary</h2>
      <p><strong>Primary Archetype:</strong> ${result.primary_archetype} (${
    result.primary_archetype_fit_score
  }% match)</p>
      <p><strong>Secondary Archetype:</strong> ${result.secondary_archetype} (${
    result.secondary_archetype_fit_score
  }% match)</p>
      <p><strong>Mindset:</strong> ${
        result.mindset_type.charAt(0).toUpperCase() +
        result.mindset_type.slice(1)
      } (Score: ${result.mindset_score > 0 ? "+" : ""}${
    result.mindset_score
  })</p>
    </div>

    <div class="section">
      <h2>📊 Your Demographics</h2>
      <p><strong>Year of Study:</strong> ${result.year_of_study}</p>
      <p><strong>Faculty:</strong> ${result.faculty}</p>
      <p><strong>Course Load:</strong> ${result.course_load}</p>
    </div>

    ${
      result.personalized_report
        ? `
    <div class="section">
      <h2>💡 Key Insights</h2>
      ${
        result.personalized_report.overview
          ? `<p>${result.personalized_report.overview.profileSummary}</p>`
          : ""
      }
    </div>
    `
        : ""
    }

    <div style="text-align: center;">
      <a href="${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/assessment/results" class="button">
        View Full Results
      </a>
    </div>

    <div class="footer">
      <p>This assessment was completed on ${new Date(
        result.created_at
      ).toLocaleDateString()}</p>
      <p>Session ID: ${result.session_id}</p>
      <p style="margin-top: 20px;">
        <a href="${
          process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
        }/resources" style="color: #667eea; text-decoration: none;">
          Explore Learning Resources →
        </a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}
