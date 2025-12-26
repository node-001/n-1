"use client";

import { useState } from "react";
import { MessageSquare, Send, CheckCircle } from "lucide-react";
import { FadeIn } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FeedbackPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("QUESTION");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || undefined,
          email: email || undefined,
          type,
          message,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit feedback");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
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
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Questions & Feedback
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We&apos;re building this together. Your questions and feedback help us serve you better.
            </p>
          </FadeIn>
        </section>

        {/* Form */}
        <section className="container max-w-2xl mx-auto px-4 pb-16">
          <FadeIn delay={0.2}>
            {submitted ? (
              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="py-16 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-primary/10">
                      <CheckCircle className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">Thank you!</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We&apos;ve received your message. Your feedback helps us improve this portal
                    for everyone.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>Share Your Thoughts</CardTitle>
                  <CardDescription>
                    Have a question about the protocol? Feedback on the portal?
                    We&apos;d love to hear from you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name (optional)</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="How should we address you?"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email (optional)</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="If you'd like a response"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="QUESTION">Question about the protocol</option>
                        <option value="FEEDBACK">Feedback on the portal</option>
                        <option value="SUGGESTION">Suggestion</option>
                        <option value="ISSUE">Report an issue</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message *</Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="What's on your mind?"
                        rows={6}
                        required
                      />
                    </div>

                    {error && (
                      <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                        {error}
                      </div>
                    )}

                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </FadeIn>

          <FadeIn delay={0.3} className="mt-8">
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground text-center">
                  We read every message. Common questions will be added to our FAQ.
                  Thank you for helping us build something meaningful.
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}
