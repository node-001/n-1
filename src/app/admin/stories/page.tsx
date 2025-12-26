"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BookOpen, Check, X, Star, Trash2, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatDistanceToNow } from "@/lib/utils";

interface Story {
  id: string;
  title: string | null;
  storyText: string;
  displayName: string | null;
  isAnonymous: boolean;
  daysSinceStarting: number;
  aiUsed: string;
  ketamineType: string;
  moderationStatus: string;
  isFeatured: boolean;
  heartCount: number;
  createdAt: string;
  // All metrics (0-10 scale)
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
}

export default function AdminStoriesPage() {
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get("filter") || "pending";

  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState(initialFilter);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchStories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/stories?filter=${filter}`);
      if (res.ok) {
        const data = await res.json();
        setStories(data);
      }
    } catch (error) {
      console.error("Failed to fetch stories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, [filter]);

  const handleAction = async (id: string, action: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/stories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (res.ok) {
        fetchStories();
      }
    } catch (error) {
      console.error("Failed to update story:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/stories/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchStories();
      }
    } catch (error) {
      console.error("Failed to delete story:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: string, featured: boolean) => {
    if (featured) {
      return <Badge className="bg-amber-500/20 text-amber-600">Featured</Badge>;
    }
    switch (status) {
      case "PENDING":
        return <Badge variant="outline" className="border-amber-500/50 text-amber-600">Pending</Badge>;
      case "APPROVED":
        return <Badge className="bg-emerald-500/20 text-emerald-600">Approved</Badge>;
      case "REJECTED":
        return <Badge className="bg-red-500/20 text-red-600">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Stories</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Review and moderate user-submitted stories
        </p>
      </div>

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-card/80 border-border">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-48 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : stories.length === 0 ? (
        <Card className="bg-card/80 border-border">
          <CardContent className="py-12 text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-semibold mb-2">No stories found</h3>
            <p className="text-muted-foreground">
              {filter === "pending" ? "No stories waiting for review" : `No ${filter} stories`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {stories.map((story) => (
            <Dialog key={story.id}>
              <Card className="bg-card/80 border-border overflow-hidden">
                <CardContent className="px-3 py-1.5 sm:py-3">
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                    {/* Left side: Title, Meta, Badges */}
                    <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:gap-3">
                      <DialogTrigger asChild>
                        <div className="min-w-0 cursor-pointer hover:opacity-80">
                          <div className="flex items-center justify-between gap-2 sm:justify-start">
                            <h3 className="font-medium text-sm truncate">
                              {story.title || "Untitled Story"}
                            </h3>
                            <div className="shrink-0 sm:hidden">
                              {getStatusBadge(story.moderationStatus, story.isFeatured)}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {story.isAnonymous ? "Anonymous" : story.displayName} • Day {story.daysSinceStarting} • {formatDistanceToNow(new Date(story.createdAt))}
                          </p>
                        </div>
                      </DialogTrigger>

                      {/* Badge - desktop only */}
                      <div className="hidden sm:block shrink-0">
                        {getStatusBadge(story.moderationStatus, story.isFeatured)}
                      </div>

                      {/* Extra Badges - desktop only */}
                      <div className="hidden lg:flex items-center gap-2 shrink-0">
                        <Badge variant="outline" className="text-xs">{story.aiUsed}</Badge>
                        <Badge variant="outline" className="text-xs">{story.ketamineType}</Badge>
                      </div>
                    </div>

                    {/* Actions - full width on mobile, right side on desktop */}
                    <div className="flex items-center justify-between sm:justify-end gap-2 pt-2.5 sm:pt-0 w-full sm:w-auto shrink-0">
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>

                    {story.moderationStatus !== "APPROVED" && (
                      <Button
                        size="sm"
                        className="h-8 px-2 bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => handleAction(story.id, "approve")}
                        disabled={actionLoading === story.id}
                      >
                        <Check className="h-4 w-4" />
                        <span className="hidden sm:inline sm:ml-1">Approve</span>
                      </Button>
                    )}

                    {story.moderationStatus !== "REJECTED" && (
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-8 px-2"
                        onClick={() => handleAction(story.id, "reject")}
                        disabled={actionLoading === story.id}
                      >
                        <X className="h-4 w-4" />
                        <span className="hidden sm:inline sm:ml-1">Reject</span>
                      </Button>
                    )}

                    {story.moderationStatus === "APPROVED" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2"
                        onClick={() => handleAction(story.id, story.isFeatured ? "unfeature" : "feature")}
                        disabled={actionLoading === story.id}
                        title={story.isFeatured ? "Unfeature" : "Feature"}
                      >
                        <Star className={`h-4 w-4 ${story.isFeatured ? "fill-amber-400 text-amber-400" : ""}`} />
                      </Button>
                    )}

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-2 text-destructive hover:text-destructive"
                          disabled={actionLoading === story.id}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Story</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this story? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(story.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{story.title || "Untitled Story"}</DialogTitle>
                  <DialogDescription>
                    {story.isAnonymous ? "Anonymous" : story.displayName} • Day {story.daysSinceStarting}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  <div className="flex gap-2 text-sm">
                    <Badge variant="outline">{story.aiUsed}</Badge>
                    <Badge variant="outline">{story.ketamineType}</Badge>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="whitespace-pre-wrap text-sm">{story.storyText}</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Self-Reported Metrics (Before → After)</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                      <div className="p-2 rounded bg-muted/30">
                        <span className="text-muted-foreground text-xs block">Feeling Loved</span>
                        <span className="font-medium">{story.feelingLovedBefore} → {story.feelingLovedAfter}</span>
                      </div>
                      <div className="p-2 rounded bg-muted/30">
                        <span className="text-muted-foreground text-xs block">Hope</span>
                        <span className="font-medium">{story.hopeBefore} → {story.hopeAfter}</span>
                      </div>
                      <div className="p-2 rounded bg-muted/30">
                        <span className="text-muted-foreground text-xs block">Belonging</span>
                        <span className="font-medium">{story.belongingBefore} → {story.belongingAfter}</span>
                      </div>
                      <div className="p-2 rounded bg-muted/30">
                        <span className="text-muted-foreground text-xs block">Depression</span>
                        <span className="font-medium">{story.depressionBefore} → {story.depressionAfter}</span>
                      </div>
                      <div className="p-2 rounded bg-muted/30">
                        <span className="text-muted-foreground text-xs block">Anxiety</span>
                        <span className="font-medium">{story.anxietyBefore} → {story.anxietyAfter}</span>
                      </div>
                      <div className="p-2 rounded bg-muted/30">
                        <span className="text-muted-foreground text-xs block">Suicidal Ideation</span>
                        <span className="font-medium">{story.suicidalBefore} → {story.suicidalAfter}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      )}
    </div>
  );
}
