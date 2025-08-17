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
        setStatus('reCAPTCHA configuration is missing.');
        return;
      }
      if (!isFormValid) {
        setStatus('Please fill out all fields.');
        return;
      }

      try {
        setSubmitting(true);
        setStatus(null);

        // Create token
        const token: string = await new Promise((resolve, reject) => {
          if (!window.grecaptcha) {
            reject(new Error('reCAPTCHA could not be loaded'));
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

        // Verify on server
        const res = await fetch('/api/recaptcha', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          setStatus('Verification failed. Please try again.');
          setSubmitting(false);
          return;
        }

        // Minimum score check (0.5 default)
        if (typeof data.score === 'number' && data.score < 0.5) {
          setStatus('Suspected spam detected. Please try again.');
          setSubmitting(false);
          return;
        }

        // Mesajı e-posta ile ilet
        const sendRes = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message }),
        });

        const sendData = await sendRes.json();
        if (!sendRes.ok || !sendData.ok) {
          setStatus('an error occurred. Please try again.');
          setSubmitting(false);
          return;
        }

        setStatus('Thanks! Your message has been received.');
        setName('');
        setEmail('');
        setMessage('');
      } catch (error) {
        setStatus('An error occurred. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
    [isFormValid, siteKey, name, email, message]
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
          {submitting ? 'Sending…' : labels.send}
        </button>
        {status && <p className="text-sm opacity-80">{status}</p>}
      </form>
    </>
  );
}


