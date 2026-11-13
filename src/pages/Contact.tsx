import { useRef, useState } from 'react';
import { usePageMotion } from '@/motion/page';
import { company, whatsappLink } from '@/data/site';
import { ArrowIcon } from '@/components/Icons';
import { toast } from '@/ui/feedback';

const LINK = 'text-ink no-underline underline-offset-4 hover:underline';
const FIELD = 'w-full rounded-2xl border bg-white/70 px-4 py-3.5 text-base text-ink outline-none transition-colors duration-200 placeholder:text-ink-2/55 focus:border-ink';
const TOPICS = ['Buying a home or apartment', 'Land and plots', 'Estate developments', 'Commercial space', 'Property management', 'Investment', 'Advisory', 'Something else'];
const BAD = 'border-[#a3242f]';
const OK = 'border-ink/15';

export function Contact() {
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root);
  const [form, setForm] = useState({ name: '', phone: '', topic: TOPICS[0]!, message: '' });
  const [tried, setTried] = useState(false);
  const errors = {
    name: form.name.trim().length < 2 ? 'Enter your name so we know who is asking.' : '',
    phone: /^[+\d][\d\s()-]{6,}$/.test(form.phone.trim()) ? '' : 'Enter a phone or WhatsApp number we can reach you on.',
    message: form.message.trim().length < 5 ? 'Tell us briefly what you need.' : '',
  };
  const shown = tried ? errors : { name: '', phone: '', message: '' };
  const text = `Hello Hills.\nName: ${form.name.trim()}\nPhone: ${form.phone.trim()}\nAbout: ${form.topic}\n\n${form.message.trim()}`;
  const valid = !errors.name && !errors.phone && !errors.message;

  const send = (how: 'whatsapp' | 'email') => {
    setTried(true);
    if (!valid) {
      toast('Check the highlighted fields first');
      return;
    }
    if (how === 'whatsapp') window.open(whatsappLink(text), '_blank', 'noopener');
    else window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(`Enquiry: ${form.topic}`)}&body=${encodeURIComponent(text)}`;
    toast(how === 'whatsapp' ? 'Opening WhatsApp with your message' : 'Opening your email app with your message');
  };

  return (
    <div ref={root} className="px-[max(1.25rem,3.5vw)] pb-28 pt-36">
      <div className="mx-auto max-w-[96rem]">
        <p data-fade="" className="m-0 mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-ink-2">
          Contact
        </p>
        <h1 data-lines="" className="m-0 mb-16 max-w-[12ch] font-display text-[clamp(3rem,8vw,8rem)] font-normal leading-[0.92] tracking-[-0.02em]">
          Let us talk.
        </h1>
        <div className="grid gap-14 min-[900px]:grid-cols-[1.1fr_1fr]">
          <form
            data-fade=""
            noValidate
            aria-label="Send an enquiry"
            className="grid content-start gap-5 rounded-[1.75rem] bg-paper p-6 min-[600px]:p-10"
            onSubmit={(e) => {
              e.preventDefault();
              send('whatsapp');
            }}
          >
            <h2 className="m-0 font-display text-[clamp(1.8rem,2.6vw,2.4rem)] font-normal leading-none">Send an enquiry</h2>
            <p className="m-0 mb-2 max-w-[44ch] text-[0.95rem] leading-relaxed text-ink-2">Fill this in and it opens as a ready message to the Hills team, on WhatsApp or by email.</p>
            <div className="grid gap-5 min-[600px]:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="c-name" className="text-sm font-medium">
                  Full name
                </label>
                <input id="c-name" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-invalid={Boolean(shown.name)} aria-describedby={shown.name ? 'c-name-error' : undefined} className={`${FIELD} ${shown.name ? BAD : OK}`} />
                {shown.name && (
                  <p id="c-name-error" className="m-0 text-sm text-[#a3242f]">
                    {shown.name}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <label htmlFor="c-phone" className="text-sm font-medium">
                  Phone or WhatsApp
                </label>
                <input id="c-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+234" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} aria-invalid={Boolean(shown.phone)} aria-describedby={shown.phone ? 'c-phone-error' : undefined} className={`${FIELD} ${shown.phone ? BAD : OK}`} />
                {shown.phone && (
                  <p id="c-phone-error" className="m-0 text-sm text-[#a3242f]">
                    {shown.phone}
                  </p>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="c-topic" className="text-sm font-medium">
                What is it about?
              </label>
              <select id="c-topic" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className={`${FIELD} ${OK}`}>
                {TOPICS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="c-message" className="text-sm font-medium">
                Your message
              </label>
              <textarea id="c-message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} aria-invalid={Boolean(shown.message)} aria-describedby={shown.message ? 'c-message-error' : undefined} className={`${FIELD} resize-none ${shown.message ? BAD : OK}`} />
              {shown.message && (
                <p id="c-message-error" className="m-0 text-sm text-[#a3242f]">
                  {shown.message}
                </p>
              )}
            </div>
            <div className="mt-2 flex flex-wrap gap-3">
              <button type="submit" className="inline-flex min-h-13 items-center gap-3 rounded-full bg-ink px-7 text-sm font-semibold text-canvas transition-colors duration-200 hover:bg-gold hover:text-ink">
                Send on WhatsApp <ArrowIcon />
              </button>
              <button type="button" onClick={() => send('email')} className="inline-flex min-h-13 items-center rounded-full border border-ink/20 px-6 text-sm font-semibold text-ink transition-colors duration-200 hover:border-ink">
                Send by email
              </button>
            </div>
          </form>
          <div className="grid content-start gap-10">
            <dl className="m-0 grid content-start">
              {[
                ['Visit', <>{company.address}</>],
                ['Hours', <>{company.hours}</>],
                ['Phone', <a className={LINK} href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a>],
                ['Email', <a className={`${LINK} break-all`} href={`mailto:${company.email}`}>{company.email}</a>],
              ].map(([k, v]) => (
                <div key={String(k)} data-fade="" className="grid gap-1 border-t border-line py-6 min-[600px]:grid-cols-[7rem_1fr]">
                  <dt className="text-sm text-ink-2">{k}</dt>
                  <dd className="m-0 font-display text-[clamp(1.4rem,2vw,1.9rem)] leading-tight">{v}</dd>
                </div>
              ))}
              <div data-fade="" className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
                <span className="text-sm text-ink-2">Follow Hills</span>
                {company.social.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-sm font-medium text-ink underline underline-offset-4 hover:text-gold">
                    {s.label}
                  </a>
                ))}
              </div>
            </dl>
            <div data-clip="" className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-ink/10">
              <img src="/pictures/entrance.webp" alt="A Hills entrance, representative picture" loading="lazy" className="absolute inset-0 size-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
