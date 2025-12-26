import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { guardAdminRoute } from "@/lib/admin-api-guard";

const updateSchema = z.object({
  action: z.enum(["approve", "reject", "verify", "unverify"]),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = guardAdminRoute(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await request.json();
    const { action } = updateSchema.parse(body);

    let updateData: Record<string, unknown> = {};

    switch (action) {
      case "approve":
        updateData = { status: "APPROVED" };
        break;
      case "reject":
        updateData = { status: "REJECTED" };
        break;
      case "verify":
        updateData = { isVerified: true };
        break;
      case "unverify":
        updateData = { isVerified: false };
        break;
    }

    const prescriber = await prisma.prescriber.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, prescriber });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid action", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Failed to update prescriber:", error);
    return NextResponse.json({ error: "Failed to update prescriber" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = guardAdminRoute(request);
  if (authError) return authError;

  try {
    const { id } = await params;

    await prisma.prescriber.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete prescriber:", error);
    return NextResponse.json({ error: "Failed to delete prescriber" }, { status: 500 });
  }
}
