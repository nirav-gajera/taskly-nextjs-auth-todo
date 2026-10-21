import Link from "next/link";
import { getSession } from "@/lib/session";

const features = [
  {
    icon: "✦",
    title: "Clear your mind",
    text: "Capture every task in one calm, focused space.",
  },
  {
    icon: "✓",
    title: "Make progress",
    text: "Check things off and see your momentum grow.",
  },
  {
    icon: "⌁",
    title: "Stay in flow",
    text: "Simple tools that keep you moving without noise.",
  },
];

export const instant = false;

export default async function HomePage() {
  const session = await getSession();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f8fc] text-slate-950">
      <div className="pointer-events-none absolute -right-48 -top-48 h-[34rem] w-[34rem] rounded-full bg-indigo-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-64 -left-48 h-[32rem] w-[32rem] rounded-full bg-cyan-100/70 blur-3xl" />
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-3 font-bold tracking-tight"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg text-white shadow-lg shadow-indigo-600/20">
            ✓
          </span>
          <span className="text-xl">Taskly</span>
        </Link>
        <div className="flex items-center gap-3 text-sm font-semibold">
          {session ? (
            <Link href="/todos" className="rounded-xl bg-indigo-600 px-4 py-2.5 text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700">
              Dashboard <span className="ml-1">→</span>
            </Link>
          ) : (
            <>
              <Link href="/login" className="rounded-xl px-4 py-2.5 text-slate-600 transition hover:bg-white hover:text-slate-950">Log in</Link>
              <Link href="/register" className="rounded-xl bg-slate-950 px-4 py-2.5 text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-indigo-700">Get started</Link>
            </>
          )}
        </div>
      </nav>
      <section className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:px-10 lg:pb-32 lg:pt-24">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-indigo-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> Your calmer
            to-do list
          </div>
          <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-[-0.05em] sm:text-7xl">
            Make space for what{" "}
            <span className="text-indigo-600">matters.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
            Taskly turns scattered thoughts into simple, satisfying progress.
            Plan your day, focus on the next step, and finish with a lighter
            mind.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-indigo-600 px-6 py-4 font-bold text-white shadow-xl shadow-indigo-600/25 transition hover:-translate-y-1 hover:bg-indigo-700"
            >
              Start organizing <span aria-hidden>→</span>
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 font-bold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              I already have an account
            </Link>
          </div>
          <p className="mt-5 text-sm text-slate-500">
            <span className="mr-2 text-emerald-500">●</span> Free to get started · No complicated setup
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
          <div className="absolute -left-5 top-12 z-10 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-xl shadow-indigo-900/10 backdrop-blur sm:-left-10">
            <p className="text-xs font-semibold text-slate-500">
              TODAY&apos;S PROGRESS
            </p>
            <p className="mt-1 text-2xl font-black">72%</p>
          </div>
          <div className="rotate-2 rounded-[2rem] border border-white/80 bg-slate-950 p-3 shadow-2xl shadow-indigo-950/25">
            <div className="rounded-[1.5rem] bg-[#f7f8fc] p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                    Tuesday, October 14
                  </p>
                  <h2 className="mt-2 text-2xl font-black">
                    Good morning, John
                  </h2>
                </div>
                <span className="text-3xl">☀️</span>
              </div>
              <div className="mt-7 flex items-center gap-3 rounded-2xl bg-indigo-600 p-4 text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-xl">
                  ✦
                </span>
                <div>
                  <p className="text-sm font-bold">A little progress</p>
                  <p className="text-xs text-indigo-100">is still progress.</p>
                </div>
                <span className="ml-auto text-sm font-bold">3 / 5</span>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  "Review project notes",
                  "Go for a 20 minute walk",
                  "Reply to important emails",
                ].map((task, index) => (
                  <div
                    key={task}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs ${index === 0 ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300"}`}
                    >
                      {index === 0 ? "✓" : ""}
                    </span>
                    <span
                      className={index === 0 ? "text-sm text-slate-400 line-through" : "text-sm font-semibold text-slate-700"}
                    >
                      {task}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 -right-4 rounded-2xl border border-white bg-white px-4 py-3 shadow-xl shadow-indigo-900/10">
            <p className="text-xs font-semibold text-slate-400">COMPLETED</p>
            <p className="mt-1 text-lg font-black text-emerald-600">12 tasks 🎉</p>
          </div>
        </div>
      </section>
      <section className="relative border-t border-slate-200/70 bg-white/60 px-6 py-16 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-xl font-bold text-indigo-600">
                {feature.icon}
              </span>
              <h3 className="mt-5 text-lg font-black">{feature.title}</h3>
              <p className="mt-2 leading-7 text-slate-500">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
