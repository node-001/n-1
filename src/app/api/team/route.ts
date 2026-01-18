import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const teamApplicationSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  languages: z.string().min(1, "Languages are required").max(200),
  location: z.string().min(1, "Location is required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = teamApplicationSchema.parse(body);

    const application = await prisma.teamApplication.create({
      data: {
        name: validated.name,
        email: validated.email,
        languages: validated.languages,
        location: validated.location,
        message: validated.message,
      },
    });

    return NextResponse.json(
      { id: application.id, message: "Application submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Failed to submit team application:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
