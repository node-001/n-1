"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Send } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// Get max turns from env var, fallback to 20
const MAX_TURNS = parseInt(process.env.NEXT_PUBLIC_MIRROR_MAX_TURNS || "20", 10);

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface MirrorChatProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Generate a fingerprint from browser characteristics
function generateFingerprint(): string {
  const components = [
    navigator.userAgent,
    navigator.language,
    new Date().getTimezoneOffset().toString(),
    screen.width.toString(),
    screen.height.toString(),
    screen.colorDepth.toString(),
    navigator.hardwareConcurrency?.toString() || "unknown",
  ];

  // Simple hash function
  const str = components.join("|");
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

export function MirrorChat({ open, onOpenChange }: MirrorChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const [turnsRemaining, setTurnsRemaining] = useState(MAX_TURNS);
  const [limitReached, setLimitReached] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Generate fingerprint on mount
  useEffect(() => {
    // Check if we have a stored fingerprint, otherwise generate new one
    const storedFingerprint = localStorage.getItem("n1-mirror-fp");
    if (storedFingerprint) {
      setFingerprint(storedFingerprint);
    } else {
      const newFingerprint = generateFingerprint();
      localStorage.setItem("n1-mirror-fp", newFingerprint);
      setFingerprint(newFingerprint);
    }
  }, []);

  // Check session status when fingerprint is ready
  useEffect(() => {
    if (!fingerprint) return;

    const checkSession = async () => {
      try {
        const response = await fetch(
          `/api/chat/mirror?fingerprint=${encodeURIComponent(fingerprint)}`
        );
        if (response.ok) {
          const data = await response.json();
          setTurnsRemaining(data.turnsRemaining);
          setLimitReached(data.limitReached);
        }
      } catch (error) {
        console.error("Failed to check session:", error);
      } finally {
        setSessionChecked(true);
      }
    };

    checkSession();
  }, [fingerprint]);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (open && inputRef.current && !limitReached && sessionChecked) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, limitReached, sessionChecked]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading || limitReached || !fingerprint) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat/mirror", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          fingerprint,
        }),
      });

      const data = await response.json();

      if (response.status === 429 || data.error === "limit_reached") {
        setLimitReached(true);
        setTurnsRemaining(0);
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
      setTurnsRemaining(data.turnsRemaining);

      if (data.turnsRemaining <= 0) {
        setLimitReached(true);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, limitReached, fingerprint, messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={`flex flex-col p-0 ${
          isMobile
            ? "h-[100dvh] w-full max-w-none rounded-t-xl"
            : "w-full sm:max-w-[50vw]"
        }`}
      >
        {/* Header */}
        <SheetHeader className="border-b border-foreground/10 p-4 pr-12">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-[family-name:var(--font-cormorant)] text-xl">
              The Mirror
            </SheetTitle>
            {sessionChecked && (
              <span className="text-sm text-foreground/60">
                {turnsRemaining} / {MAX_TURNS} turns
              </span>
            )}
          </div>
        </SheetHeader>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {/* Initial invitation if no messages and not limit reached */}
            {messages.length === 0 && !limitReached && sessionChecked && (
              <div className="text-center py-8">
                <p className="text-foreground/70 font-[family-name:var(--font-cormorant)] text-lg italic">
                  &quot;Tell me something you&apos;ve never told another
                  human.&quot;
                </p>
                <p className="text-foreground/50 text-sm mt-4">
                  Or share whatever feels true right now.
                </p>
              </div>
            )}

            {/* Message bubbles */}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-foreground text-background"
                      : "bg-foreground/10 text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-foreground/10 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" />
                    <span
                      className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <span
                      className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Limit reached message */}
            {limitReached && sessionChecked && (
              <div className="py-6 space-y-6">
                <div className="text-center border-t border-foreground/10 pt-6">
                  <p className="text-foreground/80 font-[family-name:var(--font-cormorant)] text-xl">
                    Your 20 turns have ended.
                  </p>
                  <p className="text-foreground/60 text-sm mt-4 leading-relaxed">
                    We hope that was meaningful for you. The next page called
                    Useful Information will give you much more information about
                    interacting with Grok.
                  </p>
                </div>

                <div className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => (window.location.href = "/start-journey/useful-info")}
                    className="focus-visible:ring-foreground/20"
                  >
                    Continue to Useful Information
                  </Button>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input area */}
        <div className="border-t border-foreground/10 p-4">
          <div className="flex gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                limitReached
                  ? "Session complete"
                  : "Share what's on your heart..."
              }
              disabled={isLoading || limitReached || !sessionChecked}
              className="flex-1 min-h-[44px] max-h-[120px] resize-none rounded-xl border border-foreground/20 bg-background px-4 py-3 text-sm placeholder:text-foreground/40 focus:border-foreground/40 focus:outline-none disabled:opacity-50"
              rows={1}
            />
            <Button
              onClick={sendMessage}
              disabled={
                !input.trim() || isLoading || limitReached || !sessionChecked
              }
              size="icon"
              className="h-[44px] w-[44px] rounded-xl bg-foreground text-background hover:bg-foreground/90 focus-visible:ring-foreground/20"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
