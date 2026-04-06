import { NextResponse } from "next/server";
import { weeklyPlanSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const parseResult = weeklyPlanSchema.safeParse(await request.json());
  if (!parseResult.success) {
    return NextResponse.json(
      { error: "Please provide a valid date and week number." },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Webhook URL is not configured." },
      { status: 500 },
    );
  }

  try {
    const queryParams = new URLSearchParams({
      startDate: parseResult.data.startDate,
      weekNumber: parseResult.data.weekNumber.toString(),
    }).toString();
    const response = await fetch(`${webhookUrl}?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(25000),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`n8n webhook error: ${response.status}`, errorText);
      return NextResponse.json(
        { 
          error: "n8n rejected the request. Please try again.",
          details: {
            status: response.status,
            message: errorText
          }
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "n8n is not reachable right now. Please retry in a moment." },
      { status: 504 },
    );
  }
}
