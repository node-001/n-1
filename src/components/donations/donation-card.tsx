"use client";

import { Heart, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "@/lib/utils";
import { TokenIcon } from "./token-icon";

interface DonationCardProps {
  donation: {
    id: string;
    amount: number;
    currency: string;
    tokenAmount?: number | null;
    tokenSymbol?: string | null;
    displayName?: string | null;
    message?: string | null;
    isAnonymous: boolean;
    txHash?: string | null;
    chainId?: number | null;
    createdAt: Date | string;
  };
}

const CHAIN_EXPLORERS: Record<number, string> = {
  1: "https://etherscan.io/tx/",
  137: "https://polygonscan.com/tx/",
  8453: "https://basescan.org/tx/",
};

export function DonationCard({ donation }: DonationCardProps) {
  const displayName = donation.isAnonymous ? "Anonymous" : donation.displayName || "Anonymous";
  const explorerUrl = donation.txHash && donation.chainId
    ? `${CHAIN_EXPLORERS[donation.chainId] || ""}${donation.txHash}`
    : null;

  // Get the token symbol for icon display
  const tokenSymbol = donation.tokenSymbol || (donation.currency !== "USD" ? donation.currency : null);

  // Format amount display - show in USD if available, otherwise show original currency
  const formatAmount = () => {
    if (donation.currency === "USD") {
      // New format: USD amount with optional token details
      const usdDisplay = `$${donation.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      if (donation.tokenAmount && donation.tokenSymbol) {
        return (
          <>
            {usdDisplay}
            <span className="text-muted-foreground text-xs ml-1">
              ({donation.tokenAmount.toLocaleString("en-US", { minimumFractionDigits: donation.tokenSymbol === "WBTC" ? 6 : 4, maximumFractionDigits: donation.tokenSymbol === "WBTC" ? 6 : 4 })} {donation.tokenSymbol})
            </span>
          </>
        );
      }
      return usdDisplay;
    }
    // Legacy format: token amount with currency symbol
    return `${donation.amount.toLocaleString("en-US")} ${donation.currency}`;
  };

  return (
    <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary/10 flex-shrink-0 relative">
              {tokenSymbol ? (
                <TokenIcon symbol={tokenSymbol} size={20} />
              ) : (
                <Heart className="h-5 w-5 text-primary" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium">{displayName}</span>
                <span className="text-primary font-semibold">
                  {formatAmount()}
                </span>
              </div>
              {donation.message && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  "{donation.message}"
                </p>
              )}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(donation.createdAt))}
                </span>
                {explorerUrl && (
                  <a
                    href={explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    View tx <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
