import { useMemo, useState } from 'react';
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

  const positions = useMemo(
    () => ['Manager', 'Server', 'Bartender', 'Buss Person', 'Cooks', 'Dishwasher'],
    []
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Wire up to your backend/email service later.
      await new Promise((r) => setTimeout(r, 350));
      setForm(initialState);
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
                      required
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
                    />
                  </div>

                  <div className="flex items-center justify-end pt-1">
                    <Button type="submit" disabled={isSubmitting}>
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

