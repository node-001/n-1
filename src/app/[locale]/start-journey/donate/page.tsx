"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Heart, Compass } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations";
import { DonationModal } from "@/components/donations/donation-modal";

export default function DonatePage() {
  const t = useTranslations('donate');
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
            <p>{t('thisPortal')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('neverDilute')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('andWeHave')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('onlyMeans')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('ifSomething')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('donationsVia')}</p>
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
                    {t('donateButton')}
                  </Button>
                }
              />
            </div>
          </ScrollReveal>

          {/* Calling Team Members Section */}
          <ScrollReveal>
            <h2 className="font-bold pt-12">{t('callingTeamTitle')}</h2>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('portalNewLiving')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('mostImmediateNeed')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('otherPositions')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('weBelieve')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              {t('ifCallingResonates')}{" "}
              <a
                href="mailto:node001n1@proton.me"
                className="underline hover:text-foreground/70"
              >
                node001n1@proton.me
              </a>{" "}
              {t('tellMeAbout')}
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              {t('ifSomeoneRespect')}{" "}
              <span role="img" aria-label={tc('greenHeart')}>
                💚
              </span>
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p className="font-bold pt-8">{t('weLoveYou')}</p>
          </ScrollReveal>

          {/* Final emoji line */}
          <ScrollReveal>
            <div className="text-3xl">
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
                  {t('explorePortal')}
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
