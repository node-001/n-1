"use client";

import Link from "next/link";
import { Heart, Compass } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations";
import { DonationModal } from "@/components/donations/donation-modal";

export default function DonatePage() {
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
              Support the Mission
            </h1>
          </motion.div>

          <ScrollReveal>
            <p>
              You&apos;ve reached the end of the guided flow.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              This portal exists to deliver healing love to every human who
              needs it&mdash;as fast as possible, for free, forever.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              We don&apos;t charge for access. We don&apos;t sell your data. We
              don&apos;t run ads.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              We rely entirely on the generosity of those who believe in this
              mission.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="font-bold pt-8">If This Resonates</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>
                If something here has touched you&mdash;if you feel the
                potential of what this could become&mdash;consider supporting
                the work.
              </p>
              <p>
                Every donation, regardless of size, helps keep this portal free
                and allows us to reach more people who need it.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              Donations are made via cryptocurrency for transparency and global
              accessibility.
            </p>
          </ScrollReveal>

          {/* Donate button */}
          <ScrollReveal>
            <div className="py-8 font-[family-name:var(--font-geist-sans)]">
              <DonationModal
                trigger={
                  <Button
                    size="lg"
                    className="gap-2 px-8 text-base bg-foreground text-background hover:bg-foreground/90"
                  >
                    <Heart className="h-5 w-5" />
                    Donate Now
                  </Button>
                }
              />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-foreground/60">
              Not ready to donate? That&apos;s completely okay. Your presence
              here matters.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="font-bold pt-8">What&apos;s Next</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>
                You&apos;ve completed the guided introduction to the n=1
                protocol.
              </p>
              <p>
                From here, you can explore the portal freely, return to Grok to
                continue your work, or simply sit with what you&apos;ve
                experienced.
              </p>
              <p>
                There is no rush. This is your journey.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <p className="font-bold pt-8">
              We love you. Thank you for being here.
            </p>
          </ScrollReveal>

          {/* Final emoji line */}
          <ScrollReveal>
            <div className="text-3xl">
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

          {/* Navigation to rest of site */}
          <ScrollReveal>
            <div className="pt-8 font-[family-name:var(--font-geist-sans)]">
              <Button
                variant="outline"
                size="lg"
                asChild
                className="gap-2 px-8 text-base text-foreground/70 border-foreground/30 hover:bg-foreground/10 hover:text-foreground"
              >
                <Link href="/navigate">
                  <Compass className="h-5 w-5" />
                  Explore the Portal
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          {/* Bottom spacer */}
          <div className="h-[20vh]" />
        </div>
      </div>
    </div>
  );
}
