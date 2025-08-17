"use client";
import { useEffect, useRef, use } from "react";
import { Truck, Building2, Cog, HomeIcon, Hammer, ArrowDown } from "lucide-react";
import Image from "next/image";



type Messages = {
  heroTitle: string;
  heroSubtitle: string;
  ctaPrimary: string;
  aboutTitle: string;
  aboutBody: string;
  servicesTitle: string;
  services: string[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  contactTitle: string;
  contactSubtitle: string;
};

const messagesByLocale: Record<string, Messages> = {
  de: {
    heroTitle: "Schnell. Sicher. Zuverlässig.",
    heroSubtitle:
      "Transport, Logistik und Immobilienlösungen aus einer Hand.",
    ctaPrimary: "Angebot anfordern",
    aboutTitle: "Über uns",
    aboutBody:
      "Light-Speed Transport GmbH bietet umfassende Lösungen in Transport, Logistik und Immobilien. Mit einem erfahrenen Team liefern wir pünktlich und zuverlässig und begleiten Sie professionell bei Immobilientransaktionen.",
    servicesTitle: "Leistungen",
    services: [
      "Wir übernehmen Transporte aller Art – national wie international – pünktlich, sicher und zuverlässig.",
      "Im Bereich Immobilien begleiten wir Sie beim Kauf, Verkauf und bei der Verwaltung Ihrer Objekte – durchgängig und transparent.",
      "Wir handeln mit Fahrzeugen und Ersatzteilen und kümmern uns um Import und Export einschließlich Zollabwicklung.",
      "Unsere Teams bieten professionelle Reinigungsdienste für Gebäude und Anlagen – flexibel und qualitätsgesichert.",
      "Zusätzlich erbringen wir baunahe Leistungen von kleineren Reparaturen bis zu Ausbauarbeiten.",
    ],
    faqTitle: "Häufige Fragen",
    faqs: [
      {
        q: "Welche Transportarten bieten Sie an?",
        a: "Wir decken In- und Auslandstransporte aller Art ab und liefern pünktlich und sicher.",
      },
      {
        q: "Unterstützen Sie auch Immobiliengeschäfte?",
        a: "Ja, wir begleiten Sie professionell beim Kauf, Verkauf und der Verwaltung von Immobilien.",
      },
      {
        q: "Wie schnell erhalte ich ein Angebot?",
        a: "In der Regel innerhalb von 24 Stunden nach Eingang Ihrer Anfrage.",
      },
      {
        q: "Bieten Sie Expresslieferungen an?",
        a: "Ja, je nach Zielregion bieten wir Express- und Terminlieferungen an.",
      },
    ],
    contactTitle: "Kontakt",
    contactSubtitle:
      "Kontaktieren Sie uns für Anfragen – wir melden uns schnell mit dem besten Angebot.",
  },
  en: {
    heroTitle: "Fast. Safe. Reliable.",
    heroSubtitle:
      "Transport, logistics and real estate solutions under one roof.",
    ctaPrimary: "Get a Quote",
    aboutTitle: "About Us",
    aboutBody:
      "Light-Speed Transport GmbH delivers comprehensive solutions in transport, logistics and real estate. With an experienced team, we deliver on time and guide you through real estate transactions.",
    servicesTitle: "Services",
    services: [
      "We handle all types of transport – domestic and international – with on‑time, safe and reliable delivery.",
      "In real estate, we support you end‑to‑end with buying, selling and managing your properties transparently.",
      "We trade vehicles and spare parts and manage import/export including customs processing.",
      "Our teams provide professional cleaning services for facilities and sites – flexible and quality‑assured.",
      "We also deliver construction‑related services from minor repairs to fit‑out works.",
    ],
    faqTitle: "FAQ",
    faqs: [
      {
        q: "What transport services do you offer?",
        a: "We handle all types of domestic and international transport with on-time delivery.",
      },
      {
        q: "Do you handle real estate transactions?",
        a: "Yes, we support you through buying, selling and managing properties.",
      },
      {
        q: "How fast can I get a quote?",
        a: "Typically within 24 hours after receiving your request.",
      },
      {
        q: "Do you offer express deliveries?",
        a: "Yes, express and time-definite options are available depending on the route.",
      },
    ],
    contactTitle: "Contact",
    contactSubtitle:
      "Reach out with your request — we'll get back quickly with the best plan.",
  },
  fr: {
    heroTitle: "Rapide. Sûr. Fiable.",
    heroSubtitle:
      "Solutions de transport, logistique et immobilier sous un même toit.",
    ctaPrimary: "Demander un devis",
    aboutTitle: "À propos",
    aboutBody:
      "Light-Speed Transport GmbH propose des solutions complètes en transport, logistique et immobilier. Notre équipe expérimentée livre à temps et vous accompagne dans vos transactions immobilières.",
    servicesTitle: "Services",
    services: [
      "Nous prenons en charge tous types de transports – en national comme à l’international – avec des livraisons ponctuelles et fiables.",
      "En immobilier, nous vous accompagnons de bout en bout pour l’achat, la vente et la gestion de vos biens en toute transparence.",
      "Nous commerçons des véhicules et des pièces détachées et gérons l’import/export, y compris les formalités douanières.",
      "Nos équipes assurent des services de nettoyage professionnels pour bâtiments et sites – flexibles et orientés qualité.",
      "Nous réalisons également des prestations de construction, des petites réparations aux travaux d’aménagement.",
    ],
    faqTitle: "FAQ",
    faqs: [
      {
        q: "Quels types de transport proposez-vous ?",
        a: "Nous gérons tous types de transports nationaux et internationaux, avec des livraisons ponctuelles.",
      },
      {
        q: "Gérez-vous aussi des transactions immobilières ?",
        a: "Oui, nous vous accompagnons pour l'achat, la vente et la gestion de biens.",
      },
      {
        q: "Sous combien de temps puis-je recevoir un devis ?",
        a: "En général sous 24 heures après réception de votre demande.",
      },
      {
        q: "Proposez-vous des livraisons express ?",
        a: "Oui, des options express et à heure définie sont possibles selon la destination.",
      },
    ],
    contactTitle: "Contact",
    contactSubtitle:
      "Contactez-nous — nous revenons rapidement avec la meilleure proposition.",
  },
};

export default function Page(props: { params: Promise<{ locale: string }> }) {
  const params = use(props.params);
  const locale = ["de", "en", "fr"].includes(params.locale)
    ? params.locale
    : "de";
  const t = messagesByLocale[locale];

  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const setRevealRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const aboutImages = ["trans.jpg", "estate.webp", "car.jpg", "clean.jpg"];

  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden min-h-dvh flex items-center"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h1
            ref={setRevealRef as any}
            className="reveal text-4xl md:text-6xl font-semibold tracking-tight"
          >
            {t.heroTitle}
          </h1>
          <p
            ref={setRevealRef as any}
            className="reveal mt-4 text-lg md:text-xl opacity-80 max-w-2xl"
          >
            {t.heroSubtitle}
          </p>
        </div>
        <div className="absolute left-1/2 bottom-8 -translate-x-1/2">
          <a
            href={`/${locale}#about`}
            aria-label={locale === "fr" ? "Faire défiler vers le contenu" : locale === "en" ? "Scroll to content" : "Zum Inhalt scrollen"}
            className="hover:opacity-80 transition"
          >
            <ArrowDown className="h-7 w-7 animate-scroll-down" />
          </a>
        </div>
        <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none" aria-hidden>
          <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-gradient-to-br from-fuchsia-500 to-sky-500 blur-3xl animate-blob" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 blur-3xl animate-blob animate-blob-slow animation-delay-2000" />
        </div>
      </section>

      {/* About */}
      <section id="about">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10">
          <div>
            <h2 ref={setRevealRef as any} className="reveal text-2xl md:text-3xl font-semibold">
              {t.aboutTitle}
            </h2>
            <p ref={setRevealRef as any} className="reveal mt-4 opacity-80 leading-relaxed">
              {t.aboutBody}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {aboutImages.map((src, idx) => (
              <div key={src} ref={setRevealRef as any} className="reveal relative rounded-lg overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={`/${src}`}
                    alt={src}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    priority={idx < 2}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}  
      <section id="services" className="border-t border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <h2 ref={setRevealRef as any} className="reveal text-2xl md:text-3xl font-semibold">
            {t.servicesTitle}
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {t.services.map((s, idx) => {
              const Icon = [Truck, Building2, Cog, HomeIcon, Hammer][idx % 5];
              return (
                <div
                  key={idx}
                  ref={setRevealRef as any}
                  className={`reveal group h-full flex flex-col rounded-xl border border-black/10 dark:border-white/10 p-5 hover:shadow-lg transition-shadow bg-background/60 backdrop-blur lg:h-[160px] lg:col-span-2 ${
                    t.services.length === 5 && idx === 3 ? "lg:col-start-2" : ""
                  }`}
                >
                  <div className="h-10 w-10 rounded-md bg-gradient-to-br from-sky-500 to-fuchsia-500 opacity-90 grid place-items-center">
                    <Icon className="h-5 w-5 text-white drop-shadow" />
                  </div>
                  <p className="mt-4 font-medium line-clamp-2">{s}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <h2 ref={setRevealRef as any} className="reveal text-2xl md:text-3xl font-semibold">
            {t.faqTitle}
          </h2>
          <div className="mt-6 divide-y divide-black/10 dark:divide-white/10">
            {t.faqs.map((f, i) => (
              <details key={i} ref={setRevealRef as any} className="reveal group py-4">
                <summary className="cursor-pointer list-none flex items-center justify-between">
                  <span className="font-medium">{f.q}</span>
                  <span className="ml-4 transition-transform group-open:rotate-45 text-xl">+</span>
                </summary>
                <p className="mt-2 opacity-80">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA (to Contact page) */}
      <section className="border-t border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold">{t.contactTitle}</h3>
            <p className="mt-2 opacity-80">{t.contactSubtitle}</p>
          </div>
          <a
            href={`/${locale}/contact`}
            className="inline-flex items-center rounded-md bg-black text-white dark:bg-white dark:text-black px-5 py-2.5 hover:opacity-90"
          >
            {locale === "fr" ? "Aller à la page Contact" : locale === "en" ? "Go to Contact Page" : "Zur Kontaktseite"}
          </a>
        </div>
      </section>
    </div>
  );
}


