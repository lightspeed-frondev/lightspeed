import type { Metadata } from "next";
import Link from "next/link";
import MobileDrawer from "@/app/components/MobileDrawer";
import "../globals.css";

export const metadata: Metadata = {
  title: "Light-Speed Transport GmbH | Transport • Logistics • Real Estate",
  description: "Fast, safe and reliable solutions in transport, logistics and real estate.",
};

const locales = ["de", "en", "fr"] as const;

const navLabels: Record<string, { services: string; about: string; faq: string; contact: string }> = {
  de: { services: "Leistungen", about: "Über uns", faq: "FAQ", contact: "Kontakt" },
  en: { services: "Services", about: "About", faq: "FAQ", contact: "Contact" },
  fr: { services: "Services", about: "À propos", faq: "FAQ", contact: "Contact" },
};

function LanguageSwitcher({ current }: { current: string }) {
  return (
    <div className="flex items-center">
      <div className="flex items-center gap-1 rounded-full border border-black/10 dark:border-white/10 bg-background/60 backdrop-blur px-1 py-1">
        {locales.map((l) => (
          <Link
            key={l}
            href={`/${l}`}
            className={`rounded-full px-2.5 py-1 text-xs md:text-sm transition ${
              l === current
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "hover:bg-black/5 dark:hover:bg-white/10"
            }`}
          >
            {l.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function LocaleLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }
) {
  const params = await props.params;

  const {
    children
  } = props;

  const { locale } = params;
  const labels = navLabels[locales.includes(locale as any) ? locale : "de"];

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl pl-4 pr-2 md:px-4 py-3 grid grid-cols-3 items-center">
          <Link href={`/${locale}`} className="font-semibold tracking-tight justify-self-start">
            Light-Speed Transport GmbH
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm justify-self-center">
            <a href={`/${locale}/services`} className="hover:opacity-80">{labels.services}</a>
            <a href={`/${locale}/about`} className="hover:opacity-80">{labels.about}</a>
            <a href={`/${locale}#faq`} className="hover:opacity-80">{labels.faq}</a>
            <a href={`/${locale}/contact`} className="hover:opacity-80">{labels.contact}</a>
          </nav>
          <div className="justify-self-end flex items-center gap-2 col-start-3 md:col-start-auto">
            <div className="hidden md:block">
              <LanguageSwitcher current={locale} />
            </div>
            <div className="md:hidden">
              <MobileDrawer locale={locale} labels={labels} />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm flex flex-col md:flex-row items-center md:items-center md:justify-between gap-4">
          <p className="opacity-80 text-center md:text-left">© {new Date().getFullYear()} Light-Speed Transport GmbH</p>
          <div className="w-full md:w-auto flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2">
            <a href={`/${locale}/services`} className="hover:opacity-80">{navLabels[locale]?.services ?? "Services"}</a>
            <a href={`/${locale}/about`} className="hover:opacity-80">{navLabels[locale]?.about ?? "About"}</a>
            <a href={`/${locale}/contact`} className="hover:opacity-80">{navLabels[locale]?.contact ?? "Contact"}</a>
            <a href={`/${locale}/imprint`} className="hover:opacity-80">Imprint</a>
            <a href={`/${locale}/privacy`} className="hover:opacity-80">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}


