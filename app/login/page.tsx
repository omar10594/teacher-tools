import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/app/components/login-form";
import { AUTH_SESSION_COOKIE, getSessionFromToken } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const session = getSessionFromToken(cookieStore.get(AUTH_SESSION_COOKIE)?.value);

  if (session) {
    redirect("/tools/weekly-plan");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 py-8 sm:px-8 sm:py-12">
      <Link
        href="/"
        className="mb-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
      >
        Back to home
      </Link>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_26px_60px_-40px_rgba(15,23,42,0.55)] sm:p-8">
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Private access</h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
          Enter your email and we will send a one-time access link.
        </p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
