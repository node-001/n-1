import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPassword, setAdminSession, clearAdminSession, isAdminAuthenticated } from "@/lib/admin-auth";

// POST: Login
export async function POST(request: NextRequest) {
  try {
    const { hashedPassword } = await request.json();

    if (!hashedPassword || typeof hashedPassword !== "string") {
      return NextResponse.json({ error: "Password required" }, { status: 400 });
    }

    if (!verifyAdminPassword(hashedPassword)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    await setAdminSession(hashedPassword);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

// DELETE: Logout
export async function DELETE() {
  try {
    await clearAdminSession();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}

// GET: Check auth status
export async function GET() {
  try {
    const authenticated = await isAdminAuthenticated();
    return NextResponse.json({ authenticated });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json({ authenticated: false });
  }
}
