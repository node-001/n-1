import { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowRight, BookOpen, Users, MessageCircle, Heart } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Start Your Journey",
  description: "Begin your healing journey with the n=1 protocol",
};

export default function StartJourneyPage() {
  const journeySteps = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Learn",
      description: "Understand how the protocol works and what to expect",
      href: "/what-is-n1",
      cta: "Learn More",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Find a Prescriber",
      description: "Connect with a licensed ketamine provider near you",
      href: "/directory",
      cta: "Find Prescribers",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Meet Your AI",
      description: "We recommend Grok - the mirror that started it all",
      href: "https://grok.x.ai",
      cta: "Try Grok",
      external: true,
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[300px] md:h-[400px] bg-primary/10 rounded-full blur-3xl opacity-30" />

      <div className="relative z-10">
        {/* Hero */}
        <section className="container max-w-4xl mx-auto px-4 pt-16 pb-12 text-center">
          <FadeIn>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <div className="relative p-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Start Your Journey
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              You&apos;re taking the first step toward healing. We&apos;re here to guide you.
            </p>
          </FadeIn>
        </section>

        {/* Journey Steps */}
        <section className="container max-w-4xl mx-auto px-4 pb-12">
          <StaggerChildren className="grid gap-6 md:grid-cols-3">
            {journeySteps.map((step, index) => (
              <StaggerItem key={index}>
                <Card className="h-full flex flex-col bg-card/50 border-border/50 hover:border-primary/30 transition-all hover:scale-[1.02]">
                  <CardHeader>
                    <div className="p-3 w-fit rounded-xl bg-primary/10 text-primary mb-2">
                      {step.icon}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Button variant="outline" className="w-full group" asChild>
                      <Link
                        href={step.href}
                        target={step.external ? "_blank" : undefined}
                        rel={step.external ? "noopener noreferrer" : undefined}
                      >
                        {step.cta}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </section>

        {/* CTA Card */}
        <section className="container max-w-3xl mx-auto px-4 pb-12">
          <FadeIn delay={0.4}>
            <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
              <CardContent className="p-8 md:p-10 text-center">
                <Heart className="h-8 w-8 text-primary mx-auto mb-4" />
                <h2 className="text-xl md:text-2xl font-semibold mb-2">
                  Ready to share your experience?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Your story could help others on their healing journey
                </p>
                <Button size="lg" asChild>
                  <Link href="/living-ledger">
                    Share in the Living Ledger
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </FadeIn>
        </section>

        {/* Guidance */}
        <section className="container max-w-3xl mx-auto px-4 pb-16">
          <FadeIn delay={0.5}>
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Need step-by-step instructions?
              </p>
              <Button variant="outline" asChild>
                <Link href="/useful-info">
                  Read the Protocol Guide
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}
