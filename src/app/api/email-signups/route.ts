import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const emailSignupSchema = z.object({
  email: z.string().email("Valid email is required"),
  source: z.string().default("wear_frequency"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = emailSignupSchema.parse(body);

    // Check if email already exists
    const existing = await prisma.emailSignup.findUnique({
      where: { email: validated.email },
    });

    if (existing) {
      // If already signed up, just return success (don't reveal if email exists)
      return NextResponse.json(
        { message: "Email registered successfully" },
        { status: 200 }
      );
    }

    await prisma.emailSignup.create({
      data: {
        email: validated.email,
        source: validated.source,
      },
    });

    return NextResponse.json(
      { message: "Email registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }
    console.error("Failed to register email:", error);
    return NextResponse.json({ error: "Failed to register email" }, { status: 500 });
  }
}
