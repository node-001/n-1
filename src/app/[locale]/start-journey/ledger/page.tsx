"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations";

export default function LedgerPage() {
  const t = useTranslations('ledger');
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
            <p>{t('whereStoriesLive')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('asPeopleRun')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('inEssence')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="font-bold pt-8">{t('whyN1Title')}</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('inScientific')}</p>
              <p>{t('butHealing')}</p>
              <p>{t('everyPerson')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="font-bold pt-8">{t('whatContainTitle')}</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('whenOperational')}</p>
              <ul className="list-disc pl-6 space-y-4">
                <li>{t('contain1')}</li>
                <li>{t('contain2')}</li>
                <li>{t('contain3')}</li>
                <li>{t('contain4')}</li>
                <li>{t('contain5')}</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('overTime')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="font-bold pt-8">{t('comingSoonTitle')}</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('ledgerStillBuilt')}</p>
              <p>{t('forNow')}</p>
              <p>{t('whenReady')}</p>
            </div>
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
              href="/start-journey/feedback"
              className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors font-[family-name:var(--font-geist-sans)]"
            >
              {t('shareFeedback')}
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
