import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { tools } from "@/lib/tools";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-8 sm:px-8 sm:py-12">
      <section className="relative overflow-hidden rounded-3xl border border-slate-300/60 bg-gradient-to-br from-amber-50 via-sky-50 to-teal-100 p-6 shadow-[0_20px_70px_-45px_rgba(15,23,42,0.55)] sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-teal-300/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-amber-300/30 blur-3xl" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-4 z-10 hidden sm:block"
        >
          <div className="relative h-24 w-16 drop-shadow-[0_10px_12px_rgba(15,23,42,0.2)]">
            <div className="absolute left-1/2 top-0 h-9 w-9 -translate-x-1/2 rounded-full bg-slate-900" />
            <div className="absolute left-1/2 top-2 h-2.5 w-2.5 -translate-x-[12px] rounded-full bg-white" />
            <div className="absolute left-1/2 top-2 h-2.5 w-2.5 translate-x-[4px] rounded-full bg-white" />
            <div className="absolute left-1/2 top-[15px] h-2 w-3 -translate-x-1/2 rounded-full bg-amber-400" />
            <div className="absolute left-1/2 top-7 h-16 w-14 -translate-x-1/2 rounded-[999px] bg-slate-900" />
            <div className="absolute left-1/2 top-9 h-12 w-9 -translate-x-1/2 rounded-[999px] bg-white" />
            <div className="absolute left-1/2 top-[82px] h-2.5 w-4 -translate-x-[13px] rounded-full bg-amber-500" />
            <div className="absolute left-1/2 top-[82px] h-2.5 w-4 translate-x-[1px] rounded-full bg-amber-500" />
          </div>
        </div>
        <div className="relative z-10 max-w-2xl space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3 py-1 text-sm font-medium text-slate-700">
            <Sparkles className="h-4 w-4" />
            Teacher Tools
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            Miss Luciana classroom tools, made with ❤️
          </h1>
          <p className="max-w-xl text-pretty text-base text-slate-700 sm:text-lg">
            A collection of utilities to make the life of Miss Luciana easier and more fun. All tools are designed to be simple, fast and effective, so you can focus on what matters: teaching and inspiring your students.
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
