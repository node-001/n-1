import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const feedbackSchema = z.object({
  name: z.string().max(100).optional(),
  email: z.string().email().optional().or(z.literal("")),
  type: z.enum(["QUESTION", "FEEDBACK", "SUGGESTION", "ISSUE", "OTHER"]).default("FEEDBACK"),
  message: z.string().min(5, "Message must be at least 5 characters").max(5000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = feedbackSchema.parse(body);

    const feedback = await prisma.feedback.create({
      data: {
        name: validated.name || null,
        email: validated.email || null,
        type: validated.type,
        message: validated.message,
      },
    });

    return NextResponse.json(
      { id: feedback.id, message: "Feedback submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Failed to submit feedback:", error);
    return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 });
  }
}
