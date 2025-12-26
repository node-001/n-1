"use client";

import { useEffect, useState } from "react";
import { Wallet, ExternalLink, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "@/lib/utils";

interface Donation {
  id: string;
  amount: number;
  currency: string;
  tokenAmount: number | null;
  tokenSymbol: string | null;
  displayName: string | null;
  message: string | null;
  isAnonymous: boolean;
  txHash: string | null;
  walletAddress: string | null;
  chainId: number | null;
  showOnWall: boolean;
  createdAt: string;
}

interface Stats {
  totalAmount: number;
  totalCount: number;
  byChain: Array<{
    chainId: number | null;
    amount: number;
    count: number;
  }>;
}

const CHAIN_NAMES: Record<number, string> = {
  1: "Ethereum",
  137: "Polygon",
  8453: "Base",
};

const CHAIN_EXPLORERS: Record<number, string> = {
  1: "https://etherscan.io/tx/",
  137: "https://polygonscan.com/tx/",
  8453: "https://basescan.org/tx/",
};

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchDonations = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("filter", filter);
      if (startDate) params.set("startDate", startDate);
      if (endDate) params.set("endDate", endDate);

      const res = await fetch(`/api/admin/donations?${params}`);
      if (res.ok) {
        const data = await res.json();
        setDonations(data.donations);
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Failed to fetch donations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [filter]);

  const handleDateFilter = () => {
    fetchDonations();
  };

  const clearDateFilter = () => {
    setStartDate("");
    setEndDate("");
    fetchDonations();
  };

  const getExplorerUrl = (txHash: string, chainId: number | null) => {
    if (!chainId) return null;
    return `${CHAIN_EXPLORERS[chainId] || ""}${txHash}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Donations</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          View and track all donations
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-card/80 border-border">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Total Raised</p>
              <p className="text-2xl font-bold text-primary">
                ${stats.totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/80 border-border">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Total Donations</p>
              <p className="text-2xl font-bold">{stats.totalCount}</p>
            </CardContent>
          </Card>
          {stats.byChain.map((chain) => (
            <Card key={chain.chainId} className="bg-card/80 border-border">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">
                  {chain.chainId ? CHAIN_NAMES[chain.chainId] || `Chain ${chain.chainId}` : "Unknown"}
                </p>
                <p className="text-lg font-bold">
                  ${chain.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-muted-foreground">{chain.count} donations</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Filters */}
      <Card className="bg-card/80 border-border">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground">Chain</Label>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="All Chains" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Chains</SelectItem>
                  <SelectItem value="1">Ethereum</SelectItem>
                  <SelectItem value="137">Polygon</SelectItem>
                  <SelectItem value="8453">Base</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground">Start Date</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground">End Date</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex items-end gap-2">
              <Button onClick={handleDateFilter} size="sm">
                <Calendar className="h-4 w-4 mr-1" />
                Apply
              </Button>
              {(startDate || endDate) && (
                <Button onClick={clearDateFilter} variant="outline" size="sm">
                  Clear
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Donations List */}
      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="bg-card/80 border-border">
              <CardContent className="p-4">
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : donations.length === 0 ? (
        <Card className="bg-card/80 border-border">
          <CardContent className="py-12 text-center">
            <Wallet className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-semibold mb-2">No donations found</h3>
            <p className="text-muted-foreground">
              {filter !== "all" || startDate || endDate
                ? "Try adjusting your filters"
                : "Donations will appear here"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {donations.map((donation) => (
            <Card key={donation.id} className="bg-card/80 border-border overflow-hidden">
              <CardContent className="px-3 py-2 sm:py-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  {/* Left side: Amount, Name, Message */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg font-bold text-primary">
                        ${donation.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </span>
                      {donation.tokenAmount && donation.tokenSymbol && (
                        <Badge variant="outline" className="text-xs">
                          {donation.tokenAmount.toFixed(donation.tokenSymbol === "WBTC" ? 6 : 4)} {donation.tokenSymbol}
                        </Badge>
                      )}
                      {donation.chainId && (
                        <Badge variant="outline" className="text-xs">
                          {CHAIN_NAMES[donation.chainId] || `Chain ${donation.chainId}`}
                        </Badge>
                      )}
                      {!donation.showOnWall && (
                        <Badge variant="secondary" className="text-xs">Hidden</Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      <span className="font-medium text-foreground">
                        {donation.isAnonymous ? "Anonymous" : donation.displayName || "Anonymous"}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{formatDistanceToNow(new Date(donation.createdAt))}</span>
                    </div>
                    {donation.message && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                        &ldquo;{donation.message}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* Right side: Wallet & TX */}
                  <div className="flex items-center gap-2 text-xs shrink-0">
                    {donation.walletAddress && (
                      <code className="text-muted-foreground bg-muted px-2 py-1 rounded">
                        {donation.walletAddress.slice(0, 6)}...{donation.walletAddress.slice(-4)}
                      </code>
                    )}
                    {donation.txHash && donation.chainId && (
                      <a
                        href={getExplorerUrl(donation.txHash, donation.chainId) || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        View <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
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
