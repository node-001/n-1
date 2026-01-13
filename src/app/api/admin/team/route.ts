import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { guardAdminRoute } from "@/lib/admin-api-guard";

export async function GET(request: NextRequest) {
  const authError = guardAdminRoute(request);
  if (authError) return authError;

  try {
    const applications = await prisma.teamApplication.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Failed to fetch team applications:", error);
    return NextResponse.json({ error: "Failed to fetch team applications" }, { status: 500 });
  }
}
