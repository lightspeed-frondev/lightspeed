"use client";
import { use, useState } from "react";

export default function LoginPage(props: { params: Promise<{ locale: string }>; searchParams?: Promise<{ next?: string }> }) {
  const { locale } = use(props.params);
  const search = use(props.searchParams ?? Promise.resolve<{ next?: string }>({}));
  const next = search?.next;

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const t = {
    title: locale === "fr" ? "Accès protégé" : locale === "en" ? "Protected Access" : "Geschützter Zugang",
    desc:
      locale === "fr"
        ? "Veuillez entrer le mot de passe pour accéder au site."
        : locale === "en"
        ? "Please enter the password to access the site."
        : "Bitte geben Sie das Passwort ein, um die Seite zu betreten.",
    placeholder: locale === "fr" ? "Mot de passe" : locale === "en" ? "Password" : "Passwort",
    submit: locale === "fr" ? "Entrer" : locale === "en" ? "Enter" : "Einloggen",
    wrong: locale === "fr" ? "Mot de passe incorrect" : locale === "en" ? "Incorrect password" : "Falsches Passwort",
  } as const;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError(t.wrong);
        return;
      }
      window.location.href = next || `/${locale}`;
    } catch {
      setError(t.wrong);
    }
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">{t.title}</h1>
      <p className="mt-2 opacity-80">{t.desc}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t.placeholder}
          className="w-full rounded-md border border-black/10 dark:border-white/10 bg-background/60 backdrop-blur px-3 py-2"
          autoFocus
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button type="submit" className="w-full rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 hover:opacity-90">
          {t.submit}
        </button>
      </form>
    </div>
  );
}


