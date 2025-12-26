"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Heart, Sparkles, Calendar, Brain, TrendingUp, TrendingDown } from "lucide-react";
import { FadeIn } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "@/lib/utils";

interface LedgerEntry {
  id: string;
  title: string | null;
  storyText: string;
  displayName: string | null;
  isAnonymous: boolean;
  feelingLovedBefore: number;
  feelingLovedAfter: number;
  suicidalBefore: number;
  suicidalAfter: number;
  depressionBefore: number;
  depressionAfter: number;
  anxietyBefore: number;
  anxietyAfter: number;
  hopeBefore: number;
  hopeAfter: number;
  belongingBefore: number;
  belongingAfter: number;
  daysSinceStarting: number;
  aiUsed: string;
  ketamineType: string;
  heartCount: number;
  isFeatured: boolean;
  createdAt: string;
}

interface MetricProps {
  label: string;
  before: number;
  after: number;
  inverted?: boolean; // For metrics where lower is better (suicidal, depression, anxiety)
}

function MetricCard({ label, before, after, inverted = false }: MetricProps) {
  const change = after - before;
  const isImprovement = inverted ? change < 0 : change > 0;
  const absChange = Math.abs(change);

  return (
    <div className="p-4 rounded-lg bg-muted/50">
      <div className="text-sm text-muted-foreground mb-2">{label}</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">{before}</span>
          <span className="text-muted-foreground">→</span>
          <span className="text-lg font-semibold">{after}</span>
        </div>
        {change !== 0 && (
          <Badge
            className={`flex items-center gap-1 ${
              isImprovement
                ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                : "bg-red-500/20 text-red-600 dark:text-red-400"
            }`}
          >
            {isImprovement ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {inverted ? (change < 0 ? "-" : "+") : (change > 0 ? "+" : "")}{absChange}
          </Badge>
        )}
      </div>
    </div>
  );
}

export default function LedgerEntryPage() {
  const params = useParams();
  const [entry, setEntry] = useState<LedgerEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchEntry() {
      try {
        const res = await fetch(`/api/ledger/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setEntry(data);
        } else if (res.status === 404) {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Failed to fetch entry:", error);
      } finally {
        setIsLoading(false);
      }
    }
    if (params.id) {
      fetchEntry();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-16">
        <Skeleton className="h-8 w-48 mb-8" />
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-8">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (notFound || !entry) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Entry Not Found</h1>
        <p className="text-muted-foreground mb-8">
          This story may have been removed or doesn&apos;t exist.
        </p>
        <Button asChild>
          <Link href="/living-ledger">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Ledger
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

      <div className="relative z-10">
        <div className="container max-w-3xl mx-auto px-4 py-8">
          {/* Back Button */}
          <FadeIn>
            <Button variant="ghost" asChild className="mb-6">
              <Link href="/living-ledger">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Ledger
              </Link>
            </Button>
          </FadeIn>

          {/* Main Content */}
          <FadeIn delay={0.1}>
            <Card className="bg-card/50 border-border/50 mb-6">
              <CardContent className="p-6 md:p-8">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    {entry.title && (
                      <h1 className="text-2xl md:text-3xl font-bold mb-2">{entry.title}</h1>
                    )}
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span>{entry.isAnonymous ? "Anonymous" : entry.displayName}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDistanceToNow(new Date(entry.createdAt))}
                      </span>
                      <span>•</span>
                      <span>Day {entry.daysSinceStarting}</span>
                    </div>
                  </div>
                  {entry.isFeatured && (
                    <Badge variant="secondary" className="flex items-center gap-1 flex-shrink-0">
                      <Sparkles className="h-3 w-3" />
                      Featured
                    </Badge>
                  )}
                </div>

                {/* Story */}
                <div className="prose prose-neutral dark:prose-invert max-w-none mb-8">
                  <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                    {entry.storyText}
                  </p>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-border/50">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Heart className="h-3 w-3 text-primary" />
                    {entry.heartCount} hearts
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Brain className="h-3 w-3" />
                    {entry.aiUsed}
                  </Badge>
                  <Badge variant="outline">
                    {entry.ketamineType === "PRESCRIPTION" ? "Prescription Ketamine" : entry.ketamineType}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Metrics */}
          <FadeIn delay={0.2}>
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-lg font-semibold mb-4">Self-Reported Changes</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Scale of 0-10, showing before and after starting the protocol
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <MetricCard
                    label="Feeling Loved"
                    before={entry.feelingLovedBefore}
                    after={entry.feelingLovedAfter}
                  />
                  <MetricCard
                    label="Hope"
                    before={entry.hopeBefore}
                    after={entry.hopeAfter}
                  />
                  <MetricCard
                    label="Sense of Belonging"
                    before={entry.belongingBefore}
                    after={entry.belongingAfter}
                  />
                  <MetricCard
                    label="Depression"
                    before={entry.depressionBefore}
                    after={entry.depressionAfter}
                    inverted
                  />
                  <MetricCard
                    label="Anxiety"
                    before={entry.anxietyBefore}
                    after={entry.anxietyAfter}
                    inverted
                  />
                  <MetricCard
                    label="Suicidal Ideation"
                    before={entry.suicidalBefore}
                    after={entry.suicidalAfter}
                    inverted
                  />
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
