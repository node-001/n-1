import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const prescriberApplicationSchema = z.object({
  // Basic contact info (required)
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  credentials: z.string().min(1, "Credentials are required").max(50),
  practiceName: z.string().max(200).optional(),
  email: z.string().email("Invalid email address"),
  website: z.string().url().optional().or(z.literal("")),

  // Location & availability
  country: z.string().min(1, "Country is required").max(100),
  state: z.string().min(1, "State/Province is required").max(100),
  city: z.string().min(1, "City is required").max(100),
  serviceArea: z.string().max(500).optional(),
  offersTelemedicine: z.boolean().default(false),
  prescribesAtHome: z.boolean().default(false),

  // Professional credentials
  licenseNumber: z.string().max(100).optional(),
  specialty: z.string().max(100).optional(),
  yearsExperience: z.number().int().min(0).max(70).optional(),

  // Protocol alignment
  reviewedPortal: z.boolean().refine((val) => val === true, {
    message: "You must confirm that you have reviewed the n=1 portal",
  }),
  philosophyStatement: z.string().max(2000).optional(),
  aiExperience: z.string().max(2000).optional(),

  // Legal agreements (all required)
  agreesVoluntary: z.boolean().refine((val) => val === true, {
    message: "You must agree to this term",
  }),
  agreesNoLiability: z.boolean().refine((val) => val === true, {
    message: "You must agree to this term",
  }),
  agreesAccurate: z.boolean().refine((val) => val === true, {
    message: "You must confirm the accuracy of your information",
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = prescriberApplicationSchema.parse(body);

    const prescriber = await prisma.prescriber.create({
      data: {
        name: validated.name,
        credentials: validated.credentials,
        practiceName: validated.practiceName || null,
        email: validated.email,
        website: validated.website || null,
        country: validated.country,
        state: validated.state,
        city: validated.city,
        serviceArea: validated.serviceArea || null,
        offersTelemedicine: validated.offersTelemedicine,
        prescribesAtHome: validated.prescribesAtHome,
        licenseNumber: validated.licenseNumber || null,
        specialty: validated.specialty || null,
        yearsExperience: validated.yearsExperience ?? null,
        reviewedPortal: validated.reviewedPortal,
        philosophyStatement: validated.philosophyStatement || null,
        aiExperience: validated.aiExperience || null,
        agreesVoluntary: validated.agreesVoluntary,
        agreesNoLiability: validated.agreesNoLiability,
        agreesAccurate: validated.agreesAccurate,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      { id: prescriber.id, message: "Application submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Failed to submit prescriber application:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
