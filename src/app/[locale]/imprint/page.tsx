import type { Metadata } from "next";
import RevealObserver from "@/app/components/RevealObserver";

export const metadata: Metadata = {
  title: "Imprint | Light-Speed Transport GmbH",
  description: "Impressum / Imprint for Light-Speed Transport GmbH (Switzerland)",
};

export default async function ImprintPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = ["de", "en", "fr"].includes(params.locale) ? params.locale : "de";

  const t = {
    title: locale === "fr" ? "Mentions légales" : locale === "en" ? "Imprint" : "Impressum",
    companyName: "Light-Speed Transport GmbH",
    legalNature: locale === "fr" ? "Société à responsabilité limitée (GmbH)" : locale === "en" ? "Limited liability company (GmbH)" : "Gesellschaft mit beschränkter Haftung (GmbH)",
    registerLabel: locale === "fr" ? "Registre du commerce" : locale === "en" ? "Commercial Register" : "Handelsregister",
    registerValue: "Handelsregisteramt des Kantons Basel-Landschaft",
    companyNumberLabel: locale === "fr" ? "Numéro d'entreprise" : locale === "en" ? "Company Number" : "Unternehmensnummer",
    companyNumber: "CHE-338.937.112",
    addressCurrentLabel: locale === "fr" ? "Adresse (actuelle)" : locale === "en" ? "Address (current)" : "Adresse (aktuell)",
    addressPrevLabel: locale === "fr" ? "Adresse (précédente)" : locale === "en" ? "Address (previous)" : "Adresse (zuvor)",
    addressCurrent: "e/o TFZ GmbH, Am Kägenrain 3, 4153 Reinach BL, Switzerland",
    addressPrev1: "Industriestrasse 26, 4622 Egerkingen, Switzerland",
    addressPrev2: "Bächliackerstrasse 4a, 4402 Frenkendorf, Switzerland",
    directorsLabel: locale === "fr" ? "Direction" : locale === "en" ? "Managing Directors" : "Geschäftsführung",
    directors: ["Büsra Kaya", "Fatih Selvi (Reinach BL)"],
    purposeLabel: locale === "fr" ? "But" : locale === "en" ? "Purpose" : "Zweck",
    purposeValue:
      locale === "fr"
        ? "Exécution de tous types de transports, commerce, import et export de véhicules et de pièces, ainsi que des travaux de nettoyage et de construction."
        : locale === "en"
        ? "Carrying out all kinds of transport, trade, import and export of vehicles and parts, as well as cleaning and construction work."
        : "Durchführung aller Arten von Transporten, Handel, Import und Export von Fahrzeugen und Teilen sowie Reinigungs- und Bauarbeiten.",
  } as const;

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <RevealObserver />
      <h1 className="reveal text-2xl font-semibold tracking-tight mb-6">{t.title}</h1>
      <div className="space-y-4 text-sm leading-6 opacity-90">
        <p className="reveal"><strong>{locale === "fr" ? "Dénomination" : locale === "en" ? "Company Name" : "Firma"}:</strong> {t.companyName}</p>
        <p className="reveal"><strong>{locale === "fr" ? "Forme juridique" : locale === "en" ? "Legal Nature" : "Rechtsform"}:</strong> {t.legalNature}</p>
        <p className="reveal"><strong>{t.registerLabel}:</strong> {t.registerValue}</p>
        <p className="reveal"><strong>{t.companyNumberLabel}:</strong> {t.companyNumber}</p>
        <div className="reveal space-y-1">
          <p><strong>{t.addressCurrentLabel}:</strong> {t.addressCurrent}</p>
          <p><strong>{t.addressPrevLabel}:</strong> {t.addressPrev1}</p>
          <p><strong>{t.addressPrevLabel}:</strong> {t.addressPrev2}</p>
        </div>
        <div className="reveal space-y-1">
          <p><strong>{t.directorsLabel}:</strong></p>
          <ul className="list-disc pl-6">
            {t.directors.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
        <p className="reveal"><strong>{t.purposeLabel}:</strong> {t.purposeValue}</p>
      </div>
    </section>
  );
}


