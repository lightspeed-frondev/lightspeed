import type { Metadata } from "next";
import RevealObserver from "@/app/components/RevealObserver";

export const metadata: Metadata = {
  title: "Privacy Policy | Light-Speed Transport GmbH",
  description: "Privacy policy for Light-Speed Transport GmbH",
};

export default async function PrivacyPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = ["de", "en", "fr"].includes(params.locale) ? params.locale : "de";

  const t = {
    title: locale === "fr" ? "Politique de confidentialité" : locale === "en" ? "Privacy Policy" : "Datenschutzerklärung",
    weValue:
      locale === "fr"
        ? "Nous attachons une grande importance à votre vie privée. Cette politique explique quelles données nous collectons, comment nous les utilisons et vos droits."
        : locale === "en"
        ? "We value your privacy. This policy explains what personal data we collect, how we use it, and your rights."
        : "Wir legen großen Wert auf den Schutz Ihrer Daten. Diese Erklärung erläutert, welche personenbezogenen Daten wir erheben, wie wir sie verwenden und welche Rechte Sie haben.",
    controllerTitle: locale === "fr" ? "Responsable du traitement" : locale === "en" ? "Data Controller" : "Verantwortlicher",
    controllerValue: "Light-Speed Transport GmbH, Reinach BL, Switzerland",
    dataWeCollectTitle: locale === "fr" ? "Données collectées" : locale === "en" ? "Data We Collect" : "Erhobene Daten",
    dataWeCollect: locale === "fr"
      ? [
          "Coordonnées (nom, e‑mail, téléphone) lorsque vous nous contactez",
          "Données d'utilisation (pages visitées, interactions) pour l'analyse",
        ]
      : locale === "en"
      ? [
          "Contact details (name, email, phone) when you contact us",
          "Usage data (pages visited, interactions) for analytics",
        ]
      : [
          "Kontaktdaten (Name, E‑Mail, Telefon) bei Kontaktaufnahme",
          "Nutzungsdaten (besuchte Seiten, Interaktionen) für Analysen",
        ],
    purposeTitle: locale === "fr" ? "Finalités du traitement" : locale === "en" ? "Purpose of Processing" : "Zwecke der Verarbeitung",
    purposes: locale === "fr"
      ? ["Répondre aux demandes", "Améliorer notre site et nos services"]
      : locale === "en"
      ? ["Respond to inquiries", "Improve our website and services"]
      : ["Anfragen beantworten", "Website und Leistungen verbessern"],
    legalTitle: locale === "fr" ? "Base légale" : locale === "en" ? "Legal Basis" : "Rechtsgrundlage",
    legalText: locale === "fr" ? "Art. 6(1)(a)–(f) RGPD, selon le traitement." : locale === "en" ? "Art. 6(1)(a)–(f) GDPR, depending on the specific processing." : "Art. 6 Abs. 1 lit. a–f DSGVO, je nach Verarbeitung.",
    retentionTitle: locale === "fr" ? "Conservation" : locale === "en" ? "Data Retention" : "Aufbewahrung",
    retentionText: locale === "fr" ? "Nous conservons les données personnelles uniquement aussi longtemps que nécessaire." : locale === "en" ? "We retain personal data only as long as necessary for the stated purposes." : "Wir speichern personenbezogene Daten nur so lange, wie es für die genannten Zwecke erforderlich ist.",
    rightsTitle: locale === "fr" ? "Vos droits" : locale === "en" ? "Your Rights" : "Ihre Rechte",
    rights: locale === "fr"
      ? [
          "Accès, rectification, effacement, limitation, portabilité, opposition",
          "Droit d'introduire une réclamation auprès d'une autorité de contrôle",
        ]
      : locale === "en"
      ? [
          "Access, rectification, erasure, restriction, portability, and objection",
          "Right to lodge a complaint with a supervisory authority",
        ]
      : [
          "Auskunft, Berichtigung, Löschung, Einschränkung, Übertragbarkeit, Widerspruch",
          "Beschwerderecht bei einer Aufsichtsbehörde",
        ],
    contactTitle: locale === "fr" ? "Contact" : locale === "en" ? "Contact" : "Kontakt",
    contactText:
      locale === "fr"
        ? "E‑mail: info@lightspeedtransport.ch"
        : locale === "en"
        ? "Email: info@lightspeedtransport.ch"
        : "E‑Mail: info@lightspeedtransport.ch",
  } as const;

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <RevealObserver />
      <h1 className="reveal text-2xl font-semibold tracking-tight mb-6">{t.title}</h1>
      <div className="space-y-4 text-sm leading-6 opacity-90">
        <p className="reveal">{t.weValue}</p>

        <h2 className="reveal text-lg font-medium mt-6">{t.controllerTitle}</h2>
        <p className="reveal">{t.controllerValue}</p>

        <h2 className="reveal text-lg font-medium mt-6">{t.dataWeCollectTitle}</h2>
        <ul className="reveal list-disc pl-6 space-y-2">
          {t.dataWeCollect.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>

        <h2 className="reveal text-lg font-medium mt-6">{t.purposeTitle}</h2>
        <ul className="reveal list-disc pl-6 space-y-2">
          {t.purposes.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>

        <h2 className="reveal text-lg font-medium mt-6">{t.legalTitle}</h2>
        <p className="reveal">{t.legalText}</p>

        <h2 className="reveal text-lg font-medium mt-6">{t.retentionTitle}</h2>
        <p className="reveal">{t.retentionText}</p>

        <h2 className="reveal text-lg font-medium mt-6">{t.rightsTitle}</h2>
        <ul className="reveal list-disc pl-6 space-y-2">
          {t.rights.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>

        <h2 className="reveal text-lg font-medium mt-6">{t.contactTitle}</h2>
        <p className="reveal">{t.contactText}</p>
      </div>
    </section>
  );
}


