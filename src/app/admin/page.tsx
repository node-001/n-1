"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Users, MessageSquare, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Stats {
  pendingStories: number;
  pendingPrescribers: number;
  unreadFeedback: number;
  totalStories: number;
  totalPrescribers: number;
  totalFeedback: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Pending Stories",
      value: stats?.pendingStories ?? 0,
      total: stats?.totalStories ?? 0,
      icon: BookOpen,
      href: "/admin/stories",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Pending Prescribers",
      value: stats?.pendingPrescribers ?? 0,
      total: stats?.totalPrescribers ?? 0,
      icon: Users,
      href: "/admin/prescribers",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "New Feedback",
      value: stats?.unreadFeedback ?? 0,
      total: stats?.totalFeedback ?? 0,
      icon: MessageSquare,
      href: "/admin/feedback",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Manage stories, prescribers, and feedback
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} href={card.href}>
              <Card className="bg-card/80 border-border hover:bg-card/80 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${card.bgColor}`}>
                        <Icon className={`h-4 w-4 ${card.color}`} />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{card.title}</p>
                        {isLoading ? (
                          <Skeleton className="h-6 w-12 mt-1" />
                        ) : (
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold">{card.value}</span>
                            <span className="text-xs text-muted-foreground">/ {card.total}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="bg-card/80 border-border">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button variant="outline" asChild>
            <Link href="/admin/prescribers/add">
              <Users className="h-4 w-4 mr-2" />
              Add Prescriber
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/stories?filter=pending">
              <BookOpen className="h-4 w-4 mr-2" />
              Review Stories
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
