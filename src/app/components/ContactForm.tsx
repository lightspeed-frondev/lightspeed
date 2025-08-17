'use client';

import Script from 'next/script';
import { useCallback, useMemo, useState } from 'react';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

type ContactFormProps = {
  siteKey: string;
  labels: {
    send: string;
    name: string;
    email: string;
    message: string;
  };
};

export default function ContactForm({ siteKey, labels }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const isFormValid = useMemo(() => {
    return name.trim().length > 0 && email.trim().length > 0 && message.trim().length > 0;
  }, [name, email, message]);

  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!siteKey) {
        setStatus('reCAPTCHA yapılandırması eksik.');
        return;
      }
      if (!isFormValid) {
        setStatus('Lütfen tüm alanları doldurun.');
        return;
      }

      try {
        setSubmitting(true);
        setStatus(null);

        // Token oluştur
        const token: string = await new Promise((resolve, reject) => {
          if (!window.grecaptcha) {
            reject(new Error('reCAPTCHA yüklenemedi'));
            return;
          }
          window.grecaptcha.ready(async () => {
            try {
              const t = await window.grecaptcha.execute(siteKey, { action: 'submit' });
              resolve(t);
            } catch (err) {
              reject(err);
            }
          });
        });

        // Sunucuda doğrula
        const res = await fetch('/api/recaptcha', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          setStatus('Doğrulama başarısız. Lütfen tekrar deneyin.');
          setSubmitting(false);
          return;
        }

        // Minimum skor kontrolü (0.5 varsayılan)
        if (typeof data.score === 'number' && data.score < 0.5) {
          setStatus('Spam şüphesi tespit edildi. Lütfen tekrar deneyin.');
          setSubmitting(false);
          return;
        }

        // Burada normal gönderim/işlem yapılabilir
        setStatus('Doğrulama başarılı. Mesajınız gönderilmeye hazır.');
      } catch (error) {
        setStatus('Bir hata oluştu. Lütfen tekrar deneyin.');
      } finally {
        setSubmitting(false);
      }
    },
    [isFormValid, siteKey]
  );

  return (
    <>
      <Script src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`} strategy="afterInteractive" />

      <form className="grid grid-cols-1 gap-4 md:col-span-2" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder={labels.name}
          className="rounded-md border border-black/10 dark:border-white/10 px-3 py-2 bg-background/70"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder={labels.email}
          className="rounded-md border border-black/10 dark:border-white/10 px-3 py-2 bg-background/70"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder={labels.message}
          rows={6}
          className="rounded-md border border-black/10 dark:border-white/10 px-3 py-2 bg-background/70"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 hover:opacity-90 disabled:opacity-50"
          disabled={submitting || !isFormValid}
        >
          {submitting ? 'Gönderiliyor…' : labels.send}
        </button>
        {status && <p className="text-sm opacity-80">{status}</p>}
      </form>
    </>
  );
}


