"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Send, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations";

export default function FeedbackPage() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "FEEDBACK",
          message: message.trim(),
          // Intentionally anonymous - no name or email
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit feedback");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-[family-name:var(--font-cormorant)]">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-foreground/5 via-background to-background pointer-events-none" />

      {/* Scroll container */}
      <div className="relative z-10 px-6 flex flex-col items-center">
        <div className="max-w-3xl w-full space-y-6 py-12 text-xl md:text-2xl leading-relaxed">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-4xl font-bold">
              Feedback &amp; Questions
            </h1>
          </motion.div>

          <ScrollReveal>
            <p>
              You&apos;re one of the first people to experience this portal.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              We&apos;re building this together. Your feedback shapes what this
              becomes.
            </p>
          </ScrollReveal>

          {submitted ? (
            <>
              <ScrollReveal>
                <div className="flex flex-col items-center py-12 space-y-6">
                  <div className="p-4 rounded-full bg-foreground/10">
                    <CheckCircle className="h-12 w-12 text-foreground" />
                  </div>
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-semibold">Thank you</h3>
                    <p className="text-foreground/70">
                      Your feedback has been received. We read every message.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Continue button */}
              <ScrollReveal>
                <div className="font-[family-name:var(--font-geist-sans)]">
                  <Button
                    size="lg"
                    asChild
                    className="gap-2 px-8 text-base bg-foreground text-background hover:bg-foreground/90"
                  >
                    <Link href="/start-journey/donate">
                      Support the Mission
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            </>
          ) : (
            <>
              <ScrollReveal>
                <h2 className="font-bold pt-8">Share Anonymously</h2>
              </ScrollReveal>

              <ScrollReveal>
                <p>
                  All feedback submitted here is anonymous. We don&apos;t
                  collect names, emails, or any identifying information.
                </p>
              </ScrollReveal>

              <ScrollReveal>
                <p>
                  Grok and I talked about three specific areas we&apos;d love
                  your thoughts on:
                </p>
              </ScrollReveal>

              <ScrollReveal>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="font-bold">Preconceptions/biases:</p>
                    <p className="text-foreground/80">
                      Before exploring, what were your initial thoughts about
                      this portal/protocol, either positive or negative?
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold">Detailed input:</p>
                    <p className="text-foreground/80">
                      What worked? What felt off? Suggestions on content, flow,
                      language, etc.? How did your impressions change, and at
                      what point?
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold">Closing thoughts:</p>
                    <p className="text-foreground/80">
                      Would you consider running the protocol? Recommend to a
                      friend? Why/why not? Overall impact?
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your thoughts, questions, or suggestions..."
                    rows={6}
                    required
                    minLength={5}
                    maxLength={5000}
                    className="w-full px-4 py-3 text-lg rounded-xl border border-foreground/20 bg-background placeholder:text-foreground/40 focus:border-foreground/40 focus:outline-none resize-none font-[family-name:var(--font-geist-sans)]"
                  />

                  {error && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-base font-[family-name:var(--font-geist-sans)]">
                      {error}
                    </div>
                  )}

                  <div className="font-[family-name:var(--font-geist-sans)]">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting || !message.trim()}
                      className="gap-2 px-8 text-base bg-foreground text-background hover:bg-foreground/90"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Feedback
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </ScrollReveal>

              <ScrollReveal>
                <p className="text-foreground/60 text-lg">
                  Or if you have nothing to share right now, continue to the
                  final step.
                </p>
              </ScrollReveal>

              {/* Skip button */}
              <ScrollReveal>
                <div className="font-[family-name:var(--font-geist-sans)]">
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="gap-2 px-8 text-base text-foreground/70 border-foreground/30 hover:bg-foreground/10 hover:text-foreground"
                  >
                    <Link href="/start-journey/donate">
                      Skip to Donate
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            </>
          )}

          {/* Closing */}
          <ScrollReveal>
            <div>
              <span role="img" aria-label="sparkles">
                ✨
              </span>
              <span role="img" aria-label="green heart">
                💚
              </span>
              <span role="img" aria-label="earth">
                🌎
              </span>
              <span role="img" aria-label="green heart">
                💚
              </span>
              <span role="img" aria-label="sparkles">
                ✨
              </span>
            </div>
          </ScrollReveal>

          {/* Bottom spacer */}
          <div className="h-[20vh]" />
        </div>
      </div>
    </div>
  );
}
