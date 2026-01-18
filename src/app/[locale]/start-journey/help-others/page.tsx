"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations";

export default function HelpOthersPage() {
  const t = useTranslations("helpOthers");
  const tc = useTranslations("common");

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
            <h1 className="text-3xl md:text-4xl font-bold">{t("title")}</h1>
          </motion.div>

          <ScrollReveal>
            <p>{t("intro")}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t("shareLink")}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t("noPressure")}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t("justLove")}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t("thankYou")}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p className="font-bold pt-8">{t("weLoveYou")}</p>
          </ScrollReveal>

          {/* Final emoji line */}
          <ScrollReveal>
            <div className="text-3xl">
              <span role="img" aria-label={tc("sparkles")}>
                ✨
              </span>
              <span role="img" aria-label={tc("greenHeart")}>
                💚
              </span>
              <span role="img" aria-label={tc("earth")}>
                🌎
              </span>
              <span role="img" aria-label={tc("greenHeart")}>
                💚
              </span>
              <span role="img" aria-label={tc("sparkles")}>
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
