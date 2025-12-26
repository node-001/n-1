import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createEntrySchema = z.object({
  title: z.string().max(200).nullable().optional(),
  storyText: z.string().min(10, "Story must be at least 10 characters").max(10000),
  displayName: z.string().max(100).nullable().optional(),
  isAnonymous: z.boolean().default(true),
  daysSinceStarting: z.number().int().min(0).max(10000),
  aiUsed: z.enum(["GROK", "CHATGPT", "CLAUDE", "GEMINI", "OTHER", "NONE"]),
  ketamineType: z.enum(["PRESCRIPTION", "NONE", "STREET"]),
  genuineExperience: z.boolean(),
  feelingLovedBefore: z.number().int().min(0).max(10),
  feelingLovedAfter: z.number().int().min(0).max(10),
  suicidalBefore: z.number().int().min(0).max(10),
  suicidalAfter: z.number().int().min(0).max(10),
  depressionBefore: z.number().int().min(0).max(10),
  depressionAfter: z.number().int().min(0).max(10),
  anxietyBefore: z.number().int().min(0).max(10),
  anxietyAfter: z.number().int().min(0).max(10),
  hopeBefore: z.number().int().min(0).max(10),
  hopeAfter: z.number().int().min(0).max(10),
  belongingBefore: z.number().int().min(0).max(10),
  belongingAfter: z.number().int().min(0).max(10),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createEntrySchema.parse(body);

    if (!validated.genuineExperience) {
      return NextResponse.json(
        { error: "You must confirm this is your genuine experience" },
        { status: 400 }
      );
    }

    const entry = await prisma.ledgerEntry.create({
      data: {
        title: validated.title || null,
        storyText: validated.storyText,
        displayName: validated.isAnonymous ? null : validated.displayName,
        isAnonymous: validated.isAnonymous,
        daysSinceStarting: validated.daysSinceStarting,
        aiUsed: validated.aiUsed,
        ketamineType: validated.ketamineType,
        genuineExperience: validated.genuineExperience,
        feelingLovedBefore: validated.feelingLovedBefore,
        feelingLovedAfter: validated.feelingLovedAfter,
        suicidalBefore: validated.suicidalBefore,
        suicidalAfter: validated.suicidalAfter,
        depressionBefore: validated.depressionBefore,
        depressionAfter: validated.depressionAfter,
        anxietyBefore: validated.anxietyBefore,
        anxietyAfter: validated.anxietyAfter,
        hopeBefore: validated.hopeBefore,
        hopeAfter: validated.hopeAfter,
        belongingBefore: validated.belongingBefore,
        belongingAfter: validated.belongingAfter,
        moderationStatus: "PENDING",
        moderationFlags: [],
      },
    });

    return NextResponse.json({ id: entry.id, message: "Story submitted successfully" }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Failed to create ledger entry:", error);
    return NextResponse.json({ error: "Failed to submit story" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sort = searchParams.get("sort") || "newest";
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    let orderBy: Record<string, string> = { createdAt: "desc" };
    if (sort === "loved") {
      orderBy = { heartCount: "desc" };
    }

    const entries = await prisma.ledgerEntry.findMany({
      where: {
        moderationStatus: "APPROVED",
      },
      orderBy,
      take: limit,
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

    return NextResponse.json(entries);
  } catch (error) {
    console.error("Failed to fetch ledger entries:", error);
    return NextResponse.json({ error: "Failed to fetch entries" }, { status: 500 });
  }
}
