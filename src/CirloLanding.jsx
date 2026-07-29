import React, { useState, useEffect, useRef } from "react";
import {
  Lightbulb,
  Vote,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  Check,
  ChevronDown,
  Sparkles,
  Calendar,
  BarChart3,
  Mail,
  Building2,
  X,
  Users,
  Star,
  RefreshCw,
} from "lucide-react";

/* ---------------------------------------------------------
   CIRCLO — Phase 1: Brand, Design System, Landing & Waitlist
   Token system:
   - Paper:   #F4F5F0  (cool, muted paper — not cream)
   - Ink:     #14201B  (deep forest-ink, not pure black)
   - Cobalt:  #2D4FFF  (primary — trust, motion)
   - Marigold:#FFB648  (secondary — community energy, votes)
   - Sage:    #6B8F71  (positive / success)
   - Line:    #E4E1D6  (hairline borders on paper)
   Type: Space Grotesk (display) / Inter (body) / IBM Plex Mono (data)
--------------------------------------------------------- */

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap');
`;

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(18px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Badge({ children, tone = "cobalt" }) {
  const tones = {
    cobalt: "bg-[#2D4FFF]/10 text-[#2D4FFF]",
    marigold: "bg-[#FFB648]/20 text-[#8A5A00]",
    sage: "bg-[#6B8F71]/15 text-[#3E5C43]",
    ink: "bg-[#14201B]/6 text-[#14201B]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-medium ${tones[tone]}`}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {children}
    </span>
  );
}

function Button({ children, variant = "primary", size = "md", onClick, type = "button", className = "" }) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 active:scale-[0.97] disabled:opacity-50";
  const sizes = { md: "px-5 py-2.5 text-[14.5px]", lg: "px-6 py-3.5 text-[15.5px]" };
  const variants = {
    primary: "bg-[#14201B] text-[#F4F5F0] hover:bg-[#2D4FFF] shadow-[0_1px_2px_rgba(20,32,27,0.15)]",
    secondary: "bg-white text-[#14201B] border border-[#E4E1D6] hover:border-[#14201B]/40",
    ghost: "text-[#14201B] hover:bg-[#14201B]/5",
    marigold: "bg-[#FFB648] text-[#3A2600] hover:bg-[#FFC468]",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      style={{ fontFamily: "Space Grotesk, sans-serif" }}
    >
      {children}
    </button>
  );
}

function SectionEyebrow({ children }) {
  return (
    <div
      className="text-[13px] tracking-[0.14em] uppercase text-[#6B8F71] font-semibold mb-3"
      style={{ fontFamily: "IBM Plex Mono, monospace" }}
    >
      {children}
    </div>
  );
}

/* ---------------- Hero visual: "Community Constellation" ---------------- */
function ConstellationVisual() {
  const dots = [
    { angle: 0, r: 128, size: 13, tone: "#2D4FFF", delay: "0s" },
    { angle: 45, r: 150, size: 9, tone: "#FFB648", delay: "0.4s" },
    { angle: 90, r: 118, size: 11, tone: "#6B8F71", delay: "0.8s" },
    { angle: 135, r: 145, size: 8, tone: "#2D4FFF", delay: "1.2s" },
    { angle: 180, r: 130, size: 12, tone: "#FFB648", delay: "0.2s" },
    { angle: 225, r: 122, size: 9, tone: "#6B8F71", delay: "1.6s" },
    { angle: 270, r: 150, size: 10, tone: "#2D4FFF", delay: "0.6s" },
    { angle: 315, r: 135, size: 8, tone: "#FFB648", delay: "1s" },
  ];
  return (
    <div className="relative w-full h-[360px] sm:h-[420px] flex items-center justify-center">
      <div className="absolute w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] rounded-full border border-[#14201B]/8" />
      <div className="absolute w-[220px] h-[220px] sm:w-[250px] sm:h-[250px] rounded-full border border-[#14201B]/10" />
      {dots.map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full orbit"
          style={{
            width: d.size,
            height: d.size,
            background: d.tone,
            transformOrigin: `0 0`,
            animation: `orbit 22s linear infinite`,
            animationDelay: d.delay,
            top: "50%",
            left: "50%",
            marginTop: -d.size / 2,
            marginLeft: -d.size / 2 + d.r,
            "--r": `${d.r}px`,
            "--start": `${d.angle}deg`,
          }}
        />
      ))}
      <div className="relative z-10 w-[190px] sm:w-[210px] bg-white rounded-2xl border border-[#E4E1D6] shadow-[0_12px_32px_rgba(20,32,27,0.10)] p-4">
        <div className="flex items-center justify-between mb-3">
          <Badge tone="sage">Live</Badge>
          <Calendar size={15} className="text-[#14201B]/40" />
        </div>
        <div className="text-[15px] font-semibold text-[#14201B] leading-snug" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          Rooftop Social
        </div>
        <div className="text-[12.5px] text-[#14201B]/50 mb-3">Fri · 62 voted this in</div>
        <div className="flex items-center gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="w-5 h-5 rounded-full bg-[#2D4FFF]/15 border border-white -ml-1.5 first:ml-0" />
          ))}
          <span className="text-[12px] text-[#14201B]/45 ml-1">+58</span>
        </div>
      </div>
      <style>{`
        @keyframes orbit {
          from { transform: rotate(var(--start)) translateX(var(--r)) rotate(calc(-1 * var(--start))); }
          to { transform: rotate(calc(var(--start) + 360deg)) translateX(var(--r)) rotate(calc(-1 * (var(--start) + 360deg))); }
        }
      `}</style>
    </div>
  );
}

/* ---------------- Waitlist Modal ---------------- */
function WaitlistModal({ open, mode, onClose }) {
  const [step, setStep] = useState("form");
  const [form, setForm] = useState({ name: "", email: "", org: "", role: "", message: "" });

  useEffect(() => {
    if (open) setStep("form");
  }, [open, mode]);

  if (!open) return null;

  const isDemo = mode === "demo";

  const submit = (e) => {
    e.preventDefault();
    if (!form.email) return;
    // Mock submission — structured for a future Supabase insert (waitlist / demo_requests table).
    setStep("success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div className="absolute inset-0 bg-[#14201B]/50 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative w-full sm:max-w-[440px] bg-[#F4F5F0] rounded-t-3xl sm:rounded-3xl border border-[#E4E1D6] p-7 sm:p-8 shadow-[0_24px_64px_rgba(20,32,27,0.25)] animate-modal-in">
        <button onClick={onClose} className="absolute top-5 right-5 text-[#14201B]/40 hover:text-[#14201B] transition-colors">
          <X size={18} />
        </button>

        {step === "form" && (
          <>
            <Badge tone={isDemo ? "marigold" : "cobalt"}>{isDemo ? "Request a demo" : "Join the waitlist"}</Badge>
            <h3
              className="text-[26px] leading-tight font-semibold text-[#14201B] mt-4 mb-2"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {isDemo ? "See Circlo in action" : "Get early access to Circlo"}
            </h3>
            <p className="text-[14.5px] text-[#14201B]/60 mb-6 leading-relaxed">
              {isDemo
                ? "Tell us about your community and we'll walk you through a live prototype."
                : "We're onboarding communities in small batches. Drop your details and we'll reach out when it's your turn."}
            </p>
            <form onSubmit={submit} className="space-y-3.5">
              <div>
                <label className="text-[12.5px] font-medium text-[#14201B]/70 mb-1.5 block">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jordan Lee"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E1D6] bg-white text-[14.5px] outline-none focus:border-[#2D4FFF] transition-colors"
                />
              </div>
              <div>
                <label className="text-[12.5px] font-medium text-[#14201B]/70 mb-1.5 block">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jordan@yourcommunity.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E1D6] bg-white text-[14.5px] outline-none focus:border-[#2D4FFF] transition-colors"
                />
              </div>
              <div>
                <label className="text-[12.5px] font-medium text-[#14201B]/70 mb-1.5 block">Community or organisation</label>
                <input
                  value={form.org}
                  onChange={(e) => setForm({ ...form, org: e.target.value })}
                  placeholder="e.g. Warwick Hiking Society"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E1D6] bg-white text-[14.5px] outline-none focus:border-[#2D4FFF] transition-colors"
                />
              </div>
              {isDemo && (
                <div>
                  <label className="text-[12.5px] font-medium text-[#14201B]/70 mb-1.5 block">What would you like to see?</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Optional — e.g. how voting works for large groups"
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E1D6] bg-white text-[14.5px] outline-none focus:border-[#2D4FFF] transition-colors resize-none"
                  />
                </div>
              )}
              <Button type="submit" variant={isDemo ? "marigold" : "primary"} size="lg" className="w-full mt-2">
                {isDemo ? "Request demo" : "Join the waitlist"} <ArrowRight size={16} />
              </Button>
              <p className="text-[12px] text-[#14201B]/40 text-center pt-1">No spam. One email when your access opens up.</p>
            </form>
          </>
        )}

        {step === "success" && (
          <div className="py-4 text-center">
            <div className="w-14 h-14 rounded-full bg-[#6B8F71]/15 flex items-center justify-center mx-auto mb-5">
              <Check size={26} className="text-[#3E5C43]" />
            </div>
            <h3 className="text-[22px] font-semibold text-[#14201B] mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              {isDemo ? "Demo requested" : "You're on the list"}
            </h3>
            <p className="text-[14.5px] text-[#14201B]/60 mb-6 leading-relaxed">
              {isDemo
                ? `We'll email ${form.email || "you"} shortly to find a time that works.`
                : `We'll email ${form.email || "you"} as soon as ${form.org || "your community"} can get in.`}
            </p>
            <Button variant="secondary" onClick={onClose} className="w-full">
              Done
            </Button>
          </div>
        )}
      </div>
      <style>{`
        @keyframes modal-in { from { opacity: 0; transform: translateY(14px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-modal-in { animation: modal-in 0.28s cubic-bezier(0.16,1,0.3,1); }
      `}</style>
    </div>
  );
}

/* ---------------- Data ---------------- */
const PROBLEMS = [
  { icon: Lightbulb, title: "Guesswork replaces research", body: "Organisers plan from assumptions because there's no easy way to ask a whole community what it actually wants." },
  { icon: MessageSquare, title: "Feedback disappears", body: "Post-event surveys pile up unread. Good ideas get mentioned once, in a group chat, and never resurface." },
  { icon: TrendingUp, title: "Engagement is invisible", body: "There's no way to see who's excited about what until turnout on the night tells you — too late to change anything." },
];

const STEPS = [
  { n: "01", icon: Lightbulb, title: "Suggest", body: "Members drop ideas for what they want the community to do next — no account friction, just a quick submission." },
  { n: "02", icon: Vote, title: "Vote", body: "The community ranks what matters most. The loudest voices don't win — the most votes do." },
  { n: "03", icon: Calendar, title: "Attend", body: "Organisers build the event around what won, then everyone rates it — feeding straight into the next round." },
];

const ORG_BENEFITS = [
  { icon: Users, title: "Know your audience, not your assumptions", body: "See what your community actually wants before you commit time and budget to planning it." },
  { icon: TrendingUp, title: "Fewer flops, more sold-out events", body: "Events built around real demand fill up — because people asked for them in the first place." },
  { icon: BarChart3, title: "Data you can act on", body: "Ratings, popular ideas, and participation trends in one place, instead of scattered across chats and forms." },
];

const COMMUNITY_BENEFITS = [
  { icon: Sparkles, title: "Your ideas shape real events", body: "Suggest something once and watch it become a real event on the calendar — not a comment lost in a thread." },
  { icon: Vote, title: "One tap to vote", body: "No sign-up marathons. Voting on what happens next takes seconds." },
  { icon: RefreshCw, title: "See what's trending", body: "Browse what your community is talking about and rallying behind, in real time." },
];

const FAQS = [
  { q: "Is Circlo free while in beta?", a: "Yes. Every community that joins the waitlist gets full access at no cost while we build toward general availability." },
  { q: "Do members need to create an account to vote or suggest ideas?", a: "No. Community members can submit ideas, vote, and leave feedback with just an email — we keep the barrier to participation as low as possible." },
  { q: "Does Circlo replace how we already sell tickets or manage RSVPs?", a: "No — Circlo focuses on the planning conversation before and after your event. It's built to sit alongside whatever ticketing or RSVP tool you already use." },
  { q: "What kind of communities is this built for?", a: "Circlo works best for groups that run events repeatedly — university societies, sports clubs, networking communities, and brand-run community programmes." },
  { q: "When can we get access?", a: "We're onboarding communities in small batches so we can support each one properly. Join the waitlist and we'll reach out with your onboarding date." },
];

/* ---------------- Root ---------------- */
export default function CirloLanding() {
  const [modal, setModal] = useState({ open: false, mode: "waitlist" });
  const [openFaq, setOpenFaq] = useState(0);
  const [navShadow, setNavShadow] = useState(false);
  const scrollRef = useRef(null);

  const open = (mode) => setModal({ open: true, mode });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setNavShadow(el.scrollTop > 8);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const container = scrollRef.current;
    const target = container?.querySelector(`#${id}`);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      ref={scrollRef}
      className="w-full h-full min-h-[100vh] overflow-y-auto bg-[#F4F5F0] text-[#14201B]"
      style={{ fontFamily: "Inter, sans-serif", scrollBehavior: "smooth" }}
    >
      <style>{FONT_IMPORT}</style>

      {/* NAV */}
      <div
        className={`sticky top-0 z-40 bg-[#F4F5F0]/85 backdrop-blur-md border-b transition-shadow ${
          navShadow ? "border-[#E4E1D6] shadow-[0_1px_0_rgba(20,32,27,0.04)]" : "border-transparent"
        }`}
      >
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full border-[2.5px] border-[#14201B] relative flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#2D4FFF]" />
            </div>
            <span className="text-[17px] font-semibold tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Circlo
            </span>
          </div>
          <div className="hidden md:flex items-center gap-7 text-[14px] text-[#14201B]/65">
            <button onClick={() => scrollTo("solution")} className="hover:text-[#14201B] transition-colors">Product</button>
            <button onClick={() => scrollTo("how")} className="hover:text-[#14201B] transition-colors">How it works</button>
            <button onClick={() => scrollTo("pricing")} className="hover:text-[#14201B] transition-colors">Pricing</button>
            <button onClick={() => scrollTo("faq")} className="hover:text-[#14201B] transition-colors">FAQ</button>
          </div>
          <div className="flex items-center gap-2.5">
            <Button variant="ghost" size="md" onClick={() => open("demo")} className="hidden sm:inline-flex">
              Request a Demo
            </Button>
            <Button variant="primary" size="md" onClick={() => open("waitlist")}>
              Join the Waitlist
            </Button>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-8 grid lg:grid-cols-2 gap-10 items-center">
        <Reveal>
          <Badge tone="cobalt"><Sparkles size={13} /> Now building with early communities</Badge>
          <h1
            className="text-[38px] sm:text-[52px] leading-[1.06] font-semibold tracking-tight mt-5 mb-5"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Plan events with your community, <span className="text-[#2D4FFF]">not just for them.</span>
          </h1>
          <p className="text-[16.5px] sm:text-[17.5px] text-[#14201B]/65 leading-relaxed max-w-[480px] mb-8">
            Circlo turns member ideas and votes into a live planning loop — so organisers stop guessing what people want, and communities start shaping what happens next.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" size="lg" onClick={() => open("waitlist")}>
              Join the Waitlist <ArrowRight size={16} />
            </Button>
            <Button variant="secondary" size="lg" onClick={() => open("demo")}>
              Request a Demo
            </Button>
          </div>
          <div className="flex items-center gap-5 mt-8 text-[13px] text-[#14201B]/45">
            <span style={{ fontFamily: "IBM Plex Mono, monospace" }}>No credit card</span>
            <span className="w-1 h-1 rounded-full bg-[#14201B]/25" />
            <span style={{ fontFamily: "IBM Plex Mono, monospace" }}>Free during beta</span>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <ConstellationVisual />
        </Reveal>
      </section>

      {/* PROBLEM */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <Reveal>
          <SectionEyebrow>The problem</SectionEyebrow>
          <h2 className="text-[28px] sm:text-[36px] font-semibold tracking-tight max-w-[560px] mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Most events are planned by a few people, guessing for everyone else.
          </h2>
          <p className="text-[15.5px] text-[#14201B]/60 max-w-[540px] mb-12 leading-relaxed">
            The organisers closest to the work are often the furthest from what their community actually wants.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-5">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="bg-white rounded-2xl border border-[#E4E1D6] p-6 h-full">
                <div className="w-9 h-9 rounded-lg bg-[#14201B]/5 flex items-center justify-center mb-4">
                  <p.icon size={17} className="text-[#14201B]/70" />
                </div>
                <h3 className="text-[16px] font-semibold mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{p.title}</h3>
                <p className="text-[14px] text-[#14201B]/55 leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SOLUTION + HOW IT WORKS */}
      <section id="solution" className="bg-white border-y border-[#E4E1D6]">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <Reveal>
            <SectionEyebrow>The solution</SectionEyebrow>
            <h2 className="text-[28px] sm:text-[36px] font-semibold tracking-tight max-w-[600px] mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Circlo makes participation part of the planning process itself.
            </h2>
            <p className="text-[15.5px] text-[#14201B]/60 max-w-[560px] mb-16 leading-relaxed">
              Every event runs on the same loop: suggest, vote, attend, repeat. Each round makes the next event a little smarter.
            </p>
          </Reveal>

          <div id="how" className="grid sm:grid-cols-3 gap-8 relative">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 120}>
                <div className="relative">
                  <div
                    className="text-[13px] font-semibold text-[#14201B]/30 mb-4"
                    style={{ fontFamily: "IBM Plex Mono, monospace" }}
                  >
                    {s.n}
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-[#2D4FFF]/10 flex items-center justify-center mb-4">
                    <s.icon size={19} className="text-[#2D4FFF]" />
                  </div>
                  <h3 className="text-[17px] font-semibold mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{s.title}</h3>
                  <p className="text-[14px] text-[#14201B]/55 leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={360}>
            <div className="flex items-center gap-2 mt-10 text-[13.5px] text-[#3E5C43] font-medium">
              <RefreshCw size={14} />
              <span>...and the loop continues into the next event.</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRODUCT PREVIEW */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <Reveal>
          <SectionEyebrow>Product preview</SectionEyebrow>
          <h2 className="text-[28px] sm:text-[36px] font-semibold tracking-tight max-w-[560px] mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            A single page for the whole event, from idea to feedback.
          </h2>
          <p className="text-[15.5px] text-[#14201B]/60 max-w-[540px] mb-12 leading-relaxed">
            A first look at the event page — full dashboard and voting prototype ship in Phase 2.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="bg-white rounded-2xl border border-[#E4E1D6] p-4 sm:p-6 shadow-[0_20px_50px_rgba(20,32,27,0.08)]">
            <div className="rounded-xl bg-[#F4F5F0] border border-[#E4E1D6] p-5 sm:p-7 grid sm:grid-cols-3 gap-5">
              <div className="sm:col-span-2 bg-white rounded-xl border border-[#E4E1D6] p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-[16px] font-semibold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Idea: Sunset Kayak Trip</div>
                    <div className="text-[12.5px] text-[#14201B]/45 mt-0.5">Submitted by a member · 3 days ago</div>
                  </div>
                  <Badge tone="marigold">Trending</Badge>
                </div>
                <p className="text-[13.5px] text-[#14201B]/55 mb-4 leading-relaxed">
                  "We keep doing indoor socials — can we try something outdoors before term ends?"
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2D4FFF] text-white text-[13px] font-medium">
                    <Vote size={13} /> 84 votes
                  </div>
                  <div className="flex items-center gap-1.5 text-[13px] text-[#14201B]/45">
                    <MessageSquare size={13} /> 12 comments
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-[#E4E1D6] p-5 flex flex-col justify-between">
                <div>
                  <div className="text-[12.5px] text-[#14201B]/45 mb-1">This week's leaderboard</div>
                  {[
                    ["Sunset Kayak Trip", 84],
                    ["Games Night Rematch", 51],
                    ["Guest Speaker: Alumni Panel", 33],
                  ].map(([label, votes]) => (
                    <div key={label} className="flex items-center justify-between py-2 border-t border-[#E4E1D6] first:border-t-0">
                      <span className="text-[13px] text-[#14201B]/75">{label}</span>
                      <span className="text-[12.5px] text-[#14201B]/40" style={{ fontFamily: "IBM Plex Mono, monospace" }}>{votes}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* BENEFITS */}
      <section className="bg-white border-y border-[#E4E1D6]">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-20 sm:py-28 grid lg:grid-cols-2 gap-16">
          <Reveal>
            <SectionEyebrow>For organisers</SectionEyebrow>
            <h3 className="text-[24px] font-semibold tracking-tight mb-8" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Plan with confidence, not assumptions.
            </h3>
            <div className="space-y-6">
              {ORG_BENEFITS.map((b) => (
                <div key={b.title} className="flex gap-4">
                  <div className="w-9 h-9 shrink-0 rounded-lg bg-[#2D4FFF]/10 flex items-center justify-center">
                    <b.icon size={16} className="text-[#2D4FFF]" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{b.title}</h4>
                    <p className="text-[13.5px] text-[#14201B]/55 leading-relaxed">{b.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionEyebrow>For communities</SectionEyebrow>
            <h3 className="text-[24px] font-semibold tracking-tight mb-8" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Have an actual say in what happens next.
            </h3>
            <div className="space-y-6">
              {COMMUNITY_BENEFITS.map((b) => (
                <div key={b.title} className="flex gap-4">
                  <div className="w-9 h-9 shrink-0 rounded-lg bg-[#FFB648]/20 flex items-center justify-center">
                    <b.icon size={16} className="text-[#8A5A00]" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{b.title}</h4>
                    <p className="text-[13.5px] text-[#14201B]/55 leading-relaxed">{b.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SOCIAL PROOF PLACEHOLDER */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 sm:py-20 text-center">
        <Reveal>
          <div className="text-[13px] text-[#14201B]/40 mb-6" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
            EARLY COMMUNITIES EXPLORING CIRCLO
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["University Societies", "Sports Clubs", "Networking Communities", "Student Organisations", "Brand Community Teams"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E4E1D6] text-[13px] text-[#14201B]/55">
                <Building2 size={13} /> {t}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* PRICING PLACEHOLDER */}
      <section id="pricing" className="bg-white border-y border-[#E4E1D6]">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <Reveal>
            <SectionEyebrow>Pricing</SectionEyebrow>
            <h2 className="text-[28px] sm:text-[36px] font-semibold tracking-tight max-w-[520px] mb-12" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Free to join while we're in beta.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="max-w-[420px] bg-[#F4F5F0] rounded-2xl border border-[#E4E1D6] p-8">
              <Badge tone="sage">Beta access</Badge>
              <div className="mt-4 mb-1 flex items-baseline gap-2">
                <span className="text-[36px] font-semibold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>£0</span>
                <span className="text-[14px] text-[#14201B]/45">while in beta</span>
              </div>
              <p className="text-[13.5px] text-[#14201B]/55 mb-6">Full access for your whole community — no card required.</p>
              <ul className="space-y-2.5 mb-7">
                {["Unlimited idea submissions", "Unlimited community voting", "Organiser insights dashboard"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[13.5px] text-[#14201B]/70">
                    <Check size={14} className="text-[#3E5C43]" /> {f}
                  </li>
                ))}
              </ul>
              <Button variant="primary" size="md" className="w-full" onClick={() => open("waitlist")}>
                Join the Waitlist
              </Button>
              <p className="text-[12px] text-[#14201B]/40 text-center mt-4">Team &amp; multi-community pricing — coming soon.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-[720px] mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <Reveal>
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="text-[28px] sm:text-[34px] font-semibold tracking-tight mb-10" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Questions, answered.
          </h2>
        </Reveal>
        <div className="space-y-0 divide-y divide-[#E4E1D6] border-t border-b border-[#E4E1D6]">
          {FAQS.map((f, i) => (
            <div key={f.q}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                className="w-full flex items-center justify-between py-5 text-left"
              >
                <span className="text-[15px] font-medium pr-6" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{f.q}</span>
                <ChevronDown
                  size={18}
                  className="text-[#14201B]/40 shrink-0 transition-transform duration-200"
                  style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: openFaq === i ? 200 : 0 }}
              >
                <p className="text-[14px] text-[#14201B]/55 leading-relaxed pb-5 pr-8">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 pb-24">
        <Reveal>
          <div className="bg-[#14201B] rounded-3xl px-8 sm:px-14 py-16 sm:py-20 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#2D4FFF]/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-[#FFB648]/10 blur-3xl" />
            <div className="relative">
              <h2 className="text-[28px] sm:text-[38px] font-semibold text-[#F4F5F0] tracking-tight max-w-[560px] mx-auto mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Give your community a say in what happens next.
              </h2>
              <p className="text-[15px] text-[#F4F5F0]/60 max-w-[440px] mx-auto mb-8">
                Join the waitlist and be one of the first organisers building events with Circlo.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button variant="marigold" size="lg" onClick={() => open("waitlist")}>
                  Join the Waitlist <ArrowRight size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => open("demo")}
                  className="!text-[#F4F5F0] hover:!bg-white/10"
                >
                  Request a Demo
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E4E1D6]">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-[#14201B] relative flex items-center justify-center">
              <div className="w-[6px] h-[6px] rounded-full bg-[#2D4FFF]" />
            </div>
            <span className="text-[14.5px] font-semibold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Circlo</span>
          </div>
          <p className="text-[13px] text-[#14201B]/45">Plan events with your community, not just for them.</p>
          <div className="flex items-center gap-1.5 text-[13px] text-[#14201B]/45">
            <Mail size={13} /> hello@circlo.app
          </div>
        </div>
      </footer>

      <WaitlistModal open={modal.open} mode={modal.mode} onClose={() => setModal({ ...modal, open: false })} />
    </div>
  );
}
