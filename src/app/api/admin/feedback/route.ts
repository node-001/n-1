import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { guardAdminRoute } from "@/lib/admin-api-guard";

export async function GET(request: NextRequest) {
  const authError = guardAdminRoute(request);
  if (authError) return authError;

  try {
    const searchParams = request.nextUrl.searchParams;
    const filter = searchParams.get("filter") || "unread";

    const where: Record<string, unknown> = {};
    if (filter === "unread") {
      where.status = "UNREAD";
    } else if (filter === "read") {
      where.status = "READ";
    } else if (filter === "archived") {
      where.status = "ARCHIVED";
    }
    // "all" = no filter

    const feedback = await prisma.feedback.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error("Failed to fetch feedback:", error);
    return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 });
  }
}
