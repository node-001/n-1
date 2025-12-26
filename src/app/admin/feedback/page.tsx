"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Trash2, Check, MailOpen, Archive, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
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

interface FeedbackItem {
  id: string;
  name: string | null;
  email: string | null;
  type: string;
  message: string;
  status: string;
  createdAt: string;
}

const typeLabels: Record<string, string> = {
  QUESTION: "Question",
  FEEDBACK: "Feedback",
  SUGGESTION: "Suggestion",
  ISSUE: "Issue",
  OTHER: "Other",
};

const typeColors: Record<string, string> = {
  QUESTION: "bg-blue-500/20 text-blue-600",
  FEEDBACK: "bg-purple-500/20 text-purple-600",
  SUGGESTION: "bg-emerald-500/20 text-emerald-600",
  ISSUE: "bg-red-500/20 text-red-600",
  OTHER: "bg-gray-500/20 text-gray-600",
};

export default function AdminFeedbackPage() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("unread");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/admin/feedback?filter=${filter}`);
        if (res.ok) {
          const data = await res.json();
          setFeedback(data);
        }
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeedback();
  }, [filter]);

  const refetchFeedback = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/feedback?filter=${filter}`);
      if (res.ok) {
        const data = await res.json();
        setFeedback(data);
      }
    } catch (error) {
      console.error("Failed to fetch feedback:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (id: string, action: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/feedback/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (res.ok) {
        refetchFeedback();
      }
    } catch (error) {
      console.error("Failed to update feedback:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/feedback/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setFeedback(feedback.filter((f) => f.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete feedback:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "UNREAD":
        return <span className="w-2 h-2 rounded-full bg-blue-500" />;
      case "READ":
        return <span className="w-2 h-2 rounded-full bg-gray-400" />;
      case "ARCHIVED":
        return <span className="w-2 h-2 rounded-full bg-gray-300" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Feedback</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          View and manage user feedback
        </p>
      </div>

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="read">Read</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
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
      ) : feedback.length === 0 ? (
        <Card className="bg-card/80 border-border">
          <CardContent className="py-12 text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-semibold mb-2">No feedback found</h3>
            <p className="text-muted-foreground">
              {filter === "unread"
                ? "No unread feedback"
                : filter === "archived"
                  ? "No archived feedback"
                  : "No feedback yet"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {feedback.map((item) => (
            <Card
              key={item.id}
              className={`bg-card/80 border-border overflow-hidden ${item.status === "UNREAD" ? "border-l-2 border-l-blue-500" : ""}`}
            >
              <CardContent className="px-3 py-1.5 sm:py-3">
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                  {/* Left side: Type, Message, Badge */}
                  <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1 sm:justify-start">
                        <div className="flex items-center gap-2">
                          {getStatusIndicator(item.status)}
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(item.createdAt))}
                          </span>
                          {item.name && (
                            <span className="text-xs text-muted-foreground hidden sm:inline">• {item.name}</span>
                          )}
                        </div>
                        <Badge className={`${typeColors[item.type] || typeColors.OTHER} text-xs shrink-0 sm:hidden`}>
                          {typeLabels[item.type] || item.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">{item.message}</p>
                    </div>

                    {/* Badge - desktop only */}
                    <Badge className={`${typeColors[item.type] || typeColors.OTHER} text-xs shrink-0 hidden sm:inline-flex`}>
                      {typeLabels[item.type] || item.type}
                    </Badge>
                  </div>

                  {/* Actions - full width on mobile, right side on desktop */}
                  <div className="flex items-center justify-between sm:justify-end gap-2 pt-2.5 sm:pt-0 w-full sm:w-auto shrink-0">
                    {item.status === "UNREAD" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2"
                        onClick={() => handleAction(item.id, "read")}
                        disabled={actionLoading === item.id}
                      >
                        <Check className="h-4 w-4" />
                        <span className="hidden sm:inline sm:ml-1">Read</span>
                      </Button>
                    )}

                    {item.status === "READ" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2"
                        onClick={() => handleAction(item.id, "unread")}
                        disabled={actionLoading === item.id}
                      >
                        <MailOpen className="h-4 w-4" />
                        <span className="hidden sm:inline sm:ml-1">Unread</span>
                      </Button>
                    )}

                    {item.status !== "ARCHIVED" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2"
                        onClick={() => handleAction(item.id, "archive")}
                        disabled={actionLoading === item.id}
                      >
                        <Archive className="h-4 w-4" />
                      </Button>
                    )}

                    {item.status === "ARCHIVED" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2"
                        onClick={() => handleAction(item.id, "unread")}
                        disabled={actionLoading === item.id}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    )}

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-2 text-destructive hover:text-destructive"
                          disabled={actionLoading === item.id}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Feedback</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this feedback? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(item.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
