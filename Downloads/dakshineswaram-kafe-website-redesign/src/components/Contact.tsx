import { useEffect, useRef, useState, type FormEvent } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Building2, Store, User, IndianRupee, MessageSquare, ChevronDown } from "lucide-react";
import { CONTACT } from "../data";
import MagneticButton from "./MagneticButton";
import { gsap } from "../lib/gsap";

type Errors = Partial<Record<"name" | "phone" | "city" | "invest", string>>;

const inputBase =
  "w-full rounded-xl border bg-ivory px-4 py-3.5 pl-11 text-[0.85rem] text-ink placeholder-coffee/45 outline-none transition-all duration-300 focus:border-brand focus:ring-2 focus:ring-brand/25";
const okBorder = "border-ink/15";
const errBorder = "border-brand bg-[#fdf0ec]";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", phone: "", city: "", invest: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-reveal",
        { y: 56, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power4.out", scrollTrigger: { trigger: ".contact-copy", start: "top 78%" } }
      );
      gsap.fromTo(
        ".contact-form-card",
        { y: 70, opacity: 0, rotateX: -12 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1, ease: "power4.out", scrollTrigger: { trigger: ".contact-form-card", start: "top 80%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const validate = (): Errors => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = "Please enter your full name.";
    const digits = form.phone.replace(/[^\d]/g, "");
    if (digits.length < 10 || digits.length > 13) e.phone = "Enter a valid phone number (10–13 digits).";
    if (form.city.trim().length < 2) e.city = "Please tell us your preferred city.";
    if (!form.invest) e.invest = "Please choose an investment range.";
    return e;
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    setTouched(true);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    const ref = "DK-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    try {
      const prev = JSON.parse(localStorage.getItem("dk-franchise-enquiries") || "[]");
      localStorage.setItem("dk-franchise-enquiries", JSON.stringify([...prev, { ...form, ref, at: Date.now() }]));
    } catch { /* private mode */ }
    setSubmitted(ref);
  };

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm({ ...form, [key]: e.target.value });
      if (touched) setErrors(validate());
    },
  });

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden bg-cream py-20 sm:py-24">
      <span aria-hidden="true" className="pointer-events-none absolute -right-4 bottom-6 select-none font-display text-[15vw] font-black leading-none text-brand/[0.06]">
        VISIT
      </span>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* ============ left — details ============ */}
        <div className="contact-copy">
          <p className="contact-reveal flex items-center gap-3 text-[0.62rem] font-extrabold uppercase tracking-[0.42em] text-brand">
            <span className="h-px w-10 bg-brand/60" /> Contact & Enquiries
          </p>
          <h2 className="contact-reveal mt-4 font-display text-[clamp(2rem,5.4vw,3.5rem)] font-semibold leading-[1.0] tracking-tight text-ink">
            Come Hungry,<br /><span className="italic text-brand">Leave Happy.</span>
          </h2>
          <p className="contact-reveal mt-5 max-w-md text-[0.92rem] leading-relaxed text-coffee/85">
            Questions about the menu, a catering request, or the franchise opportunity —
            the kafe family is always one call away.
          </p>

          {/* call / mail */}
          <div className="contact-reveal mt-8 grid gap-4 sm:grid-cols-2">
            <a href="tel:+916232163621" className="group rounded-2xl border border-ink/10 bg-paper p-5 transition-all duration-300 hover:border-brand/40 hover:shadow-card">
              <Phone size={20} strokeWidth={1.8} className="text-brand transition-transform duration-300 group-hover:-rotate-12" />
              <p className="mt-3 text-[0.55rem] font-extrabold uppercase tracking-[0.3em] text-coffee/55">Franchise Hotline</p>
              <p className="mt-1 font-display text-lg font-bold text-ink group-hover:text-brand">+91 62321 63621</p>
              <p className="mt-0.5 text-[0.68rem] text-coffee/65">Alternate: +91 89620 38794</p>
            </a>
            <a href="mailto:info@dakshineswaramkafe.com" className="group rounded-2xl border border-ink/10 bg-paper p-5 transition-all duration-300 hover:border-brand/40 hover:shadow-card">
              <Mail size={20} strokeWidth={1.8} className="text-brand transition-transform duration-300 group-hover:-rotate-6" />
              <p className="mt-3 text-[0.55rem] font-extrabold uppercase tracking-[0.3em] text-coffee/55">Write To Us</p>
              <p className="mt-1 break-all text-[0.82rem] font-bold text-ink group-hover:text-brand">info@dakshineswaramkafe.com</p>
              <p className="mt-0.5 text-[0.68rem] text-coffee/65">We reply within one working day</p>
            </a>
          </div>

          {/* offices */}
          <div className="contact-reveal mt-5 space-y-4">
            {[
              { icon: Building2, label: "Head Office — Indore", addr: CONTACT.headOffice },
              { icon: Store, label: "Corporate Office — Mumbai", addr: CONTACT.corporateOffice },
            ].map(({ icon: Icon, label, addr }) => (
              <div key={label} className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-paper p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand"><Icon size={20} strokeWidth={1.8} /></span>
                <span>
                  <p className="text-[0.55rem] font-extrabold uppercase tracking-[0.3em] text-coffee/55">{label}</p>
                  <p className="mt-1 text-[0.78rem] leading-snug text-ink/90">{addr}</p>
                </span>
              </div>
            ))}
            <div className="flex items-center gap-4 rounded-2xl border border-gold/50 bg-gold/10 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold/25 text-brand-deep"><Clock size={20} strokeWidth={1.8} /></span>
              <span>
                <p className="text-[0.55rem] font-extrabold uppercase tracking-[0.3em] text-coffee/55">Kitchen Hours</p>
                <p className="mt-1 text-[0.82rem] font-bold text-ink">{CONTACT.hours}</p>
              </span>
            </div>
          </div>
        </div>

        {/* ============ right — franchise enquiry form ============ */}
        <div className="contact-form-card relative">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-ink p-6 shadow-lift sm:p-8">
            <div className="dot-pattern pointer-events-none absolute inset-0 opacity-25" />
            {submitted ? (
              /* ---------- success state ---------- */
              <div className="relative flex flex-col items-center py-10 text-center">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-leaf/40 ring-2 ring-gold/50">
                  <CheckCircle2 size={40} strokeWidth={1.6} className="text-gold-soft" />
                </span>
                <h3 className="mt-6 font-display text-3xl font-semibold text-ivory">Enquiry Received!</h3>
                <p className="mt-3 max-w-sm text-[0.85rem] leading-relaxed text-ivory/75">
                  Thank you, <span className="font-bold text-ivory">{form.name.trim().split(" ")[0]}</span>. Our franchise
                  team will reach out within one working day to walk you through the opportunity.
                </p>
                <div className="mt-6 rounded-2xl border border-gold/35 bg-gold/10 px-6 py-4">
                  <p className="text-[0.55rem] font-extrabold uppercase tracking-[0.35em] text-gold-soft">Your Reference</p>
                  <p className="mt-1 font-mono text-xl font-bold tracking-[0.2em] text-ivory">{submitted}</p>
                </div>
                <button
                  onClick={() => { setSubmitted(null); setForm({ name: "", phone: "", city: "", invest: "", message: "" }); setTouched(false); setErrors({}); }}
                  className="mt-7 text-[0.68rem] font-extrabold uppercase tracking-[0.3em] text-gold-soft underline-offset-4 hover:underline"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              /* ---------- form ---------- */
              <form onSubmit={onSubmit} noValidate className="relative">
                <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.42em] text-gold">Franchise Enquiry</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ivory sm:text-[1.75rem]">Become a Franchise Partner</h3>
                <p className="mt-1.5 text-[0.72rem] text-ivory/60">Fill in your details — our expansion team will call you back.</p>

                <div className="mt-6 space-y-4">
                  {/* name */}
                  <div>
                    <div className="relative">
                      <User size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-coffee/45" />
                      <input {...field("name")} type="text" placeholder="Your full name" aria-label="Full name" className={`${inputBase} ${errors.name ? errBorder : okBorder}`} />
                    </div>
                    {errors.name && <p className="mt-1.5 pl-1 text-[0.68rem] font-semibold text-[#ffb4a6]">{errors.name}</p>}
                  </div>

                  {/* phone + city */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="relative">
                        <Phone size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-coffee/45" />
                        <input {...field("phone")} type="tel" placeholder="+91 98XXX XXXXX" aria-label="Phone number" className={`${inputBase} ${errors.phone ? errBorder : okBorder}`} />
                      </div>
                      {errors.phone && <p className="mt-1.5 pl-1 text-[0.68rem] font-semibold text-[#ffb4a6]">{errors.phone}</p>}
                    </div>
                    <div>
                      <div className="relative">
                        <MapPin size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-coffee/45" />
                        <input {...field("city")} type="text" placeholder="Preferred city" aria-label="Preferred city" className={`${inputBase} ${errors.city ? errBorder : okBorder}`} />
                      </div>
                      {errors.city && <p className="mt-1.5 pl-1 text-[0.68rem] font-semibold text-[#ffb4a6]">{errors.city}</p>}
                    </div>
                  </div>

                  {/* investment */}
                  <div>
                    <div className="relative">
                      <IndianRupee size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-coffee/45" />
                      <select {...field("invest")} aria-label="Investment range" className={`${inputBase} appearance-none ${form.invest ? "text-ink" : "text-coffee/45"} ${errors.invest ? errBorder : okBorder}`}>
                        <option value="" disabled>Investment range (₹)</option>
                        <option>₹10–15 Lakhs</option>
                        <option>₹15–25 Lakhs</option>
                        <option>₹25–40 Lakhs</option>
                        <option>₹40 Lakhs+</option>
                      </select>
                      <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-coffee/45" />
                    </div>
                    {errors.invest && <p className="mt-1.5 pl-1 text-[0.68rem] font-semibold text-[#ffb4a6]">{errors.invest}</p>}
                  </div>

                  {/* message */}
                  <div className="relative">
                    <MessageSquare size={17} className="pointer-events-none absolute left-4 top-4 text-coffee/45" />
                    <textarea {...field("message")} rows={3} placeholder="Anything we should know? (optional)" aria-label="Your message" className={`${inputBase} resize-none border-ink/15`} />
                  </div>

                  <MagneticButton
                    type="submit"
                    className="group flex w-full items-center justify-center gap-3 rounded-xl bg-brand py-4 text-[0.75rem] font-extrabold uppercase tracking-[0.25em] text-ivory transition-colors hover:bg-brand-deep"
                    ariaLabel="Submit franchise enquiry"
                  >
                    Submit Enquiry
                    <Send size={16} strokeWidth={2.2} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </MagneticButton>
                  <p className="text-center text-[0.6rem] text-ivory/40">By submitting you agree to our terms of enquiry. No spam — only dosa.</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
