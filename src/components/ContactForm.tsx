import { useState, type ChangeEvent, type FormEvent } from 'react';
import { CheckCircle } from '@phosphor-icons/react';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { profile } from '@/data/profile';
import { sendMessage, type ContactMessage, type SendResult } from '@/lib/sendMessage';

type Status = 'idle' | 'sending' | 'invalid' | 'error' | SendResult;

const emptyForm: ContactMessage = { name: '', email: '', subject: '', message: '' };

const fieldClass = 'mt-1 rounded-sm';

export default function ContactForm() {
  const [form, setForm] = useState<ContactMessage>(emptyForm);
  // Honeypot: hidden from people, bots tend to fill it in.
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  function update(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    // Clear the previous result banner once the visitor starts a new message
    if (status !== 'idle' && status !== 'sending') setStatus('idle');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (website) {
      setStatus('sent'); // silently drop bot submissions
      return;
    }

    // `required` lets whitespace-only values through, so validate after trimming
    const trimmed: ContactMessage = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };
    if (Object.values(trimmed).some((value) => value === '')) {
      setStatus('invalid');
      return;
    }

    setStatus('sending');
    try {
      const result = await sendMessage(trimmed);
      setStatus(result);
      if (result === 'sent') setForm(emptyForm);
    } catch {
      setStatus('error');
    }
  }

  return (
    <Card className="w-full rounded-md md:max-w-2xl md:flex-1">
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <div>
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              aria-invalid={status === 'invalid' && !form.name.trim()}
              aria-describedby={status === 'invalid' ? 'form-error' : undefined}
              name="name"
              required
              maxLength={100}
              autoComplete="name"
              placeholder="Your full name"
              value={form.name}
              onChange={update}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              aria-invalid={status === 'invalid' && !form.email.trim()}
              aria-describedby={status === 'invalid' ? 'form-error' : undefined}
              name="email"
              type="email"
              required
              maxLength={200}
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={update}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="subject">Subject</label>
            <Input
              id="subject"
              aria-invalid={status === 'invalid' && !form.subject.trim()}
              aria-describedby={status === 'invalid' ? 'form-error' : undefined}
              name="subject"
              required
              maxLength={150}
              placeholder="What's this about?"
              value={form.subject}
              onChange={update}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              aria-invalid={status === 'invalid' && !form.message.trim()}
              aria-describedby={status === 'invalid' ? 'form-error' : undefined}
              name="message"
              required
              rows={6}
              maxLength={5000}
              placeholder="Write your message here..."
              value={form.message}
              onChange={update}
              className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 mt-1 w-full resize-y rounded-sm border bg-transparent px-2.5 py-2 text-xs outline-none focus-visible:ring-1"
            />
          </div>

          {/* Honeypot field — keep it visually hidden, not display:none */}
          <div aria-hidden="true" className="absolute -left-[9999px]">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </div>

          <Button type="submit" className="rounded-sm" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </Button>

          <div aria-live="polite">
            {status === 'sent' && (
              <div className="flex items-center gap-3 rounded-md border border-emerald-300 bg-emerald-50 p-3 text-emerald-900">
                <CheckCircle size={20} aria-hidden="true" />
                <div>
                  <p className="font-bold">Message sent!</p>
                  <p>I'll get back to you within 24 hours.</p>
                </div>
              </div>
            )}
            {status === 'mailto' && (
              <p className="text-muted-foreground">
                Your email app should open with the message ready to send. If it doesn't, email me
                at{' '}
                <a href={`mailto:${profile.email}`} className="underline">
                  {profile.email}
                </a>
                .
              </p>
            )}
            {status === 'invalid' && (
              <p id="form-error" className="text-destructive">
                Please fill in every field.
              </p>
            )}
            {status === 'throttled' && (
              <p className="text-destructive">
                Please wait a minute before sending another message.
              </p>
            )}
            {status === 'error' && (
              <p className="text-destructive">
                Something went wrong sending your message. Please try again in a minute or email me
                at{' '}
                <a href={`mailto:${profile.email}`} className="underline">
                  {profile.email}
                </a>
                .
              </p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
