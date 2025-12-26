import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "./admin-auth";

/**
 * Guard function for admin API routes.
 * Returns an error response if not authenticated, null if authenticated.
 */
export function guardAdminRoute(request: NextRequest): NextResponse | null {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  return null;
}
