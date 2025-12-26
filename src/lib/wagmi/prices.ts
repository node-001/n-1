"use client";

// Simple price cache to avoid excessive API calls
interface PriceCache {
  prices: Record<string, number>;
  timestamp: number;
}

let priceCache: PriceCache | null = null;
const CACHE_DURATION = 60000; // 1 minute

// CoinGecko IDs for our supported tokens
const COINGECKO_IDS: Record<string, string> = {
  ETH: "ethereum",
  WBTC: "wrapped-bitcoin",
  USDC: "usd-coin",
  USDT: "tether",
  DAI: "dai",
};

export async function fetchTokenPrices(): Promise<Record<string, number>> {
  // Return cached prices if fresh
  if (priceCache && Date.now() - priceCache.timestamp < CACHE_DURATION) {
    return priceCache.prices;
  }

  try {
    const ids = Object.values(COINGECKO_IDS).join(",");
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch prices");
    }

    const data = await response.json();

    // Map back to our token symbols
    const prices: Record<string, number> = {};
    for (const [symbol, geckoId] of Object.entries(COINGECKO_IDS)) {
      prices[symbol] = data[geckoId]?.usd || (symbol.includes("USD") || symbol === "DAI" ? 1 : 0);
    }

    priceCache = { prices, timestamp: Date.now() };
    return prices;
  } catch (error) {
    console.error("Error fetching prices:", error);
    // Return fallback prices (stablecoins at $1, others at 0)
    return {
      ETH: 0,
      WBTC: 0,
      USDC: 1,
      USDT: 1,
      DAI: 1,
    };
  }
}

export function convertUsdToToken(usdAmount: number, tokenPrice: number): number {
  if (tokenPrice <= 0) return 0;
  return usdAmount / tokenPrice;
}

export function convertTokenToUsd(tokenAmount: number, tokenPrice: number): number {
  return tokenAmount * tokenPrice;
}

export function formatTokenAmount(amount: number, symbol: string): string {
  if (symbol === "WBTC") {
    return amount.toFixed(6);
  }
  if (symbol === "USDC" || symbol === "USDT" || symbol === "DAI") {
    return amount.toFixed(2);
  }
  // ETH
  return amount.toFixed(6);
}
