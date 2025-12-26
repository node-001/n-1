import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const entry = await prisma.ledgerEntry.findUnique({
      where: {
        id,
        moderationStatus: "APPROVED",
      },
      select: {
        id: true,
        title: true,
        storyText: true,
        displayName: true,
        isAnonymous: true,
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
        daysSinceStarting: true,
        aiUsed: true,
        ketamineType: true,
        heartCount: true,
        isFeatured: true,
        createdAt: true,
      },
    });

    if (!entry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    return NextResponse.json(entry);
  } catch (error) {
    console.error("Failed to fetch ledger entry:", error);
    return NextResponse.json({ error: "Failed to fetch entry" }, { status: 500 });
  }
}
