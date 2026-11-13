import { useEffect, useMemo, useState, type ReactNode, type RefObject } from 'react';
import { company, whatsappLink } from '@/data/site';
import { ArrowIcon, CheckIcon } from '@/components/Icons';
import { toast } from '@/ui/feedback';
import { kindOf, type Listing } from '@/listings/data';
import { recordViewing, type Viewing } from '@/listings/store';

const STEPS = ['Viewing', 'Your details', 'Review'] as const;
const TIMES = ['09:30', '11:00', '13:00', '14:30', '16:00'];
const MODES = [
  { id: 'In person', note: 'Walk the property with an adviser.' },
  { id: 'Video call', note: 'A live walk-through on your phone.' },
];
const CHIP =
  'min-h-12 rounded-2xl border px-4 text-left text-sm font-medium transition-colors duration-200 aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-canvas border-ink/15 bg-white/60 text-ink hover:border-ink/50';
const FIELD = 'w-full rounded-2xl border bg-white/70 px-4 py-3.5 text-base text-ink outline-none transition-colors duration-200 placeholder:text-ink-2/55 focus:border-ink';
export const PRIMARY =
  'inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-ink px-7 text-sm font-semibold text-canvas no-underline transition-colors duration-200 hover:bg-gold hover:text-ink disabled:cursor-not-allowed disabled:bg-ink/25 disabled:text-canvas disabled:hover:bg-ink/25';
export const QUIET =
  'inline-flex min-h-13 items-center justify-center gap-3 rounded-full border border-ink/20 px-6 text-sm font-semibold text-ink no-underline transition-colors duration-200 hover:border-ink';

function nextDays() {
  const out: { key: string; label: string }[] = [];
  const d = new Date();
  while (out.length < 6) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) continue;
    out.push({ key: d.toISOString().slice(0, 10), label: d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }) });
  }
  return out;
}

interface Form {
  name: string;
  phone: string;
  email: string;
  note: string;
  agree: boolean;
}

function check(f: Form) {
  const e: Partial<Record<keyof Form, string>> = {};
  if (f.name.trim().length < 2) e.name = 'Enter your name so we know who to expect.';
  if (!/^[+\d][\d\s()-]{6,}$/.test(f.phone.trim())) e.phone = 'Enter a phone or WhatsApp number we can reach you on.';
  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Enter an email address like name@example.com.';
  if (!f.agree) e.agree = 'Tick the box so the team may contact you about this viewing.';
  return e;
}

function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-sm font-medium text-ink">
        {label}
        {hint && <span className="text-xs font-normal text-ink-2">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="m-0 text-sm text-[#a3242f]">
          {error}
        </p>
      )}
    </div>
  );
}

const message = (v: Viewing, listing: Listing) =>
  [
    'Hello Hills, I would like to book a viewing.',
    `Reference: ${v.reference}`,
    `Property: ${listing.name} (${kindOf(listing)})`,
    `Viewing: ${v.mode}, ${v.when}`,
    `Name: ${v.name}`,
    `Phone: ${v.phone}`,
    v.email && `Email: ${v.email}`,
    v.note && `Note: ${v.note}`,
  ]
    .filter(Boolean)
    .join('\n');

interface Props {
  listing: Listing;
  dirty: RefObject<boolean>;
  onBack: () => void;
  onDone: () => void;
}

/** Three short steps to request a property viewing. */
export function Checkout({ listing, dirty, onBack, onDone }: Props) {
  const days = useMemo(nextDays, []);
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState(MODES[0]!.id);
  const [day, setDay] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [form, setForm] = useState<Form>({ name: '', phone: '', email: '', note: '', agree: false });
  const [tried, setTried] = useState(false);
  const [done, setDone] = useState<Viewing | null>(null);

  const when = day && time ? `${days.find((d) => d.key === day)?.label} at ${time}` : null;
  const errors = check(form);
  const shown = tried ? errors : {};

  useEffect(() => {
    dirty.current = !done && (day !== null || time !== null || form.name !== '' || form.phone !== '');
  }, [dirty, done, day, time, form.name, form.phone]);

  useEffect(() => {
    document.querySelector('[data-drawer-scroll]')?.scrollTo({ top: 0 });
  }, [step, done]);

  const put = (patch: Partial<Form>) => setForm((f) => ({ ...f, ...patch }));

  const confirmRequest = () => {
    if (!when) return;
    setDone(recordViewing({ listing: listing.id, mode, when, name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim(), note: form.note.trim() }));
  };

  if (done) {
    const text = message(done, listing);
    return (
      <div className="grid gap-7 motion-safe:animate-[rise_0.6s_cubic-bezier(0.32,0.72,0,1)_both]">
        <span className="grid size-14 place-items-center rounded-full bg-ink text-canvas">
          <CheckIcon width={22} height={22} />
        </span>
        <div>
          <h3 className="m-0 font-display text-[clamp(2.2rem,3.4vw,3.2rem)] font-normal leading-none">One step left: send it.</h3>
          <p className="mb-0 mt-3 max-w-[46ch] text-base leading-relaxed text-ink-2">
            Your request is saved on this device. Send it to the Hills team so an adviser can confirm the time with you.
          </p>
        </div>
        <dl className="glass-tile m-0 grid gap-4 rounded-3xl p-6">
          {[
            ['Reference', done.reference],
            ['Property', listing.name],
            ['Viewing', `${done.mode}, ${done.when}`],
            ['Contact', `${done.name}, ${done.phone}`],
          ].map(([k, v]) => (
            <div key={k} className="grid gap-1 min-[520px]:grid-cols-[7rem_1fr]">
              <dt className="text-sm text-ink-2">{k}</dt>
              <dd className="m-0 text-base font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap gap-3">
          <a href={whatsappLink(text)} target="_blank" rel="noreferrer" className={PRIMARY}>
            Send on WhatsApp <ArrowIcon />
          </a>
          <a href={`mailto:${company.email}?subject=${encodeURIComponent(`Viewing request ${done.reference}`)}&body=${encodeURIComponent(text)}`} className={QUIET}>
            Send by email
          </a>
          <button
            type="button"
            className={QUIET}
            onClick={() => {
              void navigator.clipboard?.writeText(done.reference).then(
                () => toast('Reference copied'),
                () => toast(`Your reference is ${done.reference}`),
              );
            }}
          >
            Copy reference
          </button>
        </div>
        <button type="button" onClick={onDone} className="w-fit text-sm font-medium text-ink-2 underline underline-offset-4 hover:text-ink">
          Back to the listing
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-8">
      <div>
        <button type="button" onClick={step === 0 ? onBack : () => setStep(step - 1)} className="mb-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink-2 hover:text-ink">
          <ArrowIcon width={14} height={14} className="rotate-180" />
          {step === 0 ? 'Back to the listing' : `Back to ${STEPS[step - 1]?.toLowerCase()}`}
        </button>
        <p className="m-0 mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-2">Book a viewing</p>
        <h3 className="m-0 font-display text-[clamp(2.2rem,3.4vw,3.2rem)] font-normal leading-none">{listing.name}</h3>
      </div>

      <ol aria-label="Progress" className="m-0 grid list-none grid-cols-3 gap-2 p-0">
        {STEPS.map((s, i) => (
          <li key={s} aria-current={i === step ? 'step' : undefined} className="grid gap-2">
            <span className={`block h-1 rounded-full transition-colors duration-500 ${i <= step ? 'bg-ink' : 'bg-ink/12'}`} />
            <span className={`text-xs font-medium ${i <= step ? 'text-ink' : 'text-ink-2/70'}`}>
              {i + 1}. {s}
            </span>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div className="grid gap-7 motion-safe:animate-[rise_0.6s_cubic-bezier(0.32,0.72,0,1)_both]">
          <fieldset className="m-0 grid gap-3 border-0 p-0">
            <legend className="mb-3 p-0 text-sm font-medium">How would you like to view it?</legend>
            <div className="grid gap-3 min-[520px]:grid-cols-2">
              {MODES.map((m) => (
                <button key={m.id} type="button" aria-pressed={mode === m.id} onClick={() => setMode(m.id)} className={`${CHIP} group/chip grid gap-1 py-3.5`}>
                  {m.id}
                  <span className="text-xs font-normal opacity-70">{m.note}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-3 p-0 text-sm font-medium">Choose a day</legend>
            <div className="grid grid-cols-2 gap-2.5 min-[520px]:grid-cols-3">
              {days.map((d) => (
                <button key={d.key} type="button" aria-pressed={day === d.key} onClick={() => setDay(d.key)} className={CHIP}>
                  {d.label}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-3 p-0 text-sm font-medium">Choose a time</legend>
            <div className="flex flex-wrap gap-2.5">
              {TIMES.map((t) => (
                <button key={t} type="button" aria-pressed={time === t} onClick={() => setTime(t)} className={`${CHIP} text-center`}>
                  {t}
                </button>
              ))}
            </div>
            <p className="mb-0 mt-3 text-xs text-ink-2">{company.hours}. Times are requests until an adviser confirms.</p>
          </fieldset>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <p aria-live="polite" className="m-0 text-sm text-ink-2">
              {when ? `${mode}, ${when}` : 'Choose a day and a time to continue.'}
            </p>
            <button type="button" disabled={!when} onClick={() => setStep(1)} className={PRIMARY}>
              Continue <ArrowIcon />
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <form
          noValidate
          className="grid gap-5 motion-safe:animate-[rise_0.6s_cubic-bezier(0.32,0.72,0,1)_both]"
          onSubmit={(e) => {
            e.preventDefault();
            setTried(true);
            if (Object.keys(errors).length === 0) setStep(2);
          }}
        >
          <Field id="v-name" label="Full name" error={shown.name}>
            <input id="v-name" data-autofocus="" autoComplete="name" value={form.name} onChange={(e) => put({ name: e.target.value })} aria-invalid={Boolean(shown.name)} aria-describedby={shown.name ? 'v-name-error' : undefined} className={`${FIELD} ${shown.name ? 'border-[#a3242f]' : 'border-ink/15'}`} />
          </Field>
          <Field id="v-phone" label="Phone or WhatsApp" error={shown.phone}>
            <input id="v-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+234" value={form.phone} onChange={(e) => put({ phone: e.target.value })} aria-invalid={Boolean(shown.phone)} aria-describedby={shown.phone ? 'v-phone-error' : undefined} className={`${FIELD} ${shown.phone ? 'border-[#a3242f]' : 'border-ink/15'}`} />
          </Field>
          <Field id="v-email" label="Email" hint="Optional" error={shown.email}>
            <input id="v-email" type="email" autoComplete="email" value={form.email} onChange={(e) => put({ email: e.target.value })} aria-invalid={Boolean(shown.email)} aria-describedby={shown.email ? 'v-email-error' : undefined} className={`${FIELD} ${shown.email ? 'border-[#a3242f]' : 'border-ink/15'}`} />
          </Field>
          <Field id="v-note" label="Anything we should know?" hint="Optional">
            <textarea id="v-note" rows={3} value={form.note} onChange={(e) => put({ note: e.target.value })} className={`${FIELD} resize-none border-ink/15`} />
          </Field>
          <div className="grid gap-2">
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-snug text-ink">
              <input type="checkbox" checked={form.agree} onChange={(e) => put({ agree: e.target.checked })} className="mt-0.5 size-5 shrink-0 accent-[#0b1733]" />
              Hills may contact me by phone, WhatsApp or email about this viewing.
            </label>
            {shown.agree && <p className="m-0 text-sm text-[#a3242f]">{shown.agree}</p>}
          </div>
          <div className="flex justify-end border-t border-line pt-6">
            <button type="submit" className={PRIMARY}>
              Review request <ArrowIcon />
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <div className="grid gap-5 motion-safe:animate-[rise_0.6s_cubic-bezier(0.32,0.72,0,1)_both]">
          <dl className="glass-tile m-0 grid gap-4 rounded-3xl p-6">
            {[
              ['Property', `${listing.name} (${kindOf(listing)})`],
              ['Viewing', `${mode}, ${when ?? ''}`],
              ['Name', form.name],
              ['Phone', form.phone],
              ...(form.email ? [['Email', form.email]] : []),
              ...(form.note ? [['Note', form.note]] : []),
            ].map(([k, v]) => (
              <div key={k} className="grid gap-1 min-[520px]:grid-cols-[7rem_1fr]">
                <dt className="text-sm text-ink-2">{k}</dt>
                <dd className="m-0 break-words text-base font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="glass-tile rounded-3xl p-6">
            <p className="m-0 flex items-center justify-between gap-4 text-base font-medium">
              Payment
              <span className="rounded-full bg-ink/8 px-3 py-1 text-xs font-semibold">Nothing to pay now</span>
            </p>
            <p className="mb-0 mt-2 text-sm leading-relaxed text-ink-2">
              Online payment is not connected on this site yet, so no card is taken here. If a deposit applies to this property, your adviser will tell you before the viewing.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <p className="m-0 max-w-[30ch] text-sm text-ink-2">You will get a reference to send to the team.</p>
            <button type="button" onClick={confirmRequest} className={PRIMARY}>
              Confirm request <ArrowIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
