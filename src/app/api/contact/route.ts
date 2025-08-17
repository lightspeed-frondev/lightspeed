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

    // Eksik ortam değişkeni kontrolü
    const missing: string[] = [];
    if (!host) missing.push("SMTP_HOST");
    if (!port) missing.push("SMTP_PORT");
    if (!user) missing.push("SMTP_USER");
    if (!pass) missing.push("SMTP_PASS");
    if (missing.length) {
      return NextResponse.json(
        { ok: false, error: `Missing env: ${missing.join(", ")}` },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      requireTLS: port === 587,
      auth: { user, pass },
    });

    const toAddress = "info@lightspeedtransport.ch";

    // Bağlantıyı doğrula (hata mesajını erken yakalamak için)
    try {
      await transporter.verify();
    } catch (err: any) {
      console.error("SMTP verify failed", err);
      return NextResponse.json(
        { ok: false, error: `SMTP verify failed: ${err?.message || "unknown"}` },
        { status: 500 }
      );
    }

    await transporter.sendMail({
      from: `Website Contact <${user}>`,
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
    console.error("/api/contact error", error);
    const err = error as any;
    return NextResponse.json({ ok: false, error: err?.message || "Internal error" }, { status: 500 });
  }
}


