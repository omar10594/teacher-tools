import { z } from "zod";

export const weeklyPlanSchema = z.object({
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use format YYYY-MM-DD"),
  weekNumber: z.coerce.number().int("Week number must be a whole number").min(1),
});

export type WeeklyPlanFormInput = z.input<typeof weeklyPlanSchema>;
export type WeeklyPlanInput = z.output<typeof weeklyPlanSchema>;
