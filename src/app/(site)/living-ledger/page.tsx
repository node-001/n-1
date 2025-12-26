"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Plus, ArrowUpRight, Heart, Sparkles, Calendar, Brain } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  hopeBefore: number;
  hopeAfter: number;
  daysSinceStarting: number;
  aiUsed: string;
  ketamineType: string;
  heartCount: number;
  isFeatured: boolean;
  createdAt: string;
}

export default function LivingLedgerPage() {
  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    async function fetchEntries() {
      try {
        const res = await fetch(`/api/ledger?sort=${sortBy}`);
        if (res.ok) {
          const data = await res.json();
          setEntries(data);
        }
      } catch (error) {
        console.error("Failed to fetch entries:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEntries();
  }, [sortBy]);

  const getImprovementScore = (entry: LedgerEntry) => {
    const improvements = [
      entry.feelingLovedAfter - entry.feelingLovedBefore,
      entry.suicidalBefore - entry.suicidalAfter,
      entry.depressionBefore - entry.depressionAfter,
      entry.hopeAfter - entry.hopeBefore,
    ];
    return improvements.reduce((a, b) => a + b, 0) / improvements.length;
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

      <div className="relative z-10">
        {/* Hero */}
        <section className="container max-w-6xl mx-auto px-4 pt-16 pb-8 text-center">
          <FadeIn>
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-full bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Living Ledger
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories of healing from real people. Your story could inspire someone else.
            </p>
          </FadeIn>
        </section>

        {/* Controls */}
        <section className="container max-w-6xl mx-auto px-4 pb-8">
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50">
              <Tabs value={sortBy} onValueChange={setSortBy} className="w-full sm:w-auto">
                <TabsList className="grid w-full grid-cols-2 sm:w-auto">
                  <TabsTrigger value="newest">Newest</TabsTrigger>
                  <TabsTrigger value="loved">Most Loved</TabsTrigger>
                </TabsList>
              </Tabs>

              <Button size="sm" asChild>
                <Link href="/living-ledger/submit">
                  <Plus className="h-4 w-4 mr-2" />
                  Share Story
                </Link>
              </Button>
            </div>
          </FadeIn>
        </section>

        {/* Entries */}
        <section className="container max-w-4xl mx-auto px-4 pb-12">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="bg-card/50 border-border/50">
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-48 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : entries.length > 0 ? (
            <StaggerChildren className="space-y-4">
              {entries.map((entry) => (
                <StaggerItem key={entry.id}>
                  <Link href={`/living-ledger/${entry.id}`}>
                    <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-colors cursor-pointer">
                      <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          {entry.title && (
                            <h3 className="text-lg font-semibold mb-1">{entry.title}</h3>
                          )}
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{entry.isAnonymous ? "Anonymous" : entry.displayName}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDistanceToNow(new Date(entry.createdAt))}
                            </span>
                          </div>
                        </div>
                        {entry.isFeatured && (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            Featured
                          </Badge>
                        )}
                      </div>

                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {entry.storyText}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Heart className="h-3 w-3 text-primary" />
                          {entry.heartCount}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Brain className="h-3 w-3" />
                          {entry.aiUsed}
                        </Badge>
                        <span className="text-muted-foreground">
                          Day {entry.daysSinceStarting}
                        </span>
                        {getImprovementScore(entry) > 3 && (
                          <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                            Significant Improvement
                          </Badge>
                        )}
                      </div>
                      </CardContent>
                    </Card>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerChildren>
          ) : (
            <FadeIn delay={0.3}>
              <Card className="bg-card/50 border-border/50">
                <CardContent className="py-20 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-primary/10">
                      <Heart className="h-12 w-12 text-primary/50" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">Be the First to Share</h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    The ledger is waiting for its first stories. Your experience could be
                    the light that guides someone else to healing.
                  </p>
                  <Button size="lg" asChild>
                    <Link href="/living-ledger/submit">
                      <Plus className="h-4 w-4 mr-2" />
                      Share Your Story
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>
          )}
        </section>

        {/* Research Data Link */}
        <section className="container max-w-4xl mx-auto px-4 pb-16">
          <FadeIn delay={0.4}>
            <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
              <CardContent className="p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold mb-1">For Researchers</h3>
                  <p className="text-sm text-muted-foreground">
                    Access aggregate data and statistics from the ledger
                  </p>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/living-ledger/data">
                    <ArrowUpRight className="h-4 w-4 mr-2" />
                    View Research Data
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}
