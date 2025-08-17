import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    // SMTP ayarları (Outlook/Office 365 uyumlu). Ortam değişkenlerinden alın.
    const host = process.env.SMTP_HOST || "smtp-mail.outlook.com"; // Outlook SMTP
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER || "info@lightspeedtransport.ch";
    const pass = process.env.SMTP_PASS || "";

    if (!pass) {
      return NextResponse.json({ ok: false, error: "Server email not configured" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const toAddress = "info@lightspeedtransport.ch";

    await transporter.sendMail({
      from: user,
      to: toAddress,
      replyTo: email,
      subject: `New contact from ${name}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message.replace(/\n/g, "<br/>")}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}


