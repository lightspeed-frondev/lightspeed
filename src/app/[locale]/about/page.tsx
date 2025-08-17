import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/app/components/Reveal";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const locale = ["de", "en", "fr"].includes(params.locale) ? params.locale : "de";
  const title = locale === "fr" ? "À propos | Light-Speed Transport GmbH" : locale === "en" ? "About Us | Light-Speed Transport GmbH" : "Über uns | Light-Speed Transport GmbH";
  const description =
    locale === "fr"
      ? "À propos de Light-Speed Transport GmbH – fiabilité, rapidité et solutions intégrées."
      : locale === "en"
      ? "About Light-Speed Transport GmbH – reliability, speed, and integrated solutions."
      : "Über Light-Speed Transport GmbH – Zuverlässigkeit, Geschwindigkeit und integrierte Lösungen.";
  return { title, description };
}

export default async function AboutPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = ["de", "en", "fr"].includes(params.locale) ? params.locale : "de";

  const t = {
    title: locale === "fr" ? "À propos" : locale === "en" ? "About Us" : "Über uns",
    subtitle:
      locale === "fr"
        ? "Fondée en 2025, Light-Speed Transport GmbH met l'accent sur la fiabilité, la rapidité et des solutions intégrées."
        : locale === "en"
        ? "Founded in 2025, Light-Speed Transport GmbH focuses on reliability, speed, and integrated solutions."
        : "Gegründet 2025, steht die Light-Speed Transport GmbH für Zuverlässigkeit, Geschwindigkeit und integrierte Lösungen.",
    missionTitle: locale === "fr" ? "Mission" : locale === "en" ? "Mission" : "Mission",
    missionBody:
      locale === "fr"
        ? "Offrir des services de transport, logistique et immobilier sans faille, avec un service client centré sur la qualité et la ponctualité."
        : locale === "en"
        ? "Deliver seamless transport, logistics and real estate services with customer-centric quality and timeliness."
        : "Nahtlose Transport-, Logistik- und Immobiliendienstleistungen mit kundenzentrierter Qualität und Pünktlichkeit.",
    valuesTitle: locale === "fr" ? "Valeurs" : locale === "en" ? "Values" : "Werte",
    values: (
      locale === "fr"
        ? ["Fiabilité", "Transparence", "Amélioration continue", "Orientation client"]
        : locale === "en"
        ? ["Reliability", "Transparency", "Continuous improvement", "Customer focus"]
        : ["Zuverlässigkeit", "Transparenz", "Kontinuierliche Verbesserung", "Kundenfokus"]
    ).map((v) => ({ label: v })),
    cta: locale === "fr" ? "Nous contacter" : locale === "en" ? "Contact us" : "Kontakt aufnehmen",

    // Extra content
    storyTitle: locale === "fr" ? "Notre histoire" : locale === "en" ? "Our Story" : "Unsere Geschichte",
    storyBody1:
      locale === "fr"
        ? "Créée en 2025, notre société a développé un portefeuille de services intégrés couvrant le transport routier, la logistique et l'immobilier afin de répondre aux besoins de bout en bout: de l'expédition express aux transactions immobilières, en passant par les pièces automobiles, le nettoyage et la construction."
        : locale === "en"
        ? "Founded in 2025, we built an integrated portfolio across road transport, logistics and real estate to solve end‑to‑end needs — from express shipments to property transactions, vehicle parts, cleaning and construction."
        : "Seit unserer Gründung 2025 haben wir ein integriertes Leistungsportfolio in Straßentransport, Logistik und Immobilien aufgebaut – für durchgängige Lösungen von Expresslieferungen über Immobilientransaktionen bis hin zu Fahrzeugteilen, Reinigung und Bauleistungen.",
    storyBody2:
      locale === "fr"
        ? "Nous combinons un réseau de partenaires fiable, une flotte moderne et une coordination numérique pour garantir des opérations ponctuelles et conformes dans toute l'UE."
        : locale === "en"
        ? "We combine a reliable partner network, a modern fleet and digital coordination to deliver on‑time and compliant operations across the EU."
        : "Wir verbinden ein zuverlässiges Partnernetzwerk, eine moderne Flotte und digitale Koordination, um termingerechte und regelkonforme Abläufe in der gesamten EU zu gewährleisten.",

    capsTitle: locale === "fr" ? "Ce que nous faisons" : locale === "en" ? "What we do" : "Was wir tun",
    capabilities:
      locale === "fr"
        ? [
            "Transport routier (national & international)",
            "Intermédiation & gestion immobilière",
            "Commerce / import / export de véhicules & pièces",
            "Services de nettoyage & facility",
            "Construction & petites rénovations",
            "Support douane & documentation",
          ]
        : locale === "en"
        ? [
            "Road transport (domestic & international)",
            "Real‑estate brokerage & property management",
            "Vehicle & spare‑parts trade / import / export",
            "Cleaning & facility services",
            "Construction & small renovations",
            "Customs & documentation support",
          ]
        : [
            "Straßentransport (national & international)",
            "Immobilienvermittlung & Objektverwaltung",
            "Fahrzeuge & Ersatzteile: Handel / Import / Export",
            "Reinigungs- & Facility‑Services",
            "Bauleistungen & kleinere Renovierungen",
            "Zoll- & Dokumentationssupport",
          ],

    whyUsTitle: locale === "fr" ? "Pourquoi nous choisir" : locale === "en" ? "Why choose us" : "Warum wir",
    whyUs:
      locale === "fr"
        ? [
            "Livraison ponctuelle et traçabilité",
            "Tarification et communication transparentes",
            "Un seul partenaire pour plusieurs services",
            "Gestion dédiée de compte",
          ]
        : locale === "en"
        ? [
            "On‑time delivery and traceability",
            "Transparent pricing & communication",
            "One partner for multiple services",
            "Dedicated account management",
          ]
        : [
            "Pünktliche Lieferung und Nachverfolgbarkeit",
            "Transparente Preise & Kommunikation",
            "Ein Partner für mehrere Leistungen",
            "Dediziertes Account‑Management",
          ],

    qualityTitle: locale === "fr" ? "Qualité & Sécurité" : locale === "en" ? "Quality & Safety" : "Qualität & Sicherheit",
    qualityBody:
      locale === "fr"
        ? "Procédures opérationnelles standardisées, briefings conducteurs, contrôles en deux étapes, assurance responsabilité civile et protection des données encadrent nos opérations."
        : locale === "en"
        ? "Standard operating procedures, driver briefings, two‑step checks, liability insurance and data protection underpin our operations."
        : "Standardisierte Prozesse, Fahrer‑Briefings, Zwei‑Stufen‑Kontrollen, Haftpflichtversicherung und Datenschutz bilden das Fundament unserer Abläufe.",

    sustainabilityTitle: locale === "fr" ? "Durabilité" : locale === "en" ? "Sustainability" : "Nachhaltigkeit",
    sustainabilityBody:
      locale === "fr"
        ? "Optimisation des trajets, groupage, matériaux écologiques pour le nettoyage et approche éco‑énergétique dans l'immobilier."
        : locale === "en"
        ? "Route optimization, consolidated shipments, eco‑friendly cleaning materials and energy‑efficient practices in real estate."
        : "Routenoptimierung, Sammeltransporte, umweltfreundliche Reinigungsmittel und energieeffiziente Maßnahmen im Immobilienbereich.",

    certsTitle: locale === "fr" ? "Certifications & Conformité" : locale === "en" ? "Certifications & Compliance" : "Zertifikate & Compliance",
    certs:
      locale === "fr"
        ? [
            "Processus conformes RGPD",
            "Réglementation européenne du transport routier",
            "Immatriculation commerciale (ex. HRB 123456)",
          ]
        : locale === "en"
        ? [
            "GDPR‑compliant processes",
            "EU road transport regulations",
            "Commercial register (e.g., HRB 123456)",
          ]
        : [
            "DSGVO‑konforme Prozesse",
            "EU‑Vorschriften für den Straßentransport",
            "Handelsregister (z. B. HRB 123456)",
          ],
  };

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <Reveal as="h1" className="text-4xl md:text-5xl font-semibold tracking-tight">{t.title}</Reveal>
          <Reveal as="p" className="mt-4 text-lg opacity-80 max-w-3xl">{t.subtitle}</Reveal>
        </div>
        <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none" aria-hidden>
          <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 blur-3xl animate-blob" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-gradient-to-br from-sky-500 to-fuchsia-500 blur-3xl animate-blob animate-blob-slow animation-delay-2000" />
        </div>
      </section>

      <section className="border-t border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <Reveal as="h2" className="text-2xl md:text-3xl font-semibold">{t.storyTitle}</Reveal>
            <Reveal as="p" className="mt-3 opacity-80 leading-relaxed">{t.storyBody1}</Reveal>
            <Reveal as="p" className="mt-3 opacity-80 leading-relaxed">{t.storyBody2}</Reveal>
          </div>
          <div className="relative">
            <Reveal className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden">
              <Image
                src="/workingman.avif"
                alt={locale === "fr" ? "Travailleur" : locale === "en" ? "Working man" : "Arbeiter"}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Quality, Sustainability, Certifications */}
      <section className="border-t border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-3 gap-6">
          <Reveal className="rounded-xl border border-black/10 dark:border-white/10 p-5 bg-background/60 backdrop-blur">
            <h3 className="font-medium">{t.qualityTitle}</h3>
            <p className="mt-2 text-sm opacity-90 leading-relaxed">{t.qualityBody}</p>
          </Reveal>
          <Reveal className="rounded-xl border border-black/10 dark:border-white/10 p-5 bg-background/60 backdrop-blur">
            <h3 className="font-medium">{t.sustainabilityTitle}</h3>
            <p className="mt-2 text-sm opacity-90 leading-relaxed">{t.sustainabilityBody}</p>
          </Reveal>
          <Reveal className="rounded-xl border border-black/10 dark:border-white/10 p-5 bg-background/60 backdrop-blur">
            <h3 className="font-medium">{t.certsTitle}</h3>
            <ul className="mt-2 text-sm opacity-90 space-y-2 list-disc pl-5">
              {t.certs.map((c: string, i: number) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </div>
  );
}


