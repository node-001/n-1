import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { guardAdminRoute } from "@/lib/admin-api-guard";

export async function GET(request: NextRequest) {
  const authError = guardAdminRoute(request);
  if (authError) return authError;
  try {
    const searchParams = request.nextUrl.searchParams;
    const filter = searchParams.get("filter") || "all";

    const where: Record<string, unknown> = {};
    if (filter === "pending") {
      where.status = "PENDING";
    } else if (filter === "approved") {
      where.status = "APPROVED";
    } else if (filter === "rejected") {
      where.status = "REJECTED";
    }

    const prescribers = await prisma.prescriber.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(prescribers);
  } catch (error) {
    console.error("Failed to fetch prescribers:", error);
    return NextResponse.json({ error: "Failed to fetch prescribers" }, { status: 500 });
  }
}

// Admin can directly add a prescriber (already approved)
const addPrescriberSchema = z.object({
  name: z.string().min(2).max(200),
  credentials: z.string().min(1).max(50),
  email: z.string().email(),
  practiceName: z.string().max(200).optional(),
  specialty: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  website: z.string().url().optional().or(z.literal("")),
  address: z.string().max(200).optional(),
  city: z.string().min(1).max(100),
  state: z.string().min(1).max(50),
  zipCode: z.string().max(10).optional(),
  offersTelemedicine: z.boolean().default(false),
  acceptsInsurance: z.boolean().default(false),
  insuranceAccepted: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  const authError = guardAdminRoute(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const validated = addPrescriberSchema.parse(body);

    const prescriber = await prisma.prescriber.create({
      data: {
        name: validated.name,
        credentials: validated.credentials,
        email: validated.email,
        practiceName: validated.practiceName || null,
        specialty: validated.specialty || null,
        phone: validated.phone || null,
        website: validated.website || null,
        address: validated.address || null,
        city: validated.city,
        state: validated.state,
        zipCode: validated.zipCode || null,
        offersTelemedicine: validated.offersTelemedicine,
        acceptsInsurance: validated.acceptsInsurance,
        insuranceAccepted: validated.insuranceAccepted || [],
        status: "APPROVED", // Admin-added prescribers are auto-approved
        isVerified: true,
      },
    });

    return NextResponse.json(
      { id: prescriber.id, message: "Prescriber added successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Failed to add prescriber:", error);
    return NextResponse.json({ error: "Failed to add prescriber" }, { status: 500 });
  }
}
