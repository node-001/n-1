import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { guardAdminRoute } from "@/lib/admin-api-guard";

export async function GET(request: NextRequest) {
  const authError = guardAdminRoute(request);
  if (authError) return authError;
  try {
    const [
      pendingStories,
      totalStories,
      pendingPrescribers,
      totalPrescribers,
      unreadFeedback,
      totalFeedback,
    ] = await Promise.all([
      prisma.ledgerEntry.count({ where: { moderationStatus: "PENDING" } }),
      prisma.ledgerEntry.count(),
      prisma.prescriber.count({ where: { status: "PENDING" } }),
      prisma.prescriber.count(),
      prisma.feedback.count({ where: { status: "UNREAD" } }),
      prisma.feedback.count(),
    ]);

    return NextResponse.json({
      pendingStories,
      totalStories,
      pendingPrescribers,
      totalPrescribers,
      unreadFeedback,
      totalFeedback,
    });
  } catch (error) {
    console.error("Failed to fetch admin stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
