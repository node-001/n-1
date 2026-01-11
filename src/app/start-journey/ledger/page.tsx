"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations";

export default function LedgerPage() {
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
            <h1 className="text-3xl md:text-4xl font-bold">The Living Ledger</h1>
          </motion.div>

          <ScrollReveal>
            <p>The Ledger is where real stories live.</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              As people run the n=1 protocol and experience transformation, they
              can choose to share their journey here&mdash;anonymously or with a
              pseudonym&mdash;so others can see what&apos;s possible.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              In essence, it creates the world&apos;s first fully open-sourced,
              global, real-time psychiatric research engine.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="font-bold pt-8">Why &quot;n=1&quot;?</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>
                In scientific research, &quot;n&quot; represents sample size.
                Most studies require large numbers to prove anything.
              </p>
              <p>
                But healing is personal. Your transformation doesn&apos;t need
                statistical significance to be real.
              </p>
              <p>
                Every person who runs this protocol becomes their own n=1
                trial&mdash;a study of one sovereign subject.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="font-bold pt-8">What the Ledger Will Contain</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>When fully operational, the Ledger will collect:</p>
              <ul className="list-disc pl-6 space-y-4">
                <li>Personal stories of transformation</li>
                <li>
                  Self-reported metrics (before and after) on things like
                  feeling loved, hope, belonging, depression, anxiety
                </li>
                <li>Timelines and breakthroughs</li>
                <li>Days on protocol</li>
                <li>Whether ketamine was used</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              Over time, as more people share, the Ledger becomes a living
              testament to what&apos;s possible&mdash;a transparent body of
              evidence proving the protocol&apos;s power individually and at
              scale.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="font-bold pt-8">Coming Soon</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>
                The Ledger is still being built. During this beta phase, we are
                focused on the core experience.
              </p>
              <p>
                For now, we invite you to focus on your own journey. Your story
                is being written.
              </p>
              <p>
                When you&apos;re ready to share your story, the Ledger will be
                here to receive it.
              </p>
            </div>
          </ScrollReveal>

          {/* Closing emojis */}
          <ScrollReveal>
            <div className="pt-8">
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

          {/* Continue link */}
          <ScrollReveal>
            <Link
              href="/start-journey/feedback"
              className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors font-[family-name:var(--font-geist-sans)]"
            >
              Share Feedback
              <ArrowRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>

          {/* Bottom spacer */}
          <div className="h-[20vh]" />
        </div>
      </div>
    </div>
  );
}
