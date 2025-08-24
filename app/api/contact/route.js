import { Resend } from 'resend';

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const data = await request.json();
    const { firstName, lastName, email, phone, message } = data || {};
    
    if (!firstName || !lastName || !email || !message) {
      return Response.json({ ok: false, error: "Champs manquants" }, { status: 400 });
    }

    // Log du message pour traçabilité
    console.log("[CONTACT] Nouveau message:", {
      firstName,
      lastName,
      email,
      phone,
      at: new Date().toISOString(),
    });

    // Configuration Resend avec la vraie clé API
    const resend = new Resend('re_MB4wYLT7_7vVHxxGCVMH3EhGKmk4fXpa9');

    // Envoi de l'email
    const { data: emailData, error } = await resend.emails.send({
      from: 'Site Web <onboarding@resend.dev>',
      to: ['sacha.nahum@gmail.com'],
      subject: `Nouveau contact: ${firstName} ${lastName}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${lastName}</p>
        <p><strong>Prénom:</strong> ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${phone || "-"}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Envoyé depuis le site web le ${new Date().toLocaleString('fr-FR')}</em></p>
      `,
      text: `Nom: ${lastName}\nPrénom: ${firstName}\nEmail: ${email}\nTéléphone: ${phone || "-"}\n\nMessage:\n${message}`,
      replyTo: email
    });

    if (error) {
      console.error("[CONTACT] Erreur Resend:", error);
      return Response.json({ ok: false, error: "Erreur d'envoi d'email" }, { status: 500 });
    }

    console.log("[CONTACT] Email envoyé avec succès:", emailData);
    return Response.json({ ok: true, message: "Email envoyé avec succès" });

  } catch (err) {
    console.error("[CONTACT] Erreur:", err);
    return Response.json({ ok: false, error: "Erreur serveur" }, { status: 500 });
  }
}
