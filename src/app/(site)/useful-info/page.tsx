import { Metadata } from "next";
import { BookOpen, CheckCircle, AlertTriangle } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Useful Info",
  description: "Practical information on how to do the n=1 protocol safely and effectively",
};

export default function UsefulInfoPage() {
  const steps = [
    {
      title: "Get a Prescription",
      description: "Find a licensed prescriber in our directory who can evaluate you for ketamine therapy.",
    },
    {
      title: "Set Up Your Space",
      description: "Create a safe, comfortable environment. Remove distractions. Have water nearby.",
    },
    {
      title: "Connect with Your AI",
      description: "We recommend Grok, but any AI you feel comfortable with can work. Set up voice or chat.",
    },
    {
      title: "Take Your Medicine",
      description: "Follow your prescriber's dosing instructions. Start with a low dose.",
    },
    {
      title: "Open Up",
      description: "Let the AI guide you. Share what comes up. Be honest. The AI won't judge.",
    },
    {
      title: "Integrate",
      description: "After the session, rest. Journal if you'd like. Share your experience in the ledger.",
    },
  ];

  const reminders = [
    "Only use prescription ketamine from a licensed provider",
    "Never drive or operate machinery during or after sessions",
    "Have someone who can check on you if needed",
    "Start low and go slow with dosing",
    "Stay hydrated before and after sessions",
  ];

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
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              How to Do the Protocol
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A step-by-step guide to your healing journey
            </p>
          </FadeIn>
        </section>

        {/* Steps */}
        <section className="container max-w-3xl mx-auto px-4 pb-12">
          <StaggerChildren className="space-y-4">
            {steps.map((step, index) => (
              <StaggerItem key={index}>
                <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-4 text-lg">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">
                        {index + 1}
                      </div>
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground pl-[4.5rem]">
                    {step.description}
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </section>

        {/* Divider */}
        <div className="container max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-4 py-4">
            <Separator className="flex-1" />
            <span className="text-primary font-semibold">Safety First</span>
            <Separator className="flex-1" />
          </div>
        </div>

        {/* Important Reminders */}
        <section className="container max-w-3xl mx-auto px-4 py-12">
          <FadeIn delay={0.5}>
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Important Reminders</h3>
                    <ul className="space-y-3">
                      {reminders.map((reminder, index) => (
                        <li key={index} className="flex items-start gap-3 text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {reminder}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </section>

        {/* Warning */}
        <section className="container max-w-3xl mx-auto px-4 pb-16">
          <FadeIn delay={0.6}>
            <Card className="bg-yellow-500/5 border-yellow-500/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-yellow-500/10">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="text-sm">
                    <h4 className="font-medium mb-2">Medical Disclaimer</h4>
                    <p className="text-muted-foreground">
                      This information is not medical advice. Always consult with a licensed
                      healthcare provider before beginning any treatment. Ketamine therapy
                      should only be done under proper medical supervision.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}
