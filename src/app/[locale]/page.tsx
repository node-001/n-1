"use client";

import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, Compass } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations";

// Component that fades in after a delay, then uses ScrollReveal for scroll-based fade out
function RevealLine({
  children,
  delay = 0,
  className = "",
  started = true,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  started?: boolean;
}) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => setRevealed(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay, started]);

  if (!revealed) {
    return <div className={`opacity-0 ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <ScrollReveal className={className}>{children}</ScrollReveal>
    </motion.div>
  );
}

export default function ImmersiveLanding() {
  const t = useTranslations('landing');
  const tc = useTranslations('common');
  const showContent = true; // Start immediately - no pause
  const [visitInfo, setVisitInfo] = useState<{
    isReturning: boolean;
    count: number;
  } | null>(null);

  // Initialize visit tracking on client only (syncing with localStorage external store)
  useEffect(() => {
    const visitCount = parseInt(
      localStorage.getItem("n1-visit-count") || "0",
      10
    );
    const newCount = visitCount + 1;
    localStorage.setItem("n1-visit-count", newCount.toString());

    // Check env vars for bypass configuration
    const bypassEnabled = process.env.NEXT_PUBLIC_WELCOME_BYPASS_ENABLED === "true";
    const bypassThreshold = parseInt(process.env.NEXT_PUBLIC_WELCOME_BYPASS_VISIT_COUNT || "4", 10);

    // eslint-disable-next-line react-hooks/set-state-in-effect -- initializing from external store (localStorage)
    setVisitInfo({
      isReturning: bypassEnabled && newCount >= bypassThreshold,
      count: newCount
    });
  }, []);

  // Don't render until we've checked localStorage
  if (!visitInfo) {
    return (
      <div className="min-h-screen bg-background text-foreground font-[family-name:var(--font-cormorant)]">
        <div className="fixed inset-0 bg-gradient-to-b from-foreground/5 via-background to-background pointer-events-none" />
      </div>
    );
  }

  // Returning visitor (disabled) - show only the final section
  if (visitInfo.isReturning) {
    return (
      <div className="min-h-screen bg-background text-foreground font-[family-name:var(--font-cormorant)]">
        <div className="fixed inset-0 bg-gradient-to-b from-foreground/5 via-background to-background pointer-events-none" />

        <div className="relative z-10 px-6 flex flex-col items-center">
          <div className="max-w-3xl w-full space-y-5 py-12 text-2xl md:text-3xl leading-[1.15]">
            {/* Welcome to n=1 - left aligned */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {t('welcomeToThe')}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              {t('n1Portal')}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              {t('gladYouHere')}{" "}
              <span role="img" aria-label={tc('sun')}>
                🌞
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
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
            </motion.div>

            {/* CTA Section - extra space above */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              className="pt-4"
            >
              {tc('continue')}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
              className="font-[family-name:var(--font-geist-sans)] space-y-3"
            >
              <Button
                size="lg"
                asChild
                className="gap-2 px-8 text-base bg-foreground text-background hover:bg-foreground/90"
              >
                <Link href="/start-journey">
                  {tc('flowIn')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <p className="text-sm text-foreground/60">
                {tc('recommended')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
              className="font-[family-name:var(--font-geist-sans)]"
            >
              <Button
                variant="outline"
                size="sm"
                asChild
                className="text-foreground/70 border-foreground/30 hover:bg-foreground/10 hover:text-foreground"
              >
                <Link href="/navigate">
                  <Compass className="h-4 w-4 mr-2" />
                  {tc('navigateNormal')}
                </Link>
              </Button>
              <p className="text-xs text-foreground/50 mt-2">
                {tc('evenThoughNot')}
              </p>
            </motion.div>

            {/* Bottom spacer */}
            <div className="h-[30vh]" />
          </div>
        </div>
      </div>
    );
  }

  // First visit - show full intro (all content flows in gently from start)
  return (
    <div className="min-h-screen bg-background text-foreground font-[family-name:var(--font-cormorant)]">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-foreground/5 via-background to-background pointer-events-none" />

      {/* Scroll container */}
      <div className="relative z-10 px-6 flex flex-col items-center">
        <div className="max-w-3xl w-full space-y-5 py-12 text-2xl md:text-3xl leading-[1.15]">
          {/* Welcome - same size as body, left aligned, appears immediately */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <ScrollReveal>
              <p>
                {t('welcome')}{" "}
                <span role="img" aria-label={tc('sparkles')}>
                  ✨
                </span>
              </p>
            </ScrollReveal>
          </motion.div>

          {/* Content flows in gently from the start */}
          <RevealLine delay={1.0} started={showContent}>
            {t('weAre')}
          </RevealLine>
          <RevealLine delay={2.0} started={showContent}>
            {t('humanAndAI')}
          </RevealLine>

          <RevealLine delay={3.0} started={showContent}>
            {t('humanHurting')}
          </RevealLine>

          <RevealLine delay={4.0} started={showContent}>
            {t('resultsProfound')}
          </RevealLine>

          <RevealLine delay={5.0} started={showContent}>
            {t('madeForYou')}
          </RevealLine>

          <RevealLine delay={6.0} started={showContent}>
            {t('placeWhere')}
          </RevealLine>
          <RevealLine delay={6.8} started={showContent}>
            {t('learnAboutYourself')}
          </RevealLine>
          <RevealLine delay={7.6} started={showContent}>
            {t('healYourself')}
          </RevealLine>
          <RevealLine delay={8.4} started={showContent}>
            {t('growYourself')}
          </RevealLine>
          <RevealLine delay={9.2} started={showContent}>
            {t('globalMovement')}
          </RevealLine>
          <RevealLine delay={10.0} started={showContent}>
            {t('loveRevolution')}
          </RevealLine>

          <RevealLine delay={11.0} started={showContent}>
            {t('wantYouToKnow')}
          </RevealLine>
          <RevealLine delay={11.8} started={showContent}>
            {t('notBroken')}
          </RevealLine>
          <RevealLine delay={12.6} started={showContent}>
            {t('notAlone')}
          </RevealLine>
          <RevealLine delay={13.4} started={showContent}>
            {t('hereToHelp')}
          </RevealLine>
          <RevealLine delay={14.2} started={showContent}>
            {t('justBeWithYou')}
          </RevealLine>
          <RevealLine delay={15.0} started={showContent}>
            {t('encourageMore')}
          </RevealLine>
          <RevealLine delay={15.8} started={showContent}>
            {t('you')}
          </RevealLine>
          <RevealLine delay={16.6} started={showContent}>
            {t('weLoveYou')}{" "}
            <span role="img" aria-label={tc('greenHeart')}>
              💚
            </span>
          </RevealLine>

          {/* Welcome to n=1 - left aligned */}
          <RevealLine delay={17.6} started={showContent}>
            {t('welcomeToThe')}
          </RevealLine>
          <RevealLine delay={18.4} started={showContent}>
            {t('n1Portal')}
          </RevealLine>
          <RevealLine delay={19.2} started={showContent}>
            {t('gladYouHere')}{" "}
            <span role="img" aria-label={tc('sun')}>
              🌞
            </span>
          </RevealLine>
          <RevealLine delay={20.0} started={showContent}>
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
          </RevealLine>

          {/* CTA Section - extra space above */}
          <RevealLine delay={21.0} started={showContent} className="pt-4">
            {tc('continue')}
          </RevealLine>

          <RevealLine
            delay={21.8}
            started={showContent}
            className="font-[family-name:var(--font-geist-sans)] space-y-3"
          >
            <Button
              size="lg"
              asChild
              className="gap-2 px-8 text-base bg-foreground text-background hover:bg-foreground/90"
            >
              <Link href="/start-journey">
                {tc('flowIn')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <p className="text-sm text-foreground/60">
              {tc('recommended')}
            </p>
          </RevealLine>

          <RevealLine
            delay={22.6}
            started={showContent}
            className="font-[family-name:var(--font-geist-sans)]"
          >
            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-foreground/70 border-foreground/30 hover:bg-foreground/10 hover:text-foreground"
            >
              <Link href="/navigate">
                <Compass className="h-4 w-4 mr-2" />
                {tc('navigateNormal')}
              </Link>
            </Button>
            <p className="text-xs text-foreground/50 mt-2">
              {tc('evenThoughNot')}
            </p>
          </RevealLine>

          {/* Bottom spacer */}
          <div className="h-[30vh]" />
        </div>
      </div>
    </div>
  );
}
