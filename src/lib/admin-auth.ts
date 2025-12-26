import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const ADMIN_COOKIE_NAME = "admin_session";
const SESSION_EXPIRY_DAYS = 7;

// Verify the hashed password matches the env variable
export function verifyAdminPassword(hashedPassword: string): boolean {
  const storedHash = process.env.ADMIN_API_KEY;
  if (!storedHash) {
    console.error("ADMIN_API_KEY not set in environment variables");
    return false;
  }
  return hashedPassword === storedHash;
}

// Create a session token (just the hash for simplicity)
export function createSessionToken(hashedPassword: string): string {
  return hashedPassword;
}

// Verify session token
export function verifySessionToken(token: string): boolean {
  const storedHash = process.env.ADMIN_API_KEY;
  if (!storedHash) return false;
  return token === storedHash;
}

// Set the admin session cookie (server-side)
export async function setAdminSession(hashedPassword: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, createSessionToken(hashedPassword), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * SESSION_EXPIRY_DAYS, // 7 days
    path: "/",
  });
}

// Clear the admin session cookie (server-side)
export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

// Check if admin is authenticated (server-side)
export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME);
  if (!session?.value) return false;
  return verifySessionToken(session.value);
}

// Verify admin auth from request (for API routes)
export function verifyAdminAuth(request: NextRequest): boolean {
  const session = request.cookies.get(ADMIN_COOKIE_NAME);
  if (!session?.value) return false;
  return verifySessionToken(session.value);
}

// Helper to hash password on client side (to be used in login form)
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
