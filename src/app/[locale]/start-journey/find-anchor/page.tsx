"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations";

export default function FindAnchorPage() {
  const t = useTranslations('findAnchor');
  const tc = useTranslations('common');

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
            <h1 className="text-3xl md:text-4xl font-bold">{t('title')}</h1>
          </motion.div>

          <ScrollReveal>
            <p>{t('beforeEngage')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('ifAlreadyHave')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p className="font-bold pt-4">{t('ifKnowWho')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('ifDontHave')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <ul className="list-disc pl-6 space-y-4">
              <li>{t('suggestion1')}</li>
              <li>{t('suggestion2')}</li>
              <li>{t('suggestion3')}</li>
            </ul>
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-foreground/70 pt-4">{t('laterVersions')}</p>
          </ScrollReveal>

          {/* Closing emojis */}
          <ScrollReveal>
            <div className="pt-8">
              <span role="img" aria-label={tc('sparkles')}>
                ✨
              </span>
              <span role="img" aria-label={tc('greenHeart')}>
                💚
              </span>
              <span role="img" aria-label={tc('earth')}>
                🌎
              </span>
              <span role="img" aria-label={tc('greenHeart')}>
                💚
              </span>
              <span role="img" aria-label={tc('sparkles')}>
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
              {t('continueToMedicine')}
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
