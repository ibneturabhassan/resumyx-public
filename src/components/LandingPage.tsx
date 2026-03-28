import React from 'react';
import screenshotProfile from '../assets/screenshots/profile-page.jpg';
import screenshotTailor from '../assets/screenshots/ai-tailor-page.jpg';
import screenshotCoverLetter from '../assets/screenshots/cover-letter-page.jpg';

interface LandingPageProps {
  onNavigateToAuth: (mode: 'login' | 'register') => void;
}

const workflowSteps = [
  {
    id: '01',
    title: 'Capture profile data once',
    body: 'Manage experience, education, skills, projects, and certifications in a structured workspace with a live document preview.',
  },
  {
    id: '02',
    title: 'Generate tailored application assets',
    body: 'Use the provided AI architecture to tailor resumes, score fit, draft letters, and extend the product with your own prompt layer.',
  },
  {
    id: '03',
    title: 'Ship a polished experience fast',
    body: 'Auth, settings, export flows, and marketing surfaces are already in place so you can focus on your product differentiation.',
  },
];

const platformHighlights = [
  {
    icon: 'fa-user-pen',
    title: 'Profile-first document system',
    body: 'The boilerplate includes a full profile editor, live preview, and print-ready document layout instead of bare form scaffolding.',
  },
  {
    icon: 'fa-brain',
    title: 'Multi-provider AI architecture',
    body: 'Gemini, OpenAI, and OpenRouter support are organized behind a shared interface so you can swap or extend providers cleanly.',
  },
  {
    icon: 'fa-layer-group',
    title: 'Product-ready UI surfaces',
    body: 'Resume tailoring, cover letters, proposals, chat, settings, and onboarding are already wired into one coherent frontend.',
  },
];

const featureMatrix = [
  'Supabase auth and database integration',
  'Resume editor with live A4-style preview',
  'Cover letter and proposal workspace shells',
  'Settings UI for bring-your-own-key model configuration',
  'Streaming chat surface and API client structure',
  'Modern landing page and product storytelling out of the box',
];

const proofPoints = [
  { label: 'Frontend', value: 'React 19, Vite, TypeScript, Tailwind' },
  { label: 'Backend', value: 'FastAPI with Supabase-backed auth' },
  { label: 'Use case', value: 'Resume products, AI job tools, white-label starters' },
];

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToAuth }) => {
  return (
    <div className="min-h-screen bg-[#f4efe7] text-slate-900">
      <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.22),_transparent_38%),radial-gradient(circle_at_top_right,_rgba(14,116,144,0.16),_transparent_34%),linear-gradient(180deg,_#fff8ef_0%,_#f4efe7_58%,_#f4efe7_100%)]" />

      <nav className="sticky top-0 z-50 border-b border-slate-900/8 bg-[#f4efe7]/88 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white shadow-lg shadow-slate-900/20">
              R
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-500">Resumyx</div>
              <div className="text-sm font-semibold text-slate-900">AI resume app boilerplate</div>
            </div>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#workflow" className="transition hover:text-slate-900">Workflow</a>
            <a href="#platform" className="transition hover:text-slate-900">Platform</a>
            <a href="#features" className="transition hover:text-slate-900">Features</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateToAuth('login')}
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white/70 hover:text-slate-900"
            >
              Log In
            </button>
            <button
              onClick={() => onNavigateToAuth('register')}
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-black"
            >
              Explore Starter
            </button>
          </div>
        </div>
      </nav>

      <main id="top">
        <section className="px-6 pb-20 pt-14 lg:px-10 lg:pb-24 lg:pt-20">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-white/80 px-4 py-2 text-sm font-medium text-amber-800 shadow-sm shadow-amber-950/5">
                <i className="fas fa-sparkles text-[12px]"></i>
                Presentation-ready starter for AI resume products
              </div>

              <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.96] tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl">
                Launch the polished version first, then add your secret sauce.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
                Resumyx Public is a full-stack starting point for resume builders and application tools, with auth, profile editing, document previews, AI provider wiring, and a modern landing experience already in place.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => onNavigateToAuth('register')}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-4 text-base font-semibold text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-black"
                >
                  Start with the boilerplate
                  <i className="fas fa-arrow-right text-sm"></i>
                </button>
                <a
                  href="#platform"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/85 px-7 py-4 text-base font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-white"
                >
                  See the platform
                  <i className="fas fa-layer-group text-sm"></i>
                </a>
              </div>

              <div className="mt-10 grid gap-4 border-t border-slate-900/10 pt-8 sm:grid-cols-3">
                {proofPoints.map((point) => (
                  <div key={point.label}>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">{point.label}</div>
                    <div className="mt-2 text-sm font-medium leading-6 text-slate-800">{point.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 translate-x-6 translate-y-6 rounded-[2rem] bg-slate-900/8 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-900/10 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.16)]">
                <div className="flex items-center gap-2 border-b border-slate-200 bg-[#fbfaf7] px-5 py-4">
                  <div className="flex gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="ml-3 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-500">
                    resumyx-public
                  </div>
                </div>

                <div className="grid gap-4 bg-[#fbfaf7] p-4 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
                    <img
                      src={screenshotTailor}
                      alt="AI resume tailoring workspace"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="grid gap-4">
                    <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
                      <img
                        src={screenshotProfile}
                        alt="Resume profile workspace"
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                    <div className="rounded-[1.5rem] border border-slate-200 bg-slate-900 px-5 py-5 text-white">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">Built for extension</div>
                      <div className="mt-3 text-xl font-semibold leading-7">
                        Swap prompts, wire your own ranking logic, and keep the polished shell.
                      </div>
                      <div className="mt-4 text-sm leading-6 text-slate-300">
                        The repo is meant to showcase the product surface and architecture, while your differentiated logic can stay private.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="workflow" className="px-6 py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-900/10 bg-white/78 p-8 shadow-sm backdrop-blur lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">Workflow</div>
                <h2 className="mt-4 max-w-md text-4xl font-semibold leading-tight tracking-[-0.04em] text-slate-950">
                  A real product shell, not just a stack diagram and a login screen.
                </h2>
                <p className="mt-5 max-w-md text-base leading-7 text-slate-600">
                  This public version is designed to demo the product well, onboard contributors faster, and give you a clean base for private extensions.
                </p>
              </div>

              <div className="grid gap-5">
                {workflowSteps.map((step) => (
                  <div key={step.id} className="grid gap-4 rounded-[1.6rem] border border-slate-200/90 bg-[#fcfbf8] p-6 md:grid-cols-[72px_1fr] md:items-start">
                    <div className="text-3xl font-semibold tracking-[-0.05em] text-slate-300">{step.id}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                      <p className="mt-2 text-base leading-7 text-slate-600">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="platform" className="px-6 py-20 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="rounded-[2rem] bg-slate-900 px-8 py-10 text-white shadow-[0_30px_70px_rgba(15,23,42,0.22)] lg:px-10">
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">Public-safe positioning</div>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em]">
                Show the architecture and experience without shipping the proprietary layer.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-300">
                The public repo now presents the product as a polished AI resume starter. It highlights the extensible surface area without revealing private prompt strategy or custom monitoring flows.
              </p>
            </div>

            <div className="grid gap-6">
              {platformHighlights.map((highlight) => (
                <div key={highlight.title} className="rounded-[1.8rem] border border-slate-900/10 bg-white p-7 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                    <i className={`fas ${highlight.icon} text-lg`}></i>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-slate-950">{highlight.title}</h3>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{highlight.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="px-6 py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">Included surfaces</div>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-slate-950">
                Enough product already exists that the repo feels real on day one.
              </h2>
            </div>

            <div className="mt-8 grid gap-3">
              {featureMatrix.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/85 px-4 py-4">
                  <i className="fas fa-check-circle mt-1 text-sm text-emerald-600"></i>
                  <span className="text-sm leading-6 text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                <img src={screenshotProfile} alt="Resume profile page" className="h-72 w-full object-cover object-top" />
                <div className="p-6">
                  <div className="text-sm font-semibold text-slate-900">Profile workspace</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Forms, live preview, and print-ready structure make the demo feel complete before you touch the prompts.
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                <img src={screenshotTailor} alt="Tailoring page" className="h-72 w-full object-cover object-top" />
                <div className="p-6">
                  <div className="text-sm font-semibold text-slate-900">AI tailoring shell</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Streaming activity, job-description input, and provider structure give you a clean place to insert your own logic.
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                <img src={screenshotCoverLetter} alt="Cover letter page" className="h-72 w-full object-cover object-top" />
                <div className="p-6">
                  <div className="text-sm font-semibold text-slate-900">Companion generators</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Cover-letter and proposal surfaces help the repo present as a fuller product instead of a narrow single feature.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 pt-10 lg:px-10">
          <div className="mx-auto max-w-7xl rounded-[2.2rem] bg-slate-900 px-8 py-12 text-white shadow-[0_32px_90px_rgba(15,23,42,0.26)] lg:px-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">Ready to fork</div>
                <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.04em]">
                  Present the product publicly, keep the moat privately, and still ship from the same foundation.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                  The public repo now matches the newer product story and visual quality while staying safe to share as a template or portfolio piece.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => onNavigateToAuth('register')}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
                >
                  Open starter
                  <i className="fas fa-arrow-right text-sm"></i>
                </button>
                <button
                  onClick={() => onNavigateToAuth('login')}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 text-base font-semibold text-white transition hover:bg-white/8"
                >
                  View demo flow
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
