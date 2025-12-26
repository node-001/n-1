"use client";

import { WifiOff, Heart, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function OfflinePage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <Card className="max-w-md w-full bg-card/50 border-border/50">
          <CardContent className="py-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-muted">
                <WifiOff className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight mb-3">
              You&apos;re offline
            </h1>
            <p className="text-muted-foreground mb-8">
              It looks like you&apos;ve lost your internet connection.
              Some features may not be available until you reconnect.
            </p>

            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="w-full gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try again
            </Button>

            <div className="mt-8 pt-6 border-t border-border/50">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Heart className="h-4 w-4 text-primary" />
                <span>Your healing journey continues</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                We&apos;ll be here when you&apos;re back online
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
