import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/constants/landing";
import { contactSchema } from "@/services/contact";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Some fields are missing or invalid." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact API: RESEND_API_KEY is not set.");
    return NextResponse.json(
      { error: "The email service is not configured yet." },
      { status: 503 }
    );
  }

  // `from` defaults to Resend's shared sender so only RESEND_API_KEY is
  // required. Set CONTACT_FROM_EMAIL to a verified-domain address for
  // production delivery.
  const fromAddress =
    process.env.CONTACT_FROM_EMAIL ??
    "Maaloomatiia Academy <onboarding@resend.dev>";

  const { name, email, company, message } = parsed.data;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Website enquiry — ${name}, ${company}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Contact API: Resend rejected the request.", error);
      return NextResponse.json(
        { error: "Your message could not be sent." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (cause) {
    console.error("Contact API: unexpected failure.", cause);
    return NextResponse.json(
      { error: "Your message could not be sent." },
      { status: 500 }
    );
  }
}
