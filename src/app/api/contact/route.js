import { Resend } from "resend";
import { resolve4, resolve6, resolveMx } from "node:dns/promises";

export const runtime = "nodejs";

function escapeHtml(input) {
  return String(input)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function toManifestHtml({ name, email, subject, message }) {
  return `
    <div style="background:#fdf6e3;padding:24px;font-family:'Be Vietnam Pro',Arial,sans-serif;color:#322f22;">
      <div style="max-width:700px;margin:0 auto;border:2px dashed #7b7767;background:#fff;padding:20px;">
        <h2 style="margin:0 0 12px;font-family:'Space Grotesk',Arial,sans-serif;letter-spacing:0.08em;text-transform:uppercase;">Technical Manifest // Contact Channel</h2>
        <p style="margin:8px 0;"><strong>LOG_START:</strong> ${escapeHtml(name || "UNKNOWN")}</p>
        <p style="margin:8px 0;"><strong>SENDER:</strong> ${escapeHtml(email || "UNSPECIFIED")}</p>
        <p style="margin:8px 0;"><strong>SUBJECT:</strong> ${escapeHtml(subject || "GENERAL_INQUIRY")}</p>
        <div style="margin-top:14px;padding-top:12px;border-top:1px solid #7b7767;">
          <p style="margin:0 0 8px;"><strong>MESSAGE:</strong></p>
          <pre style="white-space:pre-wrap;line-height:1.6;margin:0;background:#fdf6e3;border:1px solid #7b7767;padding:12px;">${escapeHtml(message || "[EMPTY]")}</pre>
        </div>
        <p style="margin:14px 0 0;font-size:12px;color:#5f5b4d;"><strong>LOG_END:</strong> ${new Date().toISOString()}</p>
      </div>
    </div>
  `;
}

async function hasMailCapableDomain(domain) {
  const timeout = (ms) =>
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error("DNS lookup timeout")), ms);
    });

  try {
    const mx = await Promise.race([resolveMx(domain), timeout(3000)]);
    if (Array.isArray(mx) && mx.length > 0) {
      return true;
    }
  } catch {
    // Fallback checks below.
  }

  try {
    const a = await Promise.race([resolve4(domain), timeout(3000)]);
    if (Array.isArray(a) && a.length > 0) {
      return true;
    }
  } catch {
    // Continue fallback chain.
  }

  try {
    const aaaa = await Promise.race([resolve6(domain), timeout(3000)]);
    return Array.isArray(aaaa) && aaaa.length > 0;
  } catch {
    return false;
  }
}

async function isLikelyValidSenderEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }

  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) {
    return false;
  }

  if (localPart.length > 64 || email.length > 254) {
    return false;
  }

  if (domain.startsWith("-") || domain.endsWith("-") || domain.includes("..")) {
    return false;
  }

  return hasMailCapableDomain(domain.toLowerCase());
}

export async function POST(request) {
  try {
    const apiKey = String(process.env.RESEND_API_KEY || "").trim();
    const receiverEmail = String(process.env.CONTACT_RECEIVER_EMAIL || "").trim();

    if (!apiKey || !receiverEmail) {
      return Response.json(
        {
          success: false,
          error:
            "Server email environment is not configured. Required: RESEND_API_KEY and CONTACT_RECEIVER_EMAIL.",
        },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);

    const body = await request.json();
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const subject = String(body?.subject || "").trim();
    const message = String(body?.message || "").trim();

    if (!name || !email || !subject || !message) {
      return Response.json(
        { success: false, error: "Name, email, subject, and message are required." },
        { status: 400 },
      );
    }

    const senderIsValid = await isLikelyValidSenderEmail(email);
    if (!senderIsValid) {
      return Response.json(
        { success: false, error: "Use a valid, existing email address." },
        { status: 400 },
      );
    }

    const manifestHtml = toManifestHtml({ name, email, subject, message });

    const { error: resendError } = await resend.emails.send({
      from: "Portfolio Lab <onboarding@resend.dev>",
      to: [receiverEmail],
      subject: `[Field Report] ${subject}`,
      html: manifestHtml,
      replyTo: email,
    });

    if (resendError) {
      return Response.json(
        {
          success: false,
          error: `Email service error: ${resendError.message || "Unable to send."}`,
        },
        { status: 502 },
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact route error", error);
    return Response.json(
      { success: false, error: "Unable to send message right now." },
      { status: 500 },
    );
  }
}
