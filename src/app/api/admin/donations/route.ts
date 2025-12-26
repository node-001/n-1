import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { guardAdminRoute } from "@/lib/admin-api-guard";

export async function GET(request: NextRequest) {
  const authError = guardAdminRoute(request);
  if (authError) return authError;

  try {
    const searchParams = request.nextUrl.searchParams;
    const filter = searchParams.get("filter") || "all";
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const where: Record<string, unknown> = {};

    // Date range filter
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        (where.createdAt as Record<string, Date>).gte = new Date(startDate);
      }
      if (endDate) {
        // Add 1 day to include the end date
        const end = new Date(endDate);
        end.setDate(end.getDate() + 1);
        (where.createdAt as Record<string, Date>).lt = end;
      }
    }

    // Chain filter
    if (filter !== "all") {
      const chainId = parseInt(filter, 10);
      if (!isNaN(chainId)) {
        where.chainId = chainId;
      }
    }

    const [donations, stats] = await Promise.all([
      prisma.donation.findMany({
        where,
        orderBy: { createdAt: "desc" },
      }),
      // Get aggregate stats
      prisma.donation.aggregate({
        where,
        _sum: { amount: true },
        _count: { id: true },
      }),
    ]);

    // Get stats by chain
    const chainStats = await prisma.donation.groupBy({
      by: ["chainId"],
      where,
      _sum: { amount: true },
      _count: { id: true },
    });

    return NextResponse.json({
      donations,
      stats: {
        totalAmount: stats._sum.amount || 0,
        totalCount: stats._count.id || 0,
        byChain: chainStats.map((c) => ({
          chainId: c.chainId,
          amount: c._sum.amount || 0,
          count: c._count.id || 0,
        })),
      },
    });
  } catch (error) {
    console.error("Failed to fetch donations:", error);
    return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 });
  }
}
