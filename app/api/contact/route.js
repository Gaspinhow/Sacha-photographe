import { Resend } from 'resend';

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

const DESTINATAIRE = 'photo@sacha-nahum.com';

// Le contenu du formulaire finissait tel quel dans le HTML du mail : n'importe
// qui pouvait y glisser des balises ou un lien déguisé.
const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const EMAIL_VALIDE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Limite simple par adresse IP. En mémoire : suffisant pour freiner un envoi
// automatisé, remis à zéro à chaque redémarrage.
const MAX_ENVOIS = 3;
const FENETRE_MS = 10 * 60 * 1000;
const envois = new Map();

function tropDEnvois(ip) {
  const maintenant = Date.now();
  const recents = (envois.get(ip) || []).filter((t) => maintenant - t < FENETRE_MS);
  if (recents.length >= MAX_ENVOIS) return true;
  recents.push(maintenant);
  envois.set(ip, recents);
  if (envois.size > 500) {
    for (const [cle, dates] of envois) {
      if (dates.every((t) => maintenant - t >= FENETRE_MS)) envois.delete(cle);
    }
  }
  return false;
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { firstName, lastName, email, phone, message, website } = data || {};

    // Champ piège : invisible dans le formulaire, donc rempli seulement par un robot.
    if (website) return Response.json({ ok: true, message: "Email envoyé" });

    if (!firstName || !lastName || !email || !message) {
      return Response.json({ ok: false, error: "Champs manquants" }, { status: 400 });
    }
    if (!EMAIL_VALIDE.test(email)) {
      return Response.json({ ok: false, error: "Adresse e-mail invalide" }, { status: 400 });
    }
    if (String(message).length > 5000) {
      return Response.json({ ok: false, error: "Message trop long" }, { status: 400 });
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'inconnue';
    if (tropDEnvois(ip)) {
      return Response.json({ ok: false, error: "Trop d'envois, réessayez plus tard" }, { status: 429 });
    }

    const { error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: [DESTINATAIRE],
      subject: `CONTACT : ${String(firstName).slice(0, 60)} ${String(lastName).slice(0, 60)}`,
      replyTo: email,
      html: `
        <div style="font-family: serif; color: #000000; line-height: 1.6; max-width: 600px;">
          <h2 style="text-transform: uppercase; letter-spacing: 0.2em; border-bottom: 1px solid #000; padding-bottom: 10px;">
            Nouveau Message de Contact
          </h2>
          <p><strong>Nom :</strong> ${escapeHtml(lastName)}</p>
          <p><strong>Prénom :</strong> ${escapeHtml(firstName)}</p>
          <p><strong>Email :</strong> ${escapeHtml(email)}</p>
          <p><strong>Téléphone :</strong> ${escapeHtml(phone) || "-"}</p>
          <div style="margin-top: 20px; border-top: 1px solid #000; padding-top: 10px;">
            <p><strong>Message :</strong></p>
            <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
          <footer style="margin-top: 40px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #000000;">
            Envoyé depuis sacha-nahum.com
          </footer>
        </div>
      `
    });

    if (error) {
      // Tracé côté serveur : sans ça, un refus de Resend (domaine non vérifié,
      // quota, adresse invalide) est invisible et le formulaire semble juste "planté".
      console.error("Resend a refusé l'envoi :", error);
      return Response.json({ ok: false, error: "Erreur d'envoi" }, { status: 500 });
    }

    return Response.json({ ok: true, message: "Email envoyé" });

  } catch (err) {
    console.error("Erreur du formulaire de contact :", err);
    return Response.json({ ok: false, error: "Erreur serveur" }, { status: 500 });
  }
}
