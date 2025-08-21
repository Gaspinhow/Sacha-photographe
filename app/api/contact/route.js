import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const data = await request.json();
    const { firstName, lastName, email, phone, message } = data || {};
    if (!firstName || !lastName || !email || !message) {
      return Response.json({ ok: false, error: "Champs manquants" }, { status: 400 });
    }

    // Always log on the server for traceability
    console.log("[CONTACT] Nouveau message:", {
      firstName,
      lastName,
      email,
      phone,
      at: new Date().toISOString(),
    });

    let previewUrl = null;

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, SMTP_TO } = process.env;

    let transporter;
    if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });
    } else {
      // Fallback to Ethereal test account for local testing
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
    }

    const to = SMTP_TO || "sacha.nahum@gmail.com";
    const from = SMTP_FROM || (SMTP_USER ? `"Site Web" <${SMTP_USER}>` : '"Site Web (test)" <no-reply@example.com>');
    const subject = `Nouveau contact: ${firstName} ${lastName}`;
    const text = `Nom: ${lastName}\nPrénom: ${firstName}\nEmail: ${email}\nTéléphone: ${phone || "-"}\n\nMessage:\n${message}`;

    const info = await transporter.sendMail({ from, to, subject, text, replyTo: email });

    if (nodemailer.getTestMessageUrl && info) {
      const url = nodemailer.getTestMessageUrl(info);
      if (url) previewUrl = url;
    }

    return Response.json({ ok: true, previewUrl });
  } catch (err) {
    console.error("[CONTACT] Erreur:", err);
    return Response.json({ ok: false, error: "Requête invalide" }, { status: 400 });
  }
}
