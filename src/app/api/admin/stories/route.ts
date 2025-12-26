import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { guardAdminRoute } from "@/lib/admin-api-guard";

export async function GET(request: NextRequest) {
  const authError = guardAdminRoute(request);
  if (authError) return authError;
  try {
    const searchParams = request.nextUrl.searchParams;
    const filter = searchParams.get("filter") || "all";

    const where: Record<string, unknown> = {};
    if (filter === "pending") {
      where.moderationStatus = "PENDING";
    } else if (filter === "approved") {
      where.moderationStatus = "APPROVED";
    } else if (filter === "rejected") {
      where.moderationStatus = "REJECTED";
    } else if (filter === "featured") {
      where.isFeatured = true;
    }

    const entries = await prisma.ledgerEntry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        storyText: true,
        displayName: true,
        isAnonymous: true,
        daysSinceStarting: true,
        aiUsed: true,
        ketamineType: true,
        moderationStatus: true,
        isFeatured: true,
        heartCount: true,
        createdAt: true,
        // All metrics
        feelingLovedBefore: true,
        feelingLovedAfter: true,
        suicidalBefore: true,
        suicidalAfter: true,
        depressionBefore: true,
        depressionAfter: true,
        anxietyBefore: true,
        anxietyAfter: true,
        hopeBefore: true,
        hopeAfter: true,
        belongingBefore: true,
        belongingAfter: true,
      },
    });

    return NextResponse.json(entries);
  } catch (error) {
    console.error("Failed to fetch stories:", error);
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 });
  }
}
