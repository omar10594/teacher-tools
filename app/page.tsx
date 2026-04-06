import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { tools } from "@/lib/tools";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-8 sm:px-8 sm:py-12">
      <section className="relative overflow-hidden rounded-3xl border border-slate-300/60 bg-gradient-to-br from-amber-50 via-sky-50 to-teal-100 p-6 shadow-[0_20px_70px_-45px_rgba(15,23,42,0.55)] sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-teal-300/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="relative z-10 max-w-2xl space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3 py-1 text-sm font-medium text-slate-700">
            <Sparkles className="h-4 w-4" />
            Teacher Tools
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            Fast tools for weekly classroom workflows
          </h1>
          <p className="max-w-xl text-pretty text-base text-slate-700 sm:text-lg">
            Start with a weekly planning trigger connected to n8n. More tools can be
            added as simple cards without changing the project structure.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={tool.href}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-md"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              {tool.badge}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">{tool.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{tool.description}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
              Open tool
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
