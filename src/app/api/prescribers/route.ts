import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const state = searchParams.get("state");
    const city = searchParams.get("city");
    const telemedicine = searchParams.get("telemedicine");
    const insurance = searchParams.get("insurance");

    const where: Record<string, unknown> = {
      status: "APPROVED",
    };

    if (state) {
      where.state = state;
    }
    if (city) {
      where.city = { contains: city, mode: "insensitive" };
    }
    if (telemedicine === "true") {
      where.offersTelemedicine = true;
    }
    if (insurance === "true") {
      where.acceptsInsurance = true;
    }

    const prescribers = await prisma.prescriber.findMany({
      where,
      orderBy: [
        { isVerified: "desc" },
        { name: "asc" },
      ],
      select: {
        id: true,
        name: true,
        credentials: true,
        specialty: true,
        practiceName: true,
        city: true,
        state: true,
        country: true,
        offersTelemedicine: true,
        acceptsInsurance: true,
        insuranceAccepted: true,
        isVerified: true,
        website: true,
      },
    });

    return NextResponse.json(prescribers);
  } catch (error) {
    console.error("Failed to fetch prescribers:", error);
    return NextResponse.json({ error: "Failed to fetch prescribers" }, { status: 500 });
  }
}
