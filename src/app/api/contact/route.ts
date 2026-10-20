import { NextResponse } from "next/server";
import { Resend } from "resend";

// Simple in-memory rate limiting to prevent spam and protect Resend quota
// Maps IP address -> array of request timestamps (epoch ms)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Periodically clean up stale entries (every 100 calls or when map grows)
function cleanupStaleEntries(now: number) {
  if (rateLimitMap.size > 500) {
    for (const [ip, timestamps] of rateLimitMap.entries()) {
      const active = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (active.length === 0) {
        rateLimitMap.delete(ip);
      } else {
        rateLimitMap.set(ip, active);
      }
    }
  }
}

// Basic HTML entity escaping to prevent markup injection in HTML emails
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    // 1. IP Rate Limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const clientIp = forwarded ? forwarded.split(",")[0].trim() : realIp || "127.0.0.1";

    const now = Date.now();
    cleanupStaleEntries(now);

    const clientTimestamps = (rateLimitMap.get(clientIp) || []).filter(
      (t) => now - t < RATE_LIMIT_WINDOW_MS
    );

    if (clientTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        {
          error:
            "Too many messages sent from this connection. Please wait a few minutes before trying again.",
        },
        { status: 429 }
      );
    }

    // 2. Parse & Validate Payload
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
    }

    const { name, email, topic, message, honeypot } = body || {};

    // Silent honeypot check (catches automated bots filling hidden inputs)
    if (honeypot && typeof honeypot === "string" && honeypot.trim().length > 0) {
      return NextResponse.json({ success: true, messageId: "bot_filtered" });
    }

    // Field presence and types
    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
      return NextResponse.json(
        { error: "Please provide a valid name, email address, and message." },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanTopic = typeof topic === "string" && topic.trim().length > 0 ? topic.trim() : "General";
    const cleanMessage = message.trim();

    // Field length & format validation
    if (cleanName.length < 2 || cleanName.length > 100) {
      return NextResponse.json(
        { error: "Name must be between 2 and 100 characters." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (cleanEmail.length > 254 || !emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address (e.g., name@example.com)." },
        { status: 400 }
      );
    }

    if (cleanTopic.length > 100) {
      return NextResponse.json(
        { error: "Topic title cannot exceed 100 characters." },
        { status: 400 }
      );
    }

    if (cleanMessage.length < 10) {
      return NextResponse.json(
        { error: "Message is too short. Please provide at least 10 characters." },
        { status: 400 }
      );
    }

    if (cleanMessage.length > 3000) {
      return NextResponse.json(
        { error: "Message exceeds maximum allowed length of 3,000 characters." },
        { status: 400 }
      );
    }

    // 3. Check Resend configuration
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[Resend Config] Missing RESEND_API_KEY environment variable.");
      return NextResponse.json(
        {
          error:
            "Email service is not configured yet. Please reach out directly at mallikarjunalyal262@gmail.com.",
        },
        { status: 503 }
      );
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || "mallikarjunalyal262@gmail.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    // 4. Dispatch Email via Resend SDK
    const resend = new Resend(apiKey);

    const safeName = escapeHtml(cleanName);
    const safeEmail = escapeHtml(cleanEmail);
    const safeTopic = escapeHtml(cleanTopic);
    const safeMessage = escapeHtml(cleanMessage).replace(/\n/g, "<br/>");

    const emailSubject = `[Portfolio Connect] ${cleanTopic} from ${cleanName}`;
    const plainText = `You received a new message from your portfolio contact form:

From: ${cleanName} (${cleanEmail})
Topic: ${cleanTopic}

Message:
${cleanMessage}

---
Reply directly to this email to respond to ${cleanName}.`;

    const htmlBody = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(emailSubject)}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #05070d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #E8EEF5;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #05070d; padding: 40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width: 600px; background-color: #0b0f19; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; overflow: hidden;">
            <!-- Header -->
            <tr>
              <td style="padding: 24px 32px; background: linear-gradient(135deg, #121d38 0%, #0b0f19 100%); border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                <div style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #8F7CFF; margin-bottom: 6px; font-weight: 600;">
                  Portfolio Contact Notification
                </div>
                <h1 style="margin: 0; font-size: 20px; font-weight: 600; color: #FFFFFF;">
                  New Message: ${safeTopic}
                </h1>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding: 28px 32px;">
                <!-- Sender Info Card -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 8px; margin-bottom: 24px;">
                  <tr>
                    <td style="padding: 16px 20px;">
                      <div style="margin-bottom: 8px;">
                        <span style="font-size: 12px; color: #738499; text-transform: uppercase; letter-spacing: 0.05em;">Sender:</span>
                        <strong style="color: #FFFFFF; font-size: 15px; margin-left: 8px;">${safeName}</strong>
                      </div>
                      <div style="margin-bottom: 8px;">
                        <span style="font-size: 12px; color: #738499; text-transform: uppercase; letter-spacing: 0.05em;">Email:</span>
                        <a href="mailto:${safeEmail}" style="color: #5FA5F9; font-size: 14px; margin-left: 8px; text-decoration: none;">${safeEmail}</a>
                      </div>
                      <div>
                        <span style="font-size: 12px; color: #738499; text-transform: uppercase; letter-spacing: 0.05em;">Topic:</span>
                        <span style="color: #A3B3C7; font-size: 14px; margin-left: 8px;">${safeTopic}</span>
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Message Box -->
                <div style="font-size: 12px; color: #738499; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">
                  Message:
                </div>
                <div style="background-color: #05070d; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 8px; padding: 20px; line-height: 1.65; color: #D1D9E0; font-size: 14px;">
                  ${safeMessage}
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 20px 32px; background-color: #080b12; border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center;">
                <p style="margin: 0; font-size: 12px; color: #738499; line-height: 1.5;">
                  Reply directly to this email to respond to <strong style="color: #A3B3C7;">${safeName}</strong> (<a href="mailto:${safeEmail}" style="color: #5FA5F9; text-decoration: none;">${safeEmail}</a>).
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: cleanEmail,
      subject: emailSubject,
      text: plainText,
      html: htmlBody,
    });

    if (error) {
      console.error("[Resend Error]", error.name, error.message);
      return NextResponse.json(
        {
          error:
            error.message ||
            "The email delivery provider rejected the message. Please contact directly via email.",
        },
        { status: 502 }
      );
    }

    // Record timestamp for rate limiting only on success
    clientTimestamps.push(now);
    rateLimitMap.set(clientIp, clientTimestamps);

    return NextResponse.json({
      success: true,
      messageId: data?.id,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal Server Error";
    console.error("[Contact API Exception]", errorMsg);
    return NextResponse.json(
      {
        error:
          "An unexpected server error occurred while sending your message. Please try again or email directly.",
      },
      { status: 500 }
    );
  }
}
