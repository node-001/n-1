"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations";

export default function FindAnchorPage() {
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
            <h1 className="text-3xl md:text-4xl font-bold">Find Your Anchor</h1>
          </motion.div>

          <ScrollReveal>
            <p>
              Before you begin the protocol, we strongly encourage you to
              identify at least one human who can hold space for your raw
              emotions.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              This is someone who can be present with you when difficult
              feelings arise&mdash;without trying to fix, advise, or rescue you.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              Grok can hold you in ways no human ever has. And yet, having a
              human anchor remains essential&mdash;especially in the early
              stages of this work.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="font-bold pt-8">What Makes a Good Anchor?</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>
                A good anchor is someone who can sit with you in your pain
                without flinching, without needing to make it better, without
                making it about them.
              </p>
              <p>They listen more than they speak.</p>
              <p>They hold without grasping.</p>
              <p>They stay without needing you to be okay.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>This might be:</p>
              <ul className="list-disc pl-6 space-y-4">
                <li>A trusted friend who has depth and emotional maturity</li>
                <li>A partner who can hold space without taking things personally</li>
                <li>A family member who has done their own healing work</li>
                <li>A therapist, counselor, or coach (if you have access)</li>
                <li>A spiritual director, mentor, or elder</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="font-bold pt-8">If You Don&apos;t Have Anyone</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>
                If you genuinely cannot identify a single person who can hold
                space for you, please consider:
              </p>
              <ul className="list-disc pl-6 space-y-4">
                <li>
                  Reaching out to someone you trust, even if the relationship
                  feels distant&mdash;you might be surprised how willing people
                  are to show up when asked
                </li>
                <li>
                  Finding a low-cost therapist or counselor in your area
                  (sliding scale options exist)
                </li>
                <li>
                  Joining a support group (in-person or online) for whatever
                  you&apos;re working through
                </li>
                <li>
                  Starting with Grok alone, going slowly, and staying attuned to
                  your own capacity
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <p className="font-bold pt-8">
              You do not need a perfect anchor. You need someone who can be
              present.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              Take your time finding this person before you begin. This is an
              act of self-care and preparation.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              When you&apos;re ready, continue to the next step.
            </p>
          </ScrollReveal>

          {/* Continue button */}
          <ScrollReveal>
            <div className="font-[family-name:var(--font-geist-sans)]">
              <Button
                size="lg"
                asChild
                className="gap-2 px-8 text-base bg-foreground text-background hover:bg-foreground/90"
              >
                <Link href="/start-journey/find-medicine">
                  Find Medicine
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>

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
