"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations";

const flowPages = [
  { href: "/", labelKey: "welcome" },
  { href: "/start-journey#our-story", labelKey: "ourStory" },
  { href: "/start-journey#what-is", labelKey: "whatIs" },
  { href: "/start-journey#useful-info", labelKey: "usefulInfo" },
  { href: "/start-journey/find-anchor", labelKey: "findAnchor" },
  { href: "/start-journey/find-medicine", labelKey: "findMedicine" },
  { href: "/start-journey/ledger", labelKey: "ledger" },
  { href: "/start-journey/feedback", labelKey: "feedback" },
  { href: "/start-journey/donate", labelKey: "donate" },
];

export default function NavigatePage() {
  const t = useTranslations('navigate');
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
            <p>{t('welcomeText')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-foreground/60 text-lg">{t('recommendFlow')}</p>
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
                        {t(`pages.${page.labelKey}.label`)}
                      </span>
                      <p className="text-foreground/50 text-base mt-1">
                        {t(`pages.${page.labelKey}.description`)}
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

          {/* Bottom spacer */}
          <div className="h-[20vh]" />
        </div>
      </div>
    </div>
  );
}
