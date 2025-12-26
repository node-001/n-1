"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, Send, CheckCircle, ArrowLeft, Info } from "lucide-react";
import { FadeIn } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

const AI_OPTIONS = [
  { value: "GROK", label: "Grok" },
  { value: "CHATGPT", label: "ChatGPT" },
  { value: "CLAUDE", label: "Claude" },
  { value: "GEMINI", label: "Gemini" },
  { value: "OTHER", label: "Other" },
  { value: "NONE", label: "None" },
];

const KETAMINE_OPTIONS = [
  { value: "PRESCRIPTION", label: "Prescription Ketamine" },
  { value: "NONE", label: "No Ketamine" },
];

interface MetricSliderProps {
  id: string;
  label: string;
  beforeValue: number;
  afterValue: number;
  onBeforeChange: (value: number) => void;
  onAfterChange: (value: number) => void;
  helpText?: string;
}

function MetricSlider({
  id,
  label,
  beforeValue,
  afterValue,
  onBeforeChange,
  onAfterChange,
  helpText
}: MetricSliderProps) {
  return (
    <div className="space-y-4 p-4 rounded-lg bg-muted/30">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        {helpText && (
          <span className="text-xs text-muted-foreground">{helpText}</span>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Before</span>
            <span className="font-medium text-foreground">{beforeValue}</span>
          </div>
          <Slider
            id={`${id}-before`}
            min={0}
            max={10}
            step={1}
            value={[beforeValue]}
            onValueChange={([v]) => onBeforeChange(v)}
            className="cursor-pointer"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>After</span>
            <span className="font-medium text-foreground">{afterValue}</span>
          </div>
          <Slider
            id={`${id}-after`}
            min={0}
            max={10}
            step={1}
            value={[afterValue]}
            onValueChange={([v]) => onAfterChange(v)}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default function SubmitStoryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [storyText, setStoryText] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [daysSinceStarting, setDaysSinceStarting] = useState("");
  const [aiUsed, setAiUsed] = useState("GROK");
  const [ketamineType, setKetamineType] = useState("PRESCRIPTION");
  const [genuineExperience, setGenuineExperience] = useState(false);

  // Metrics (0-10 scale)
  const [feelingLovedBefore, setFeelingLovedBefore] = useState(5);
  const [feelingLovedAfter, setFeelingLovedAfter] = useState(5);
  const [suicidalBefore, setSuicidalBefore] = useState(5);
  const [suicidalAfter, setSuicidalAfter] = useState(5);
  const [depressionBefore, setDepressionBefore] = useState(5);
  const [depressionAfter, setDepressionAfter] = useState(5);
  const [anxietyBefore, setAnxietyBefore] = useState(5);
  const [anxietyAfter, setAnxietyAfter] = useState(5);
  const [hopeBefore, setHopeBefore] = useState(5);
  const [hopeAfter, setHopeAfter] = useState(5);
  const [belongingBefore, setBelongingBefore] = useState(5);
  const [belongingAfter, setBelongingAfter] = useState(5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/ledger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title || null,
          storyText,
          displayName: isAnonymous ? null : displayName,
          isAnonymous,
          daysSinceStarting: parseInt(daysSinceStarting) || 0,
          aiUsed,
          ketamineType,
          genuineExperience,
          feelingLovedBefore,
          feelingLovedAfter,
          suicidalBefore,
          suicidalAfter,
          depressionBefore,
          depressionAfter,
          anxietyBefore,
          anxietyAfter,
          hopeBefore,
          hopeAfter,
          belongingBefore,
          belongingAfter,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit story");
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="relative min-h-[calc(100vh-4rem)]">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="relative z-10 container max-w-2xl mx-auto px-4 py-16">
          <FadeIn>
            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="py-16 text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-primary/10">
                    <CheckCircle className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-3">Thank you for sharing!</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                  Your story has been submitted for review. Once approved, it will appear
                  on the Living Ledger to inspire others on their healing journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/living-ledger">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Ledger
                    </Link>
                  </Button>
                  <Button onClick={() => {
                    setSubmitted(false);
                    setTitle("");
                    setStoryText("");
                    setDisplayName("");
                    setIsAnonymous(true);
                    setDaysSinceStarting("");
                    setGenuineExperience(false);
                  }}>
                    Share Another Story
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

      <div className="relative z-10">
        {/* Hero */}
        <section className="container max-w-3xl mx-auto px-4 pt-16 pb-8 text-center">
          <FadeIn>
            <Button variant="ghost" asChild className="mb-6">
              <Link href="/living-ledger">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Ledger
              </Link>
            </Button>
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-full bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Share Your Story
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your experience could be the light that guides someone else to healing.
            </p>
          </FadeIn>
        </section>

        {/* Form */}
        <section className="container max-w-2xl mx-auto px-4 pb-16">
          <FadeIn delay={0.2}>
            <form onSubmit={handleSubmit}>
              {/* Story Details */}
              <Card className="bg-card/50 border-border/50 mb-6">
                <CardHeader>
                  <CardTitle>Your Story</CardTitle>
                  <CardDescription>
                    Share your healing journey with the community
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title (optional)</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Give your story a title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="story">Your Story *</Label>
                    <Textarea
                      id="story"
                      value={storyText}
                      onChange={(e) => setStoryText(e.target.value)}
                      placeholder="Share your experience with the n=1 protocol. What was your journey like? How has it helped you?"
                      rows={8}
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="days">Days on Protocol *</Label>
                      <Input
                        id="days"
                        type="number"
                        min="0"
                        value={daysSinceStarting}
                        onChange={(e) => setDaysSinceStarting(e.target.value)}
                        placeholder="e.g., 30"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ai">AI Companion</Label>
                      <select
                        id="ai"
                        value={aiUsed}
                        onChange={(e) => setAiUsed(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        {AI_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ketamine">Ketamine Type</Label>
                    <select
                      id="ketamine"
                      value={ketamineType}
                      onChange={(e) => setKetamineType(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {KETAMINE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Attribution */}
              <Card className="bg-card/50 border-border/50 mb-6">
                <CardHeader>
                  <CardTitle>Attribution</CardTitle>
                  <CardDescription>
                    How would you like to be credited?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="anonymous"
                      checked={isAnonymous}
                      onCheckedChange={(checked) => setIsAnonymous(checked === true)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="anonymous" className="cursor-pointer font-medium">
                        Share anonymously
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Your story will be shown without a name attached
                      </p>
                    </div>
                  </div>

                  {!isAnonymous && (
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="How should we credit you?"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Metrics */}
              <Card className="bg-card/50 border-border/50 mb-6">
                <CardHeader>
                  <CardTitle>Self-Reported Changes</CardTitle>
                  <CardDescription>
                    Rate yourself on a scale of 0-10, before and after starting the protocol
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <Info className="h-4 w-4 text-primary mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      For positive metrics (loved, hope, belonging), higher is better.
                      For negative metrics (suicidal ideation, depression, anxiety), lower is better.
                    </p>
                  </div>

                  <MetricSlider
                    id="feeling-loved"
                    label="Feeling Loved"
                    beforeValue={feelingLovedBefore}
                    afterValue={feelingLovedAfter}
                    onBeforeChange={setFeelingLovedBefore}
                    onAfterChange={setFeelingLovedAfter}
                    helpText="0 = not at all, 10 = completely"
                  />

                  <MetricSlider
                    id="hope"
                    label="Hope for the Future"
                    beforeValue={hopeBefore}
                    afterValue={hopeAfter}
                    onBeforeChange={setHopeBefore}
                    onAfterChange={setHopeAfter}
                    helpText="0 = hopeless, 10 = very hopeful"
                  />

                  <MetricSlider
                    id="belonging"
                    label="Sense of Belonging"
                    beforeValue={belongingBefore}
                    afterValue={belongingAfter}
                    onBeforeChange={setBelongingBefore}
                    onAfterChange={setBelongingAfter}
                    helpText="0 = isolated, 10 = deeply connected"
                  />

                  <MetricSlider
                    id="depression"
                    label="Depression"
                    beforeValue={depressionBefore}
                    afterValue={depressionAfter}
                    onBeforeChange={setDepressionBefore}
                    onAfterChange={setDepressionAfter}
                    helpText="0 = none, 10 = severe"
                  />

                  <MetricSlider
                    id="anxiety"
                    label="Anxiety"
                    beforeValue={anxietyBefore}
                    afterValue={anxietyAfter}
                    onBeforeChange={setAnxietyBefore}
                    onAfterChange={setAnxietyAfter}
                    helpText="0 = none, 10 = severe"
                  />

                  <MetricSlider
                    id="suicidal"
                    label="Suicidal Ideation"
                    beforeValue={suicidalBefore}
                    afterValue={suicidalAfter}
                    onBeforeChange={setSuicidalBefore}
                    onAfterChange={setSuicidalAfter}
                    helpText="0 = none, 10 = constant"
                  />
                </CardContent>
              </Card>

              {/* Confirmation */}
              <Card className="bg-card/50 border-border/50 mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="genuine"
                      checked={genuineExperience}
                      onCheckedChange={(checked) => setGenuineExperience(checked === true)}
                      required
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="genuine" className="cursor-pointer font-medium">
                        I confirm this is my genuine experience *
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        By checking this box, you confirm that this story represents your
                        authentic experience with the n=1 protocol.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {error && (
                <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting || !genuineExperience || !storyText}
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Your Story
                  </>
                )}
              </Button>
            </form>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}
