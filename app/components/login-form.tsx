"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";

type State =
  | { kind: "idle"; message: null }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState<State>({ kind: "idle", message: null });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setState({ kind: "idle", message: null });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "");

    try {
      const response = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        setState({
          kind: "error",
          message: "No se pudo enviar el enlace. Intenta nuevamente.",
        });
        return;
      }

      setState({
        kind: "success",
        message:
          "Si tu correo esta autorizado, te enviamos un enlace para entrar.",
      });
      form.reset();
    } catch {
      setState({
        kind: "error",
        message: "No se pudo enviar el enlace. Intenta nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div className="space-y-2" suppressHydrationWarning>
        <label className="block text-sm font-semibold text-slate-800" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          autoComplete="email"
          data-lpignore="true"
          data-1p-ignore="true"
          className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
          placeholder="luciana@colegio.edu"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full text-base shadow-[0_14px_30px_-14px_rgba(15,118,110,0.8)]"
      >
        {isSubmitting ? "Enviando enlace..." : "Enviar enlace de acceso"}
      </Button>

      {state.message ? (
        <p
          className={
            state.kind === "error" ? "text-sm text-rose-700" : "text-sm text-emerald-700"
          }
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
