"use client";

import { useEffect, useState } from "react";
import { Heart, Sparkles, Users } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";
import { Card, CardContent } from "@/components/ui/card";
import { DonationModal, DonationCard } from "@/components/donations";
import { Skeleton } from "@/components/ui/skeleton";

interface Donation {
  id: string;
  amount: number;
  currency: string;
  tokenAmount: number | null;
  tokenSymbol: string | null;
  displayName: string | null;
  message: string | null;
  isAnonymous: boolean;
  txHash: string | null;
  chainId: number | null;
  createdAt: string;
}

export default function GratitudeWallPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDonations() {
      try {
        const res = await fetch("/api/donations");
        if (res.ok) {
          const data = await res.json();
          setDonations(data);
        }
      } catch (error) {
        console.error("Failed to fetch donations:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDonations();
  }, []);

  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);
  const donorCount = new Set(donations.map((d) => d.txHash)).size;

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

      <div className="relative z-10">
        {/* Hero */}
        <section className="container max-w-4xl mx-auto px-4 pt-16 pb-12 text-center">
          <FadeIn>
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-full bg-primary/10">
                <Heart className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Gratitude Wall
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Celebrating the generous souls who keep this portal free for everyone
            </p>
          </FadeIn>
        </section>

        {/* Stats */}
        {donations.length > 0 && (
          <section className="container max-w-3xl mx-auto px-4 pb-8">
            <FadeIn delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="py-6 text-center">
                    <div className="text-3xl font-bold text-primary">
                      ${totalDonated.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Donated</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="py-6 text-center">
                    <div className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
                      <Users className="h-6 w-6" />
                      {donorCount}
                    </div>
                    <div className="text-sm text-muted-foreground">Generous Supporters</div>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>
          </section>
        )}

        {/* Donation CTA */}
        <section className="container max-w-3xl mx-auto px-4 pb-12">
          <FadeIn delay={0.2}>
            <div id="donate">
              <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <CardContent className="relative py-10 md:py-12 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-primary/10">
                      <Sparkles className="h-10 w-10 text-primary" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-semibold mb-3">Keep the Love Free</h2>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Your donation helps us keep this healing portal free for everyone
                    who needs it. Every contribution, no matter the size, makes a difference.
                  </p>
                  <DonationModal
                    onSuccess={(txHash, amount, displayName) => {
                      // Add new donation to the list (amount is now in USD)
                      setDonations((prev) => [
                        {
                          id: txHash,
                          amount: parseFloat(amount),
                          currency: "USD",
                          tokenAmount: null,
                          tokenSymbol: null,
                          displayName: displayName || null,
                          message: null,
                          isAnonymous: !displayName,
                          txHash,
                          chainId: 1,
                          createdAt: new Date().toISOString(),
                        },
                        ...prev,
                      ]);
                    }}
                  />
                  <p className="text-xs text-muted-foreground mt-6">
                    We accept ETH, BTC, USDC, USDT, and DAI on Ethereum, Polygon, and Base
                  </p>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        </section>

        {/* Supporters Section */}
        <section className="container max-w-4xl mx-auto px-4 pb-16">
          <FadeIn delay={0.3}>
            <h3 className="text-xl font-semibold text-center mb-8">Our Supporters</h3>

            {isLoading ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="bg-card/50 border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-48" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : donations.length > 0 ? (
              <StaggerChildren className="grid gap-4 sm:grid-cols-2">
                {donations.map((donation) => (
                  <StaggerItem key={donation.id}>
                    <DonationCard donation={donation} />
                  </StaggerItem>
                ))}
              </StaggerChildren>
            ) : (
              <Card className="bg-card/50 border-border/50">
                <CardContent className="py-16 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-muted">
                      <Heart className="h-12 w-12 text-muted-foreground/30" />
                    </div>
                  </div>
                  <h4 className="text-lg font-medium mb-2">Be the First to Support</h4>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Your name could be here, helping to keep healing accessible to all
                  </p>
                </CardContent>
              </Card>
            )}
          </FadeIn>
        </section>

        {/* Footer Note */}
        <section className="container max-w-3xl mx-auto px-4 pb-16">
          <FadeIn delay={0.4}>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                All donors can choose to remain anonymous or have their name displayed here.
              </p>
            </div>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}
