import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { guardAdminRoute } from "@/lib/admin-api-guard";

const updateSchema = z.object({
  action: z.enum(["read", "unread", "archive"]),
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

    let status: "UNREAD" | "READ" | "ARCHIVED";
    switch (action) {
      case "read":
        status = "READ";
        break;
      case "unread":
        status = "UNREAD";
        break;
      case "archive":
        status = "ARCHIVED";
        break;
    }

    const feedback = await prisma.feedback.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, feedback });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid action", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Failed to update feedback:", error);
    return NextResponse.json({ error: "Failed to update feedback" }, { status: 500 });
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

    await prisma.feedback.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete feedback:", error);
    return NextResponse.json({ error: "Failed to delete feedback" }, { status: 500 });
  }
}
