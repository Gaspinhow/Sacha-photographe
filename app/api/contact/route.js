import { Resend } from 'resend';

export const dynamic = "force-dynamic";

// ✅ On utilise la variable d'environnement pour ne pas exposer la clé en clair
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const data = await request.json();
    const { firstName, lastName, email, phone, message } = data || {};
    
    if (!firstName || !lastName || !email || !message) {
      return Response.json({ ok: false, error: "Champs manquants" }, { status: 400 });
    }

    // Envoi de l'email avec style "Noir Pur" 
    const { data: emailData, error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: ['sacha.nahum@gmail.com'], // Email de destination [cite: 51]
      subject: `CONTACT : ${firstName} ${lastName}`,
      replyTo: email,
      html: `
        <div style="font-family: serif; color: #000000; line-height: 1.6; max-width: 600px;">
          <h2 style="text-transform: uppercase; letter-spacing: 0.2em; border-bottom: 1px solid #000; padding-bottom: 10px;">
            Nouveau Message de Contact
          </h2>
          <p><strong>Nom :</strong> ${lastName}</p>
          <p><strong>Prénom :</strong> ${firstName}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Téléphone :</strong> ${phone || "-"}</p>
          <div style="margin-top: 20px; border-top: 1px solid #000; pt: 10px;">
            <p><strong>Message :</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <footer style="margin-top: 40px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #000000;">
            Envoyé depuis sacha-nahum.com
          </footer>
        </div>
      `
    });

    if (error) {
      return Response.json({ ok: false, error: "Erreur d'envoi" }, { status: 500 });
    }

    return Response.json({ ok: true, message: "Email envoyé" });

  } catch (err) {
    return Response.json({ ok: false, error: "Erreur serveur" }, { status: 500 });
  }
}