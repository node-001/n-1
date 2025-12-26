"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, MapPin, Video, Search, CheckCircle, ExternalLink, Building } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Prescriber {
  id: string;
  name: string;
  credentials: string;
  specialty: string | null;
  practiceName: string | null;
  city: string;
  state: string;
  country: string;
  offersTelemedicine: boolean;
  acceptsInsurance: boolean;
  insuranceAccepted: string[];
  isVerified: boolean;
  website: string | null;
}

export default function DirectoryPage() {
  const [prescribers, setPrescribers] = useState<Prescriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTelemedicine, setFilterTelemedicine] = useState(false);
  const [filterInsurance, setFilterInsurance] = useState(false);

  useEffect(() => {
    async function fetchPrescribers() {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (filterTelemedicine) params.set("telemedicine", "true");
        if (filterInsurance) params.set("insurance", "true");
        const res = await fetch(`/api/prescribers?${params}`);
        if (res.ok) {
          const data = await res.json();
          setPrescribers(data);
        }
      } catch (error) {
        console.error("Failed to fetch prescribers:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPrescribers();
  }, [filterTelemedicine, filterInsurance]);

  const filteredPrescribers = prescribers.filter((p) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.city.toLowerCase().includes(query) ||
      p.state.toLowerCase().includes(query) ||
      p.specialty?.toLowerCase().includes(query)
    );
  });

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
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Find a Prescriber
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with licensed ketamine providers in your area
            </p>
          </FadeIn>
        </section>

        {/* Search Section */}
        <section className="container max-w-3xl mx-auto px-4 pb-8">
          <FadeIn delay={0.2}>
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, city, or state..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge
                    variant="outline"
                    className={`cursor-pointer transition-colors ${filterTelemedicine ? "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30" : "hover:bg-accent"}`}
                    onClick={() => setFilterTelemedicine(!filterTelemedicine)}
                  >
                    <Video className="h-3 w-3 mr-1.5" />
                    Telemedicine
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`cursor-pointer transition-colors ${filterInsurance ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" : "hover:bg-accent"}`}
                    onClick={() => setFilterInsurance(!filterInsurance)}
                  >
                    Accepts Insurance
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </section>

        {/* Results */}
        <section className="container max-w-3xl mx-auto px-4 pb-12">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="bg-card/50 border-border/50">
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-48 mb-2" />
                    <Skeleton className="h-4 w-32 mb-4" />
                    <Skeleton className="h-4 w-64" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredPrescribers.length > 0 ? (
            <StaggerChildren key={`${filterTelemedicine}-${filterInsurance}`} className="space-y-4">
              {filteredPrescribers.map((prescriber) => (
                <StaggerItem key={prescriber.id}>
                  <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{prescriber.name}</h3>
                            {prescriber.isVerified && (
                              <CheckCircle className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {prescriber.credentials}
                            {prescriber.specialty && ` • ${prescriber.specialty}`}
                          </p>
                        </div>
                      </div>

                      {prescriber.practiceName && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Building className="h-4 w-4" />
                          {prescriber.practiceName}
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4" />
                        {prescriber.city}, {prescriber.state}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {prescriber.offersTelemedicine && (
                          <Badge className="bg-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-500/30 flex items-center gap-1">
                            <Video className="h-3 w-3" />
                            Telemedicine
                          </Badge>
                        )}
                        {prescriber.acceptsInsurance && (
                          <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/30">
                            Accepts Insurance
                          </Badge>
                        )}
                        {prescriber.website && (
                          <a
                            href={prescriber.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-auto"
                          >
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Website
                            </Button>
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerChildren>
          ) : (
            <FadeIn delay={0.3}>
              <Card className="bg-card/50 border-border/50">
                <CardContent className="py-16 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-muted">
                      <MapPin className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">No Prescribers Found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    {searchQuery
                      ? "Try adjusting your search or filters"
                      : "We're building our directory. Check back soon."}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          )}
        </section>

      </div>
    </div>
  );
}
