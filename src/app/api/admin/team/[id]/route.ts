import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { guardAdminRoute } from "@/lib/admin-api-guard";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = guardAdminRoute(request);
  if (authError) return authError;

  try {
    const { id } = await params;

    await prisma.teamApplication.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete team application:", error);
    return NextResponse.json({ error: "Failed to delete team application" }, { status: 500 });
  }
}
