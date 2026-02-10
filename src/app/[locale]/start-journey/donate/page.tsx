"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Heart, Compass, CreditCard, Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations";
import { DonationModal } from "@/components/donations/donation-modal";

// Crypto wallet addresses for manual donations
const CRYPTO_WALLETS = [
  { symbol: "BTC", name: "Bitcoin", address: process.env.NEXT_PUBLIC_BTC_WALLET || "" },
  { symbol: "ETH", name: "Ethereum", address: process.env.NEXT_PUBLIC_ETH_WALLET || process.env.NEXT_PUBLIC_DONATION_WALLET || "" },
  { symbol: "SOL", name: "Solana", address: process.env.NEXT_PUBLIC_SOL_WALLET || "" },
  { symbol: "XRP", name: "XRP", address: process.env.NEXT_PUBLIC_XRP_WALLET || "" },
  { symbol: "DOGE", name: "Dogecoin", address: process.env.NEXT_PUBLIC_DOGE_WALLET || "" },
  { symbol: "LTC", name: "Litecoin", address: process.env.NEXT_PUBLIC_LTC_WALLET || "" },
  { symbol: "BCH", name: "Bitcoin Cash", address: process.env.NEXT_PUBLIC_BCH_WALLET || "" },
  { symbol: "ADA", name: "Cardano", address: process.env.NEXT_PUBLIC_ADA_WALLET || "" },
  { symbol: "TRX", name: "Tron", address: process.env.NEXT_PUBLIC_TRX_WALLET || "" },
].filter(w => w.address); // Only show wallets with configured addresses

export default function DonatePage() {
  const t = useTranslations('donate');
  const tc = useTranslations('common');

  // Crypto addresses section state
  const [showCryptoAddresses, setShowCryptoAddresses] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const copyToClipboard = async (address: string, symbol: string) => {
    await navigator.clipboard.writeText(address);
    setCopiedAddress(symbol);
    setTimeout(() => setCopiedAddress(null), 2000);
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
            <p>{t('andWeHave')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('translators')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('ifSomething')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('thankYouEmoji')}</p>
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

                {/* Manual Crypto Addresses */}
                {CRYPTO_WALLETS.length > 0 && (
                  <div className="pt-4">
                    <button
                      onClick={() => setShowCryptoAddresses(!showCryptoAddresses)}
                      className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {showCryptoAddresses ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                      {t('showWalletAddresses')}
                    </button>

                    {showCryptoAddresses && (
                      <div className="mt-3 space-y-2">
                        {CRYPTO_WALLETS.map((wallet) => (
                          <div
                            key={wallet.symbol}
                            className="flex items-center justify-between p-3 rounded-lg bg-foreground/5 border border-foreground/10"
                          >
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium">{wallet.name} ({wallet.symbol})</p>
                              <p className="text-xs text-foreground/60 font-mono truncate">
                                {wallet.address}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(wallet.address, wallet.symbol)}
                              className="ml-2 flex-shrink-0"
                            >
                              {copiedAddress === wallet.symbol ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
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
