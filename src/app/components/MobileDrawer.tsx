"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

type Props = {
  locale: string;
  labels: { services: string; about: string; faq: string; contact: string };
};

export default function MobileDrawer({ locale, labels }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const locales = ["de", "en", "fr"] as const;

  return (
    <div className="md:hidden w-full flex justify-end">
      <button
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/10 p-2"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Backdrop */}
      <button
        aria-label="Close menu"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${open ? "opacity-40 bg-black/40 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-dvh w-[70vw] max-w-[70vw] bg-[var(--background)] text-[var(--foreground)] shadow-xl border-l border-black/10 dark:border-white/10 flex flex-col overflow-y-auto transform transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-black/10 dark:border-white/10">
          <span className="font-semibold">Menu</span>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/10 p-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="px-4 py-4 space-y-3 text-sm">
          <Link href={`/${locale}/services`} className="block hover:opacity-80" onClick={() => setOpen(false)}>
            {labels.services}
          </Link>
          <Link href={`/${locale}/about`} className="block hover:opacity-80" onClick={() => setOpen(false)}>
            {labels.about}
          </Link>
          <Link href={`/${locale}#faq`} className="block hover:opacity-80" onClick={() => setOpen(false)}>
            {labels.faq}
          </Link>
          <Link href={`/${locale}/contact`} className="block hover:opacity-80" onClick={() => setOpen(false)}>
            {labels.contact}
          </Link>
          <div className="h-px bg-black/10 dark:bg-white/10 my-3" />
          <Link href={`/${locale}/imprint`} className="block hover:opacity-80" onClick={() => setOpen(false)}>
            Imprint
          </Link>
          <Link href={`/${locale}/privacy`} className="block hover:opacity-80" onClick={() => setOpen(false)}>
            Privacy
          </Link>
        </nav>

        <div className="mt-auto px-4 py-4 border-t border-black/10 dark:border-white/10">
          <div className="flex items-center gap-1 rounded-full border border-black/10 dark:border-white/10 bg-background/60 backdrop-blur px-1 py-1">
            {locales.map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                className={`rounded-full px-2.5 py-1 text-xs transition ${
                  l === locale
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "hover:bg-black/5 dark:hover:bg-white/10"
                }`}
                onClick={() => setOpen(false)}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


