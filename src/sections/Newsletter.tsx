import { useState } from 'react';
import type { FormEvent } from 'react';
import { subscribeToNewsletter } from '../newsletter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailOptIn, setEmailOptIn] = useState(true);
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    const result = await subscribeToNewsletter({
      email: email,
      phone_number: phone,
      email_opt_in: emailOptIn,
      sms_opt_in: smsOptIn,
    });

    setMessage(result.message);
    if (result.success) {
      setStatus('success');
      setEmail('');
      setPhone('');
    } else {
      setStatus('error');
    }
  };

  return (
    <section id="newsletter" className="bg-vega-bg-dark py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
          Join Our Newsletter
        </h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">
          Stay updated with our latest news, special offers, and exclusive events.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
            />
            <Input
              type="tel"
              placeholder="Your Phone Number (for SMS)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={status === 'loading'}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white">
            <div className="flex items-center gap-2">
              <Checkbox
                id="emailOptIn"
                checked={emailOptIn}
                onCheckedChange={(checked) => setEmailOptIn(Boolean(checked))}
                disabled={status === 'loading'}
                className="border-white/50 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
              />
              <Label htmlFor="emailOptIn">Email Updates</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="smsOptIn"
                checked={smsOptIn}
                onCheckedChange={(checked) => setSmsOptIn(Boolean(checked))}
                disabled={status === 'loading'}
                className="border-white/50 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
              />
              <Label htmlFor="smsOptIn">SMS Alerts</Label>
            </div>
          </div>
          <div>
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              disabled={status === 'loading'}
              className="w-full sm:w-auto"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </div>
        </form>

        {message && (
          <p className={`mt-4 text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}
      </div>
    </section>
  );
}