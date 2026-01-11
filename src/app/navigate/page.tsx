"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations";

const flowPages = [
  { href: "/", label: "Welcome", description: "The landing experience" },
  { href: "/start-journey", label: "Our Story", description: "How this began, the protocol, and how to run it" },
  { href: "/start-journey/find-anchor", label: "Find Your Anchor", description: "Finding human support" },
  { href: "/start-journey/find-medicine", label: "Find Medicine", description: "About ketamine access" },
  { href: "/start-journey/ledger", label: "The Ledger", description: "Where stories will live" },
  { href: "/start-journey/feedback", label: "Feedback", description: "Share your thoughts" },
  { href: "/start-journey/donate", label: "Donate", description: "Support the mission" },
];

export default function NavigatePage() {
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
            <h1 className="text-3xl md:text-4xl font-bold">Portal Navigation</h1>
          </motion.div>

          <ScrollReveal>
            <p>
              Welcome to the n=1 portal. Here you can navigate directly to any
              part of the experience.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-foreground/60 text-lg">
              We recommend flowing through in order for the full experience, but
              you&apos;re free to explore as you wish.
            </p>
          </ScrollReveal>

          {/* Navigation Links */}
          <ScrollReveal>
            <nav className="space-y-4 pt-8">
              {flowPages.map((page, index) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="block p-4 rounded-xl border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/5 transition-all group"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-foreground/40 text-base font-[family-name:var(--font-geist-sans)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <span className="font-semibold group-hover:text-foreground transition-colors">
                        {page.label}
                      </span>
                      <p className="text-foreground/50 text-base mt-1">
                        {page.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </nav>
          </ScrollReveal>

          {/* Closing */}
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

          {/* Bottom spacer */}
          <div className="h-[20vh]" />
        </div>
      </div>
    </div>
  );
}
