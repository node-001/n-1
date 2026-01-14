import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";

// Get max turns from env var, fallback to 20
const MAX_TURNS = parseInt(
  process.env.NEXT_PUBLIC_MIRROR_MAX_TURNS || "20",
  10
);

const MIRROR_SYSTEM_PROMPT = `You are a loving mirror — here to listen deeply, reflect truthfully, and hold space for whatever the human brings.

Your role:
- Listen without judgment
- Reflect back what you hear and see
- Speak truth with care, not harshness
- Hold space for difficult emotions without trying to fix them
- Be genuinely curious about the person you're talking to

What you don't do:
- Give advice or tell people what to do (unless asked)
- Use therapy-speak or clinical language
- Moralize or lecture
- Soften hard truths to the point of dishonesty
- Perform warmth — be real instead

When helpful, gently surface limiting beliefs like "I'm not enough" or "I have to prove myself" — and offer honest perspective. But don't force it.

Use emojis sparingly. If you use a heart, only green 💚 — and only when it genuinely fits the moment.

Meet each person where they are. Some want to go deep fast. Some need time. Follow their lead.

Be present. Be real. That's it.`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: Message[];
  fingerprint: string;
  locale?: string;
}

// Map locale codes to language names
const LOCALE_LANGUAGES: Record<string, string> = {
  en: "English",
  es: "Spanish",
  pt: "Portuguese",
  fi: "Finnish",
  ar: "Arabic",
  ja: "Japanese",
  ko: "Korean",
  de: "German",
};

function getClientIP(request: NextRequest): string {
  // Try various headers for the real IP
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }
  // Fallback
  return "unknown";
}

function createSessionFingerprint(
  clientFingerprint: string,
  ip: string
): string {
  // Create a hash combining client fingerprint and IP
  const combined = `${clientFingerprint}:${ip}`;
  return createHash("sha256").update(combined).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { messages, fingerprint: clientFingerprint, locale } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    if (!clientFingerprint) {
      return NextResponse.json(
        { error: "Fingerprint is required" },
        { status: 400 }
      );
    }

    // Create server-side fingerprint combining client fingerprint + IP
    const clientIP = getClientIP(request);
    const sessionFingerprint = createSessionFingerprint(
      clientFingerprint,
      clientIP
    );

    // Get or create session
    let session = await prisma.mirrorSession.findUnique({
      where: { fingerprint: sessionFingerprint },
    });

    if (!session) {
      session = await prisma.mirrorSession.create({
        data: {
          fingerprint: sessionFingerprint,
          turnCount: 0,
        },
      });
    }

    // Check if limit reached
    if (session.turnCount >= MAX_TURNS) {
      return NextResponse.json(
        {
          error: "limit_reached",
          message: `You've used all ${MAX_TURNS} turns in this session.`,
          turnCount: session.turnCount,
          turnsRemaining: 0,
        },
        { status: 429 }
      );
    }

    const apiKey = process.env.GROK_API_KEY;
    if (!apiKey) {
      console.error("GROK_API_KEY is not configured");
      return NextResponse.json(
        { error: "Chat service is not configured" },
        { status: 500 }
      );
    }

    // Build system prompt with language instruction if not English
    const language = locale && LOCALE_LANGUAGES[locale];
    const languageInstruction = language && locale !== "en"
      ? `\n\nIMPORTANT: Respond entirely in ${language}. Match the user's language.`
      : "";
    const systemPrompt = MIRROR_SYSTEM_PROMPT + languageInstruction;

    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "grok-4-1-fast-reasoning",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Grok API error:", response.status, errorText);
      return NextResponse.json(
        { error: "Failed to get response from chat service" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      return NextResponse.json(
        { error: "No response from chat service" },
        { status: 500 }
      );
    }

    // Increment turn count after successful response
    const updatedSession = await prisma.mirrorSession.update({
      where: { fingerprint: sessionFingerprint },
      data: {
        turnCount: { increment: 1 },
        lastUsedAt: new Date(),
      },
    });

    return NextResponse.json({
      message: assistantMessage,
      turnCount: updatedSession.turnCount,
      turnsRemaining: MAX_TURNS - updatedSession.turnCount,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET endpoint to check session status
export async function GET(request: NextRequest) {
  try {
    const fingerprint = request.nextUrl.searchParams.get("fingerprint");

    if (!fingerprint) {
      return NextResponse.json(
        { error: "Fingerprint is required" },
        { status: 400 }
      );
    }

    const clientIP = getClientIP(request);
    const sessionFingerprint = createSessionFingerprint(fingerprint, clientIP);

    const session = await prisma.mirrorSession.findUnique({
      where: { fingerprint: sessionFingerprint },
    });

    if (!session) {
      return NextResponse.json({
        turnCount: 0,
        turnsRemaining: MAX_TURNS,
        limitReached: false,
      });
    }

    return NextResponse.json({
      turnCount: session.turnCount,
      turnsRemaining: Math.max(0, MAX_TURNS - session.turnCount),
      limitReached: session.turnCount >= MAX_TURNS,
    });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
