import ContactForm from '@/app/components/ContactForm';
import type { Metadata } from "next";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const locale = ["de", "en", "fr"].includes(params.locale) ? params.locale : "de";
  const title = locale === "fr" ? "Contact | Light-Speed Transport GmbH" : locale === "en" ? "Contact | Light-Speed Transport GmbH" : "Kontakt | Light-Speed Transport GmbH";
  const description =
    locale === "fr"
      ? "Contactez-nous – nous reviendrons rapidement avec la meilleure proposition."
      : locale === "en"
      ? "Reach out — we'll get back quickly with the best plan."
      : "Kontaktieren Sie uns – wir melden uns schnell mit dem besten Angebot.";
  return { title, description };
}

export default async function ContactPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = ["de", "en", "fr"].includes(params.locale) ? params.locale : "de";

  const title = locale === "fr" ? "Contact" : locale === "en" ? "Contact" : "Kontakt";
  const subtitle =
    locale === "fr"
      ? "Contactez-nous – nous reviendrons rapidement avec la meilleure proposition."
      : locale === "en"
      ? "Reach out — we'll get back quickly with the best plan."
      : "Kontaktieren Sie uns – wir melden uns schnell mit dem besten Angebot.";
  const send = locale === "fr" ? "Envoyer" : locale === "en" ? "Send" : "Senden";
  const sending = locale === "fr" ? "Envoi…" : locale === "en" ? "Sending…" : "Senden…";
  const name = locale === "fr" ? "Nom" : locale === "en" ? "Name" : "Name";
  const email = locale === "fr" ? "E-mail" : locale === "en" ? "Email" : "E-Mail";
  const message = locale === "fr" ? "Message" : locale === "en" ? "Message" : "Nachricht";

  const recaptchaMissing = locale === "fr" ? "Configuration reCAPTCHA manquante." : locale === "en" ? "reCAPTCHA configuration is missing." : "reCAPTCHA-Konfiguration fehlt.";
  const fillAll = locale === "fr" ? "Veuillez remplir tous les champs." : locale === "en" ? "Please fill out all fields." : "Bitte füllen Sie alle Felder aus.";
  const verificationFailed = locale === "fr" ? "Échec de la vérification. Veuillez réessayer." : locale === "en" ? "Verification failed. Please try again." : "Verifizierung fehlgeschlagen. Bitte erneut versuchen.";
  const suspectedSpam = locale === "fr" ? "Spam suspect détecté. Veuillez réessayer." : locale === "en" ? "Suspected spam detected. Please try again." : "Verdacht auf Spam festgestellt. Bitte erneut versuchen.";
  const success = locale === "fr" ? "Merci ! Votre message a été reçu." : locale === "en" ? "Thanks! Your message has been received." : "Danke! Ihre Nachricht ist eingegangen.";
  const genericError = locale === "fr" ? "Une erreur s'est produite. Veuillez réessayer." : locale === "en" ? "An error occurred. Please try again." : "Es ist ein Fehler aufgetreten. Bitte erneut versuchen.";

  const infoTitle =
    locale === "fr"
      ? "Informations générales"
      : locale === "en"
      ? "General Information"
      : "Allgemeine Informationen";
  const addressLabel = locale === "fr" ? "Adresse" : locale === "en" ? "Address" : "Adresse";
  const emailLabelInfo = locale === "fr" ? "E-mail" : locale === "en" ? "Email" : "E-Mail";
  const companyName = "Light-Speed Transport GmbH";
  const countryLocalized = locale === "fr" ? "Suisse" : locale === "en" ? "Switzerland" : "Schweiz";
  const companyAddress = `e/o TFZ GmbH, Am Kägenrain 3, 4153 Reinach BL, ${countryLocalized}`;
  const companyEmail = "info@lightspeedtransport.ch";

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 opacity-80 max-w-2xl">{subtitle}</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        <ContactForm
          siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
          labels={{ send, sending, name, email, message, recaptchaMissing, fillAll, verificationFailed, suspectedSpam, success, genericError }}
        />

        <aside className="md:col-span-1">
          <div className="rounded-md border border-black/10 dark:border-white/10 p-4 md:p-6 bg-background/70 h-full">
            <h2 className="text-xl font-semibold tracking-tight">{infoTitle}</h2>
            <p className="mt-1 opacity-80">{companyName}</p>
            <div className="mt-4 space-y-3 text-sm">
              <div>
                <div className="opacity-60">{addressLabel}</div>
                <div>{companyAddress}</div>
              </div>
              
              <div>
                <div className="opacity-60">{emailLabelInfo}</div>
                <div>
                  <a href={`mailto:${companyEmail}`} className="underline underline-offset-4 hover:opacity-80">
                    {companyEmail}
                  </a>
                </div>
              </div>
              
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}


