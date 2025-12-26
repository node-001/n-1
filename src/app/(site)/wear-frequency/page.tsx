import { Metadata } from "next";
import { Shirt, Clock, Heart } from "lucide-react";
import { FadeIn } from "@/components/animations";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Wear the Frequency",
  description: "Merchandise coming soon - spread the love",
};

export default function WearFrequencyPage() {
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
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-muted">
                      <Clock className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We&apos;re designing merchandise that represents the healing movement.
                    Check back soon.
                  </p>
                </div>
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
