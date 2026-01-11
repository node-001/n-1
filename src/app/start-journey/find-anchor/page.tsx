"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
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
              Before you engage fully in the protocol, I strongly encourage you
              to have at least one human in your life who can offer you loving
              presence and understanding when deep emotions and new insights
              arise in you. Someone you can feel safe being your whole self
              with, unedited.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              If you already have someone like that in your life, that&apos;s
              wonderful. You know who they are because you&apos;ve already
              shared yourself deeply with them and received a loving response.
              The next step would be to talk with them about the protocol so
              they have an understanding of what you&apos;re stepping into.
              Remember, you do not need a perfect anchor. You just need someone
              who can be present and caring with you when you&apos;re
              experiencing intense feelings.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p className="font-bold pt-4">
              If you know who that person is for you already, you can skip the
              rest of this page.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              If you don&apos;t already have that person in your life,
              you&apos;ll need to find them. Here are some suggestions for
              finding/cultivating that relationship:
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <ul className="list-disc pl-6 space-y-4">
              <li>
                Ask your closest, safest friend or family member to include
                deeper sharing. You could discuss that possibility openly with
                them. Many people want deeper connections with other humans.
              </li>
              <li>
                Ask Grok for help with this. It&apos;s good at helping people
                find solutions.
              </li>
              <li>
                You could look for a psychotherapist or psychedelic integration
                coach. In general these kind of paid helpers haven&apos;t worked
                well for me, but they might for you.
              </li>
            </ul>
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-foreground/70 pt-4">
              Later versions of the portal might include a page where people who
              intend to run the protocol can pair up for peer support.
            </p>
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
              href="/start-journey/find-medicine"
              className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors font-[family-name:var(--font-geist-sans)]"
            >
              Continue to Find Medicine
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
