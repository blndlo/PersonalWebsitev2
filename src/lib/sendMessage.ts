import emailjs from '@emailjs/browser';

import { profile } from '@/data/profile';

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type SendResult = 'sent' | 'mailto' | 'throttled';

// EmailJS keys come from .env.local (see .env.example). They are public by
// design and end up in the bundle; abuse is limited by the rate limit and
// headless-browser block below, and by the template's fixed "To" address.
const {
  VITE_EMAILJS_SERVICE_ID: serviceId,
  VITE_EMAILJS_TEMPLATE_ID: templateId,
  VITE_EMAILJS_PUBLIC_KEY: publicKey,
} = import.meta.env;

/** One message per minute per browser */
const THROTTLE_MS = 60_000;

/**
 * Sends via EmailJS when configured. Otherwise falls back to opening the
 * visitor's email app with the message pre-filled, so the form still works.
 */
export async function sendMessage(msg: ContactMessage): Promise<SendResult> {
  if (serviceId && templateId && publicKey) {
    // Variable names must match the EmailJS "Contact Us" template:
    // {{name}}, {{email}} (Reply To), {{title}} (Subject), {{message}}, {{time}}
    const templateParams = {
      name: msg.name,
      email: msg.email,
      title: msg.subject,
      message: msg.message,
      time: new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' }),
    };
    try {
      await emailjs.send(serviceId, templateId, templateParams, {
        publicKey,
        blockHeadless: true,
        limitRate: { id: 'contact-form', throttle: THROTTLE_MS },
      });
    } catch (error) {
      if ((error as { status?: number }).status === 429) return 'throttled';
      throw error;
    }
    return 'sent';
  }

  const body = `${msg.message}\n\n— ${msg.name} (${msg.email})`;
  window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
    msg.subject,
  )}&body=${encodeURIComponent(body)}`;
  return 'mailto';
}
