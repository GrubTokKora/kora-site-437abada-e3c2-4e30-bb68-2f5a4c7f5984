import { useEffect, useMemo, useRef, useState } from 'react';
import Header from '@/sections/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { API_BASE_URL, BUSINESS_ID, RECAPTCHA_V2_SITE_KEY } from '@/config';

declare global {
  interface Window {
    grecaptcha?: {
      render: (container: HTMLElement, parameters: { sitekey: string }) => number;
      getResponse: (widgetId?: number) => string;
      reset: (widgetId?: number) => void;
      ready?: (cb: () => void) => void;
    };
  }
}

type HiringFormState = {
  fullName: string;
  phone: string;
  email: string;
  position: string;
  message: string;
};

const initialState: HiringFormState = {
  fullName: '',
  phone: '',
  email: '',
  position: '',
  message: '',
};

export default function Hiring() {
  const [form, setForm] = useState<HiringFormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const recaptchaContainerRef = useRef<HTMLDivElement | null>(null);
  const [recaptchaWidgetId, setRecaptchaWidgetId] = useState<number | null>(null);

  const positions = useMemo(
    () => ['Manager', 'Server', 'Bartender', 'Buss Person', 'Cooks', 'Dishwasher'],
    []
  );

  const isEmailValid = (email: string) => {
    // Simple client-side validation; backend enforces verification separately.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  useEffect(() => {
    if (!RECAPTCHA_V2_SITE_KEY.trim()) return;

    const scriptSrc = 'https://www.google.com/recaptcha/api.js';
    const existingScript = document.querySelector(
      `script[src="${scriptSrc}"]`
    ) as HTMLScriptElement | null;

    const ensureScriptLoaded = () => {
      if (existingScript) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = scriptSrc;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load reCAPTCHA script.'));
        document.head.appendChild(script);
      });
    };

    let cancelled = false;

    ensureScriptLoaded()
      .then(async () => {
        // Wait a bit for grecaptcha to attach to `window` (script is async).
        const start = Date.now();
        while (!cancelled && Date.now() - start < 5000) {
          if (window.grecaptcha?.render) break;
          await new Promise((r) => setTimeout(r, 150));
        }

        if (cancelled) return;
        if (!recaptchaContainerRef.current) return;
        if (!window.grecaptcha?.render) return;

        const renderWidget = () => {
          try {
            const id = window.grecaptcha?.render(recaptchaContainerRef.current!, {
              sitekey: RECAPTCHA_V2_SITE_KEY,
            });
            if (typeof id === 'number') setRecaptchaWidgetId(id);
          } catch {
            // If rendering fails we will show an error on submit.
          }
        };

        if (typeof window.grecaptcha?.ready === 'function') {
          window.grecaptcha.ready(renderWidget);
        } else {
          renderWidget();
        }
      })
      .catch(() => {
        // If script fails to load, keep the UI usable but block submission.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    const fullName = form.fullName.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!fullName) {
      setFormError('Please enter your full name.');
      return;
    }

    if (!email || !isEmailValid(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (!message) {
      setFormError('Please enter your message.');
      return;
    }

    if (!RECAPTCHA_V2_SITE_KEY.trim()) {
      setFormError('Form temporarily unavailable.');
      return;
    }

    const grecaptcha = window.grecaptcha;
    const token = grecaptcha
      ? recaptchaWidgetId != null
        ? grecaptcha.getResponse(recaptchaWidgetId)
        : grecaptcha.getResponse()
      : '';

    if (!token) {
      setFormError('Please complete the reCAPTCHA check.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/public/forms/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          business_id: BUSINESS_ID,
          form_type: 'hiring',
          form_data: {
            full_name: fullName,
            phone: form.phone.trim() || null,
            email,
            position: form.position || null,
            message,
          },
          submitter_email: email || null,
          captcha_token: token,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.detail || data?.message || 'Submission failed.');
      }

      setFormSuccess('Thanks! Your application has been submitted.');
      setForm(initialState);

      // Reset widget after successful submission.
      if (typeof window.grecaptcha?.reset === 'function' && recaptchaWidgetId != null) {
        window.grecaptcha.reset(recaptchaWidgetId);
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="relative min-h-screen">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/assets/gallery/gallery_4.jpg)' }}
        >
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-28">
          <div className="w-full max-w-[520px]">
            <div className="rounded-xl bg-black/80 p-6 shadow-2xl ring-1 ring-white/10 backdrop-blur-sm md:p-8">
              {/* Logo-style header */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1">
                  {['V', 'E', 'G', 'A'].map((letter) => (
                    <div
                      key={letter}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-light tracking-wider text-primary-foreground"
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs tracking-[0.35em] text-white/80">mexican cuisine</p>
                <h1 className="mt-4 text-center text-2xl font-semibold tracking-[0.22em] text-white md:text-3xl">
                  WE ARE HIRING!
                </h1>
              </div>

              {/* Form card */}
              <div className="mt-6 rounded-lg bg-background p-5 shadow-sm ring-1 ring-border/70 md:p-6">
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Input
                      value={form.fullName}
                      onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))}
                      placeholder="Full Name"
                      autoComplete="name"
                      required
                    />
                    <Input
                      value={form.phone}
                      onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                      placeholder="Phone"
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </div>

                  <Input
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                    placeholder="E-mail"
                    autoComplete="email"
                    inputMode="email"
                    type="email"
                    required
                  />

                  <div className="space-y-2">
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                      Positions:
                    </p>
                    <Select
                      value={form.position}
                      onValueChange={(value) => setForm((s) => ({ ...s, position: value }))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="..." />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                      Message
                    </p>
                    <Textarea
                      value={form.message}
                      onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                      className="min-h-28"
                      required
                    />
                  </div>

                  {formError && (
                    <p className="text-sm text-red-600 text-center">{formError}</p>
                  )}
                  {formSuccess && (
                    <p className="text-sm text-green-600 text-center">{formSuccess}</p>
                  )}

                  <div className="flex justify-center pt-1">
                    {RECAPTCHA_V2_SITE_KEY.trim() ? (
                      <div
                        ref={recaptchaContainerRef}
                        className="flex items-center justify-center"
                      />
                    ) : (
                      <p className="text-xs text-gray-500 text-center">
                        Form temporarily unavailable.
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-end pt-1">
                    <Button
                      type="submit"
                      disabled={isSubmitting || !RECAPTCHA_V2_SITE_KEY.trim()}
                    >
                      {isSubmitting ? 'Submitting…' : 'Submit'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

