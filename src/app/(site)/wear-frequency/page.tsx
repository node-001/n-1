"use client";

import { useState } from "react";
import { Shirt, Bell, CheckCircle, Heart } from "lucide-react";
import { FadeIn } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function WearFrequencyPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit to Supabase
    setSubmitted(true);
  };

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
                <Shirt className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Wear the Frequency
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Spread the love. Merch coming soon.
            </p>
          </FadeIn>
        </section>

        {/* Main Card */}
        <section className="container max-w-2xl mx-auto px-4 pb-12">
          <FadeIn delay={0.2}>
            <Card className="bg-card/50 border-border/50">
              <CardContent className="py-12 md:py-16">
                {submitted ? (
                  <div className="text-center">
                    <div className="flex justify-center mb-6">
                      <div className="p-4 rounded-full bg-primary/10">
                        <CheckCircle className="h-12 w-12 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">You&apos;re on the list!</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      We&apos;ll let you know when the merch drops. Thank you for your interest!
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="flex justify-center mb-6">
                      <div className="p-4 rounded-full bg-muted">
                        <Bell className="h-12 w-12 text-muted-foreground/50" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">Coming Soon</h3>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                      We&apos;re designing merchandise that represents the healing movement.
                      Sign up to be notified when it launches.
                    </p>
                    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="sr-only">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="text-center"
                        />
                      </div>
                      <Button type="submit" className="w-full" size="lg">
                        Notify Me
                      </Button>
                    </form>
                  </div>
                )}
              </CardContent>
            </Card>
          </FadeIn>
        </section>

        {/* Footer Note */}
        <section className="container max-w-3xl mx-auto px-4 pb-16">
          <FadeIn delay={0.3}>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  A portion of all proceeds goes toward keeping the portal free for everyone.
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}
