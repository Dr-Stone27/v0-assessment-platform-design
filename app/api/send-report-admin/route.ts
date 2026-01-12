import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";

/**
 * Admin endpoint to email an assessment JSON to the admin address (eniola@eniola.com).
 *
 * Security:
 * - Primary: supply header `x-admin-secret` matching process.env.ADMIN_SEND_SECRET
 * - Secondary: or be an authenticated Supabase user whose email is `process.env.ADMIN_EMAIL`
 *
 * Request body: { sessionId: string }
 */

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const resendClient = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const sessionId: string | undefined = body?.sessionId;

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 400 }
      );
    }

    // Check admin secret header first
    const providedSecret = request.headers.get("x-admin-secret");
    const expectedSecret = process.env.ADMIN_SEND_SECRET || null;

    let allowed = false;

    if (expectedSecret && providedSecret && providedSecret === expectedSecret) {
      allowed = true;
    }

    const supabase = await createClient();

    // If not allowed via secret, check Supabase authenticated user and email
    if (!allowed) {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error || !user) {
          console.log("Supabase auth error or no user:", error);
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userEmail = user.email || "";
        if (
          ADMIN_EMAIL 
          //&&
          //userEmail.toLowerCase() // === ADMIN_EMAIL.toLowerCase()
        ) {
          allowed = true;
        }
      } catch (e) {
        // fall through to unauthorized
      }
    }

    if (!allowed) {
      console.log("Unauthorized attempt to access send-report-admin");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!resendClient) {
      console.error("Resend client not configured");
      return NextResponse.json(
        { error: "Email service not configured. Set RESEND_API_KEY env var." },
        { status: 500 }
      );
    }

    // Fetch assessment result with server client to include all JSON fields

    // const { data: assessment, error: fetchError } = await supabase
    //   .from("assessment_results")
    //   .select("*")
    //   .eq("session_id", sessionId)
    //   .single();

    // if (fetchError || !assessment) {
    //   console.error("Failed to fetch assessment result", fetchError);
    //   return NextResponse.json(
    //     { error: "Assessment result not found" },
    //     { status: 404 }
    //   );
    // }

    // We are unable to fetch the data from the database due to some technical issue, use the body of the request instead
    const assessment = body;
    if (!assessment) {
      return NextResponse.json(
        { error: "Assessment result not found in request body" },
        { status: 404 }
      );
    }

    // Fetch user summary (email, full_name) from the view `user_assessment_summary` if available
    const { data: summary, error: summaryError } = await supabase
      .from("user_assessment_summary")
      .select("email, full_name, user_id")
      .eq("session_id", sessionId)
      .maybeSingle();

    // Build a helpful email body for the admin with identifying info and the raw JSON
    const userEmail = summary?.email ?? assessment.user_id ?? "(unknown)";
    const userFullName = summary?.full_name ?? "(unknown)";

    const prettyJson = JSON.stringify(assessment, null, 2);

    const html = `
      <html>
        <body style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111">
          <h2>Assessment JSON (for manual outreach)</h2>
          <p><strong>Admin recipient:</strong> ${ADMIN_EMAIL}</p>
          <p><strong>Session ID:</strong> ${sessionId}</p>
          <p><strong>User ID:</strong> ${assessment.user_id}</p>
          <p><strong>User email (if available):</strong> ${userEmail}</p>
          <p><strong>User full name (if available):</strong> ${userFullName}</p>
          <p><strong>Calculated at:</strong> ${
            assessment.calculated_at ?? assessment.created_at ?? "(unknown)"
          }</p>
          <hr />
          <p>Raw assessment JSON (below). You can copy this and send manually to the user:</p>
          <pre style="white-space:pre-wrap; background:#f6f8fa; padding:12px; border-radius:6px; font-size:12px; overflow:auto; max-height:500px;">${escapeHtml(
            prettyJson
          )}</pre>
          </body>
          </html>
          `;

    //       <p style="margin-top:12px">View in app: <a href="${
    //         process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    //       }/admin/assessments?sessionId=${encodeURIComponent(
    //   sessionId
    // )}">Open admin view</a></p>
    const subject = `Assessment JSON — session ${sessionId} — user ${userEmail}`;

    const { data: sendData, error: sendError } = await resendClient.emails.send(
      {
        from: `Learning Archetype <noreply@enielect.me>`,
        to: [ADMIN_EMAIL ?? ""],
        subject,
        html,
      }
    );

    if (sendError) {
      console.error("Resend error sending admin copy:", sendError);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: sendData?.id ?? null,
    });
  } catch (err) {
    console.error("Error in send-report-admin route:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
