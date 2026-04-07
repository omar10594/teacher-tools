import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { WeeklyPlanForm } from "@/app/components/weekly-plan-form";

export default function WeeklyPlanPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 py-8 sm:px-8 sm:py-12">
      <div className="mb-5 flex items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to tools
        </Link>
        <form action="/api/auth/logout" method="post">
          <button
            type="submit"
            className="inline-flex h-10 items-center rounded-lg border border-slate-300 px-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
          >
            Sign out
          </button>
        </form>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_26px_60px_-40px_rgba(15,23,42,0.55)] sm:p-8">
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Weekly Planning Trigger
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
          Send the week start date and manual week number to your n8n workflow.
        </p>

        <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
          Required payload fields: startDate and weekNumber.
        </div>

        <div className="mt-6">
          <WeeklyPlanForm />
        </div>
      </section>
    </main>
  );
}
