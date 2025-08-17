"use client";
import { Truck, Building2, Cog, HomeIcon, Hammer } from "lucide-react";
import { use, useEffect, useRef } from "react";
import Image from "next/image";

const serviceIcons = [Truck, Building2, Cog, HomeIcon, Hammer];

type Service = { title: string; desc: string; image: string };

export default function ServicesPage(props: { params: Promise<{ locale: string }> }) {
  const params = use(props.params);
  const locale = ["de", "en", "fr"].includes(params.locale) ? params.locale : "de";

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

  const t = {
    title: locale === "fr" ? "Services" : locale === "en" ? "Services" : "Leistungen",
    subtitle:
      locale === "fr"
        ? "Des solutions conçues pour être rapides, fiables et modulables selon vos besoins."
        : locale === "en"
        ? "Solutions built to be fast, reliable, and adaptable to your needs."
        : "Lösungen, die schnell, zuverlässig und anpassbar an Ihre Anforderungen sind.",
    cta: locale === "fr" ? "Demander un devis" : locale === "en" ? "Get a Quote" : "Angebot anfordern",
  };

  const services: Service[] =
    locale === "fr"
      ? [
          { title: "Transport – national & international", desc: "Réseau fiable, suivi en temps réel et livraisons ponctuelles – de l'envoi unitaire aux chargements complets et projets spéciaux. Optimisation des itinéraires, coordination douanière, options express/horodatées et visibilité de bout en bout dans toute l'UE et au‑delà.", image: "trans.jpg" },
          { title: "Immobilier – achat, vente, gestion", desc: "Accompagnement 360°: estimation et mise en valeur, marketing, visites, due diligence, coordination avec notaires et partenaires de financement, jusqu'à la signature. Gestion locative continue avec communication locataire et suivi technique.", image: "estate.webp" },
          { title: "Véhicules & pièces – commerce, import, export", desc: "Sourcing de véhicules et pièces OEM/aftermarket, contrôles qualité, documentation et logistique complètes. Délais consolidés, dédouanement, conformité et prise en charge de garanties pour des flux d'approvisionnement fiables.", image: "car.jpg" },
          { title: "Nettoyage & construction", desc: "Équipes spécialisées pour le nettoyage professionnel de sites et bâtiments (quotidien, fin de chantier, entrée/sortie), ainsi que des petites rénovations, réparations, peinture et interventions rapides – planification flexible et sécurité au travail.", image: "clean.jpg" },
        ]
      : locale === "en"
      ? [
          { title: "Transport – domestic & international", desc: "Reliable network, real‑time tracking, and on‑time delivery – from single parcels to full truckloads and complex project cargo. Route optimization, customs coordination, express/time‑definite options, and end‑to‑end visibility across the EU and beyond.", image: "trans.jpg" },
          { title: "Real estate – buy, sell, manage", desc: "End‑to‑end support: valuation and positioning, marketing, viewings, due diligence, and coordination with notaries and financing partners through closing. Ongoing property management with tenant communications and technical follow‑ups.", image: "estate.webp" },
          { title: "Vehicles & spare parts – trade, import, export", desc: "Sourcing verified vehicles and OEM/aftermarket parts, quality checks, complete documentation and logistics. Consolidated shipments, customs clearance and compliance, plus warranty handling for dependable supply flows.", image: "car.jpg" },
          { title: "Cleaning & construction", desc: "Specialized teams for professional facility cleaning (daily, move‑in/out, post‑construction) and small‑scale construction works: minor repairs, painting, and quick interventions – flexible scheduling and safety compliance.", image: "clean.jpg" },
        ]
      : [
          { title: "Transport – national & international", desc: "Zuverlässiges Netzwerk, Echtzeit‑Tracking und termingerechte Lieferung – vom Einzelpaket bis zu Komplettladungen und komplexen Projektverladungen. Routenoptimierung, Zollabwicklung, Express/Terminoptionen und End‑to‑End‑Transparenz in der EU und darüber hinaus.", image: "trans.jpg" },
          { title: "Immobilien – Kauf, Verkauf, Verwaltung", desc: "Ganzheitliche Begleitung: Bewertung und Positionierung, Vermarktung, Besichtigungen, Due Diligence sowie Koordination mit Notariat und Finanzierung bis zum Abschluss. Laufende Objektverwaltung mit Mieterkommunikation und technischem Follow‑up.", image: "estate.webp" },
          { title: "Fahrzeuge & Ersatzteile – Handel, Import, Export", desc: "Beschaffung geprüfter Fahrzeuge sowie OEM/Aftermarket‑Teile, Qualitätschecks, vollständige Dokumentation und Logistik. Konsolidierte Sendungen, Zollabfertigung, Compliance und Abwicklung von Garantiefällen für stabile Lieferketten.", image: "car.jpg" },
          { title: "Reinigung & Bauleistungen", desc: "Spezialisierte Teams für professionelle Gebäude‑ und Industriereinigung (täglich, Umzug, Bauendreinigung) sowie kleinteilige Bauarbeiten: Reparaturen, Malerarbeiten und schnelle Einsätze – flexible Planung und Arbeitssicherheit.", image: "clean.jpg" },
        ];

  return (
    <div>
      {/* Hero (distinct look) */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <h1 ref={setRevealRef as any} className="reveal text-4xl md:text-5xl font-semibold tracking-tight">{t.title}</h1>
          <p ref={setRevealRef as any} className="reveal mt-4 text-lg opacity-80 max-w-2xl">{t.subtitle}</p>
        </div>
        <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none" aria-hidden>
          <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-gradient-to-br from-sky-500 to-fuchsia-500 blur-3xl animate-blob" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-gradient-to-br from-violet-400 to-emerald-500 blur-3xl animate-blob animate-blob-slow animation-delay-2000" />
        </div>
      </section>

      {/* Alternating timeline-style list */}
      <section className="border-t border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-black/10 dark:via-white/15 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {services.map((s, idx) => {
              const Icon = serviceIcons[idx % serviceIcons.length];
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`${isLeft ? "lg:col-start-1 lg:pr-12" : "lg:col-start-2 lg:pl-12"}`}
                >
                  <div ref={setRevealRef as any} className="reveal group relative rounded-2xl border border-black/10 dark:border-white/10 bg-background/60 backdrop-blur overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative h-40 w-full">
                      <Image
                        src={`/${s.image}`}
                        alt={s.title}
                        fill
                        sizes="(min-width: 1024px) 600px, 100vw"
                        className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        priority={idx < 2}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl grid place-items-center">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-semibold">{s.title}</h3>
                          <p className="mt-2 opacity-80 leading-relaxed">{s.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex justify-center">
            <a ref={setRevealRef as any} href={`/${locale}/contact`} className="reveal inline-flex items-center rounded-md bg-black text-white dark:bg-white dark:text-black px-5 py-2.5 hover:opacity-90">
              {t.cta}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}


