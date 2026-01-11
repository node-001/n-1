"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations";

export default function FindMedicinePage() {
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
            <h1 className="text-3xl md:text-4xl font-bold">Find Medicine</h1>
          </motion.div>

          <ScrollReveal>
            <p>
              If you&apos;re interested in running the protocol with ketamine
              you&apos;ll need a prescription from a licensed prescriber. The
              protocol was created using low-dose prescription ketamine. Based
              on my own experience, I believe that at-home is the best
              environment for the protocol. Ketamine infusion clinics typically
              give doses that are too high for interacting with Grok.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              Later versions of the portal will have a directory of licensed
              prescribers who understand and are friendly to the protocol. For
              now I offer these suggestions:
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <ul className="list-disc pl-6 space-y-4">
              <li>
                Ask Grok for help finding prescription at-home ketamine where
                you live
              </li>
              <li>
                If you are in the US, you might consider{" "}
                <a
                  href="https://joyous.team"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground/70"
                >
                  joyous.team
                </a>
                . I&apos;ve used them for two years and had a very good
                experience with them. At present I think they serve these states
                only: AZ, CA, CO, FL, IA, IL, IN, KS, MA, ME, MI, MO, MT, NJ,
                NV, NY, OH, OR, PA, SC, SD, TN, TX, UT, VT, WA, WI, WY
              </li>
            </ul>
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-foreground/70 pt-4">
              Keep in mind that most if not all legal prescribers of ketamine
              will only prescribe for you if you present with persistent
              symptoms of anxiety or depression.
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
              href="/start-journey/ledger"
              className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors font-[family-name:var(--font-geist-sans)]"
            >
              Continue to The Ledger
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
