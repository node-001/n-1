"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Heart, Compass, Send, CheckCircle, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollReveal } from "@/components/animations";
import { DonationModal } from "@/components/donations/donation-modal";

export default function DonatePage() {
  const t = useTranslations('donate');
  const tc = useTranslations('common');

  // Team application form state
  const [teamName, setTeamName] = useState("");
  const [teamEmail, setTeamEmail] = useState("");
  const [teamMessage, setTeamMessage] = useState("");
  const [teamSubmitting, setTeamSubmitting] = useState(false);
  const [teamSubmitted, setTeamSubmitted] = useState(false);
  const [teamError, setTeamError] = useState<string | null>(null);

  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTeamError(null);
    setTeamSubmitting(true);

    try {
      const res = await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: teamName,
          email: teamEmail,
          message: teamMessage,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit");
      }

      setTeamSubmitted(true);
    } catch (err) {
      setTeamError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setTeamSubmitting(false);
    }
  };

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

          {/* Donation Options */}
          <ScrollReveal>
            <div className="py-8 space-y-6 font-[family-name:var(--font-geist-sans)]">
              {/* Credit/Debit Card Option */}
              <div className="space-y-3">
                <p className="text-lg font-medium">{t('donateCard')}</p>
                <Button
                  size="lg"
                  className="gap-2 px-8 text-base bg-foreground text-background hover:bg-foreground/90"
                  asChild
                >
                  <a
                    href="https://buy.stripe.com/cNi14fh1757l8OU9t9bo400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CreditCard className="h-5 w-5" />
                    {t('donateCardButton')}
                  </a>
                </Button>
                <p className="text-sm text-foreground/60">{t('donateCardNote')}</p>
              </div>

              {/* Crypto Option */}
              <div className="space-y-3 pt-4 border-t border-foreground/10">
                <p className="text-lg font-medium">{t('donateCrypto')}</p>
                <DonationModal
                  trigger={
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-2 px-8 text-base"
                    >
                      <Heart className="h-5 w-5" />
                      {t('donateCryptoButton')}
                    </Button>
                  }
                />
                <p className="text-sm text-foreground/60">{t('donateCryptoNote')}</p>
              </div>
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

          {/* Team Application Form */}
          <ScrollReveal>
            {teamSubmitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-6 text-center">
                <CheckCircle className="h-8 w-8 mx-auto mb-3 text-emerald-500" />
                <p className="font-semibold">{t('teamSubmitted')}</p>
                <p className="text-foreground/70 text-base mt-1">{t('teamSubmittedMessage')}</p>
              </div>
            ) : (
              <form onSubmit={handleTeamSubmit} className="space-y-4 font-[family-name:var(--font-geist-sans)] text-base">
                <div className="space-y-2">
                  <Label htmlFor="teamName">{t('teamName')}</Label>
                  <Input
                    id="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder={t('teamNamePlaceholder')}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teamEmail">{t('teamEmail')}</Label>
                  <Input
                    id="teamEmail"
                    type="email"
                    value={teamEmail}
                    onChange={(e) => setTeamEmail(e.target.value)}
                    placeholder={t('teamEmailPlaceholder')}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teamMessage">{t('teamMessage')}</Label>
                  <Textarea
                    id="teamMessage"
                    value={teamMessage}
                    onChange={(e) => setTeamMessage(e.target.value)}
                    placeholder={t('teamMessagePlaceholder')}
                    rows={4}
                    required
                  />
                </div>
                {teamError && (
                  <p className="text-destructive text-sm">{teamError}</p>
                )}
                <Button type="submit" disabled={teamSubmitting} className="gap-2">
                  <Send className="h-4 w-4" />
                  {teamSubmitting ? t('teamSending') : t('teamSend')}
                </Button>
              </form>
            )}
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
