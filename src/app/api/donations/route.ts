import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const donations = await prisma.donation.findMany({
      where: {
        showOnWall: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

    return NextResponse.json(donations);
  } catch (error) {
    console.error("Failed to fetch donations:", error);
    return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const donation = await prisma.donation.create({
      data: {
        amount: body.amount,
        currency: body.currency || "USD",
        donationType: "CRYPTO",
        tokenAmount: body.tokenAmount,
        tokenSymbol: body.tokenSymbol,
        txHash: body.txHash,
        walletAddress: body.walletAddress,
        chainId: body.chainId,
        displayName: body.displayName,
        message: body.message,
        isAnonymous: body.isAnonymous ?? true,
        showOnWall: body.showOnWall ?? true,
      },
    });

    return NextResponse.json(donation);
  } catch (error) {
    console.error("Failed to save donation:", error);
    return NextResponse.json({ error: "Failed to save donation" }, { status: 500 });
  }
}
