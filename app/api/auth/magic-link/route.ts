import { NextResponse } from "next/server";
import { z } from "zod";
import { buildAppUrl, createAuthToken, isAllowedEmail } from "@/lib/auth";

const schema = z.object({
  email: z.email("Please provide a valid email."),
});

export async function POST(request: Request) {
  const parseResult = schema.safeParse(await request.json());
  if (!parseResult.success) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  const email = parseResult.data.email.trim().toLowerCase();
  if (!isAllowedEmail(email)) {
    return NextResponse.json({ ok: true });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.AUTH_FROM_EMAIL;
  if (!resendApiKey || !fromEmail) {
    console.warn("Magic link requested but RESEND_API_KEY or AUTH_FROM_EMAIL is missing.");
    return NextResponse.json({ ok: true });
  }

  const token = createAuthToken("magic", email, 15 * 60);
  const appUrl = buildAppUrl(request);
  const verifyUrl = `${appUrl}/api/auth/verify?token=${encodeURIComponent(token)}`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [email],
      subject: "Teacher Tools - Login link",
      html: `<p>Click to access Teacher Tools:</p><p><a href=\"${verifyUrl}\">Open private tools</a></p><p>This link expires in 15 minutes.</p>`,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("Failed to send magic link", response.status, body);
    return NextResponse.json(
      { error: "Could not send login email. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
