"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/app/components/ui/button";
import {
  weeklyPlanSchema,
  type WeeklyPlanFormInput,
  type WeeklyPlanInput,
} from "@/lib/schemas";

export function WeeklyPlanForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WeeklyPlanFormInput, unknown, WeeklyPlanInput>({
    resolver: zodResolver(weeklyPlanSchema),
  });

  const onSubmit = async (values: WeeklyPlanInput) => {
    const response = await fetch("/api/weekly-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;
      if (response.status === 401) {
        toast.error("Your session expired. Please login again.");
        window.location.assign("/login");
        return;
      }
      const message = data?.error ?? "Could not send the weekly plan request.";
      toast.error(message);
      return;
    }

    toast.success("Weekly planning request sent successfully.");
    reset();
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-800" htmlFor="startDate">
          Week start date
        </label>
        <input
          id="startDate"
          type="date"
          className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
          {...register("startDate")}
        />
        {errors.startDate ? (
          <p className="text-sm text-rose-700">{errors.startDate.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-800" htmlFor="weekNumber">
          Week number
        </label>
        <input
          id="weekNumber"
          type="number"
          min={1}
          inputMode="numeric"
          className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
          placeholder="For example: 30"
          {...register("weekNumber", {
            valueAsNumber: true,
          })}
        />
        {errors.weekNumber ? (
          <p className="text-sm text-rose-700">{errors.weekNumber.message}</p>
        ) : null}
      </div>

      <div className="sticky bottom-0 rounded-xl bg-white/90 py-1 backdrop-blur sm:static sm:bg-transparent sm:p-0">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full text-base shadow-[0_14px_30px_-14px_rgba(15,118,110,0.8)]"
        >
          {isSubmitting ? "Sending..." : "Send to n8n"}
        </Button>
      </div>
    </form>
  );
}
