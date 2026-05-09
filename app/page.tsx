import HeroGlass from "@/components/HeroGlass";
import FadeUp from "@/components/FadeUp";
import Navbar from "@/components/Navbar";
import CursorTrail from "@/components/CursorTrail";

// ── Shared style tokens ────────────────────────────────────────────────────
const NAVY = "#0A1628";
const CYAN = "#4DDFFF";
const GLACIAL = "#F2F7FF";
const SERIF = "var(--font-cormorant), Georgia, serif";
const MONO = "var(--font-dm-mono), 'Courier New', monospace";

// ── Sub-components ─────────────────────────────────────────────────────────

function Eyebrow({ children }: { children: string }) {
  return (
    <p
      style={{
        fontFamily: MONO,
        fontSize: "0.62rem",
        letterSpacing: "0.22em",
        color: CYAN,
        marginBottom: "1.5rem",
        textTransform: "uppercase" as const,
      }}
    >
      {children}
    </p>
  );
}

function SectionHeadline({
  children,
  maxWidth = "34rem",
}: {
  children: React.ReactNode;
  maxWidth?: string;
}) {
  return (
    <h2
      style={{
        fontFamily: SERIF,
        fontSize: "clamp(2rem, 4vw, 3.4rem)",
        fontWeight: 300,
        lineHeight: 1.08,
        maxWidth,
        marginBottom: "2rem",
      }}
    >
      {children}
    </h2>
  );
}

function Rule() {
  return <div className="section-rule" />;
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ width: "1.1rem", height: "1.1rem", flexShrink: 0 }}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main style={{ backgroundColor: NAVY, color: GLACIAL, overflowX: "hidden" }}>

      <CursorTrail />
      <Navbar />

      {/* ════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ════════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        style={{
          position: "relative",
          minHeight: "100svh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          padding: "0 4rem",
        }}
      >
        {/* Full-viewport glass overlay — sits above text (pointer-events: none) */}
        <HeroGlass />

        {/* Text content — beneath glass in z-order but still interactive */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            width: "100%",
            maxWidth: "80rem",
            margin: "0 auto",
            paddingTop: "5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2.25rem",
              maxWidth: "38rem",
            }}
          >
            <h1
              style={{
                fontFamily: SERIF,
                fontSize: "clamp(2.6rem, 5.2vw, 5rem)",
                fontWeight: 300,
                lineHeight: 1.04,
                letterSpacing: "-0.01em",
              }}
            >
              Your product is powerful.{" "}
              <em>Make sure your users feel&nbsp;it.</em>
            </h1>

            <p
              style={{
                fontFamily: MONO,
                fontSize: "0.8rem",
                lineHeight: 1.85,
                color: "rgba(242,247,255,0.6)",
                maxWidth: "27rem",
              }}
            >
              Glassbox maps your entire product and guides users through any
              complex task — live, step by step, without taking over.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "1.1rem",
              }}
            >
              <a href="#demo" className="btn-primary">
                Watch the demo
              </a>
              <a
                href="https://www.linkedin.com/in/amogh-maheshwari-91669927a/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-secondary"
              >
                Or reach out on LinkedIn →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom fade into next section */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "8rem",
            background: `linear-gradient(transparent, ${NAVY})`,
            pointerEvents: "none",
            zIndex: 11,
          }}
        />
      </section>

      <Rule />

      {/* ════════════════════════════════════════════════════════════════
          SECTION 2 — THE PROBLEM
      ════════════════════════════════════════════════════════════════ */}
      <section id="problem" style={{ padding: "8rem 4rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <FadeUp>
            <Eyebrow>Why this exists</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.1}>
            <SectionHeadline maxWidth="36rem">
              Complex software loses people. You pay for it in churn.
            </SectionHeadline>
          </FadeUp>
          <FadeUp delay={0.18}>
            <p
              style={{
                fontFamily: MONO,
                fontSize: "0.8rem",
                lineHeight: 1.9,
                color: "rgba(242,247,255,0.58)",
                maxWidth: "40rem",
                marginBottom: "4rem",
              }}
            >
              Most churn isn&apos;t about price. It&apos;s about confusion.
              Users who don&apos;t reach their first moment of value rarely come
              back — and your support team absorbs the cost of every one who
              doesn&apos;t.
            </p>
          </FadeUp>

          {/* 2×2 pain-point grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              border: "1px solid rgba(242,247,255,0.07)",
              gap: "1px",
              backgroundColor: "rgba(242,247,255,0.07)",
            }}
            className="pain-grid"
          >
            {[
              "Support tickets pile up every time you ship something new.",
              "New users never hit their aha moment — they just quietly leave.",
              "Walkthroughs break every sprint and nobody has time to fix them.",
              "You can't justify a $60K DAP contract for a 200-person user base.",
            ].map((point, i) => (
              <FadeUp key={i} delay={0.08 * (i + 1)}>
                <div className="grid-card">
                  <p
                    style={{
                      fontFamily: MONO,
                      fontSize: "0.82rem",
                      lineHeight: 1.85,
                      color: "rgba(242,247,255,0.72)",
                    }}
                  >
                    {point}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Rule />

      {/* ════════════════════════════════════════════════════════════════
          SECTION 3 — DEMO
      ════════════════════════════════════════════════════════════════ */}
      <section id="demo" style={{ padding: "8rem 4rem" }}>
        <div
          style={{ maxWidth: "60rem", margin: "0 auto", textAlign: "center" }}
        >
          <FadeUp>
            <Eyebrow>Demo</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.1}>
            <SectionHeadline maxWidth="100%">
              Watch Glassbox guide a real user.
            </SectionHeadline>
          </FadeUp>
          <FadeUp delay={0.18}>
            <p
              style={{
                fontFamily: MONO,
                fontSize: "0.8rem",
                lineHeight: 1.9,
                color: "rgba(242,247,255,0.58)",
                maxWidth: "32rem",
                margin: "0 auto 3.5rem",
              }}
            >
              No narration. No slides. Just a real product, a real question, and
              Glassbox finding the way.
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                border: "1px solid rgba(77,223,255,0.15)",
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/Ov4haYArNiI"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            </div>
          </FadeUp>
        </div>
      </section>

      <Rule />

      {/* ════════════════════════════════════════════════════════════════
          SECTION 4 — HOW IT WORKS
      ════════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" style={{ padding: "8rem 4rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <FadeUp>
            <Eyebrow>How it works</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.1}>
            <SectionHeadline maxWidth="28rem">
              Three steps. Zero walkthroughs written.
            </SectionHeadline>
          </FadeUp>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              border: "1px solid rgba(242,247,255,0.07)",
              gap: "1px",
              backgroundColor: "rgba(242,247,255,0.07)",
              marginTop: "3rem",
            }}
            className="steps-grid"
          >
            {[
              {
                num: "01",
                label: "MAP",
                body: "Glassbox traverses your entire product and builds a complete graph — every page, every button, every hidden modal and conditional state.",
              },
              {
                num: "02",
                label: "GUIDE",
                body: "A user asks a question by voice. Glassbox computes the path from where they are to where they need to be, and highlights each step in real time.",
              },
              {
                num: "03",
                label: "LEARN",
                body: "Usage patterns surface common points of confusion automatically. Tips improve over time. Your graph stays current because Glassbox re-traverses on every deploy.",
              },
            ].map((step, i) => (
              <FadeUp key={i} delay={0.1 * (i + 1)}>
                <div
                  className="grid-card"
                  style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
                >
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: "0.6rem",
                      color: CYAN,
                      letterSpacing: "0.2em",
                    }}
                  >
                    {step.num}
                  </span>
                  <h3
                    style={{
                      fontFamily: SERIF,
                      fontSize: "1.9rem",
                      fontWeight: 400,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {step.label}
                  </h3>
                  <p
                    style={{
                      fontFamily: MONO,
                      fontSize: "0.78rem",
                      lineHeight: 1.9,
                      color: "rgba(242,247,255,0.62)",
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Rule />

      {/* ════════════════════════════════════════════════════════════════
          SECTION 5 — WHY IT'S DIFFERENT
      ════════════════════════════════════════════════════════════════ */}
      <section id="why-different" style={{ padding: "8rem 4rem" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
          <FadeUp>
            <Eyebrow>Why it&apos;s different</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.1}>
            <SectionHeadline maxWidth="100%">
              Every other tool makes you author every step. Glassbox builds the
              map itself.
            </SectionHeadline>
          </FadeUp>
          <FadeUp delay={0.18}>
            <p
              style={{
                fontFamily: MONO,
                fontSize: "0.8rem",
                lineHeight: 1.95,
                color: "rgba(242,247,255,0.58)",
                marginBottom: "3.5rem",
              }}
            >
              WalkMe costs $60K and needs a full-time admin to maintain it.
              Appcues requires someone to record every click sequence by hand.
              Both break the moment your UI changes. Glassbox connects to your
              CI/CD pipeline, re-traverses on every deploy, and stays current
              automatically — with no one touching it.
            </p>
          </FadeUp>
          <FadeUp delay={0.28}>
            <div
              style={{
                borderTop: `1px solid rgba(77,223,255,0.22)`,
                paddingTop: "2.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(2.2rem, 5vw, 4.2rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: CYAN,
                  lineHeight: 1.05,
                }}
              >
                No manual authoring. Ever.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <Rule />

      {/* ════════════════════════════════════════════════════════════════
          SECTION 6 — WHO IT'S FOR
      ════════════════════════════════════════════════════════════════ */}
      <section id="who" style={{ padding: "8rem 4rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <FadeUp>
            <Eyebrow>Who it&apos;s for</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.1}>
            <SectionHeadline maxWidth="28rem">
              Three people who need this right now.
            </SectionHeadline>
          </FadeUp>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              border: "1px solid rgba(242,247,255,0.07)",
              gap: "1px",
              backgroundColor: "rgba(242,247,255,0.07)",
              marginTop: "3rem",
            }}
            className="who-grid"
          >
            {[
              {
                role: "Head of Product",
                quote:
                  "“Activation drops every time we ship. I don’t know why and I don’t have time to figure it out.”",
              },
              {
                role: "CS Lead",
                quote:
                  "“It’s the same five questions every single week from every single new customer. My team is a human FAQ.”",
              },
              {
                role: "Founder",
                quote:
                  "“I can’t justify $60K for WalkMe. But users keep getting stuck and I keep losing them.”",
              },
            ].map((card, i) => (
              <FadeUp key={i} delay={0.1 * (i + 1)}>
                <div
                  className="grid-card"
                  style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
                >
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: "0.6rem",
                      color: CYAN,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase" as const,
                    }}
                  >
                    {card.role}
                  </span>
                  <blockquote
                    style={{
                      fontFamily: SERIF,
                      fontSize: "1.35rem",
                      fontStyle: "italic",
                      fontWeight: 300,
                      lineHeight: 1.55,
                      color: "rgba(242,247,255,0.88)",
                      margin: 0,
                    }}
                  >
                    {card.quote}
                  </blockquote>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Rule />

      {/* ════════════════════════════════════════════════════════════════
          SECTION 7 — GET IN TOUCH
      ════════════════════════════════════════════════════════════════ */}
      <section id="contact" style={{ padding: "8rem 4rem 7rem" }}>
        <div
          style={{ maxWidth: "48rem", margin: "0 auto", textAlign: "center" }}
        >
          <FadeUp>
            <Eyebrow>Early access</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.1}>
            <SectionHeadline maxWidth="100%">
              We&apos;re building with a small group of early partners.
            </SectionHeadline>
          </FadeUp>
          <FadeUp delay={0.18}>
            <p
              style={{
                fontFamily: MONO,
                fontSize: "0.8rem",
                lineHeight: 1.95,
                color: "rgba(242,247,255,0.58)",
                maxWidth: "36rem",
                margin: "0 auto 3.5rem",
              }}
            >
              We&apos;re selective about who we pilot with. We want real
              products, real users, and teams who feel this problem acutely. If
              that&apos;s you, let&apos;s talk.
            </p>
          </FadeUp>

          {/* Two founder cards */}
          <FadeUp delay={0.28}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap" as const,
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "3.5rem",
              }}
            >
              {[
                {
                  name: "Amogh Maheshwari",
                  href: "https://www.linkedin.com/in/amogh-maheshwari-91669927a/",
                },
                {
                  name: "Savir Dillikar",
                  href: "https://www.linkedin.com/in/savir-dillikar/",
                },
              ].map((founder) => (
                <a
                  key={founder.name}
                  href={founder.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="founder-card"
                >
                  <LinkedInIcon />
                  {founder.name}
                </a>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.38}>
            <p
              style={{
                fontFamily: MONO,
                fontSize: "0.62rem",
                color: "rgba(242,247,255,0.28)",
                letterSpacing: "0.12em",
              }}
            >
              Glassbox — early stage, building in public.
            </p>
          </FadeUp>
        </div>
      </section>

    </main>
  );
}
