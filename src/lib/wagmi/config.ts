"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, base } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "n=1 Protocol",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo",
  chains: [mainnet, polygon, base],
  ssr: true,
});

// Donation wallet address
export const DONATION_WALLET = process.env.NEXT_PUBLIC_DONATION_WALLET || "0x0000000000000000000000000000000000000000";

// Supported chains for display with gas priority (lower = cheaper/preferred)
export const SUPPORTED_CHAINS: Record<number, { name: string; symbol: string; gasPriority: number; icon: string }> = {
  1: {
    name: "Ethereum",
    symbol: "ETH",
    gasPriority: 3,
    icon: "https://assets.coingecko.com/coins/images/279/small/ethereum.png"
  },
  137: {
    name: "Polygon",
    symbol: "MATIC",
    gasPriority: 1,
    icon: "https://assets.coingecko.com/coins/images/4713/small/polygon.png"
  },
  8453: {
    name: "Base",
    symbol: "ETH",
    gasPriority: 2,
    icon: "https://assets.coingecko.com/asset_platforms/images/131/small/base.jpeg"
  },
};

export function getChainIcon(chainId: number): string | undefined {
  return SUPPORTED_CHAINS[chainId]?.icon;
}

export function getChainName(chainId: number): string {
  return SUPPORTED_CHAINS[chainId]?.name || "Unknown";
}

export function getChainGasPriority(chainId: number): number {
  return SUPPORTED_CHAINS[chainId]?.gasPriority || 99;
}

// Supported tokens for donations
export type TokenInfo = {
  symbol: string;
  name: string;
  decimals: number;
  address: `0x${string}` | null; // null = native token
  chainId: number;
};

export const SUPPORTED_TOKENS: TokenInfo[] = [
  // Native ETH (Ethereum and Base)
  { symbol: "ETH", name: "Ethereum", decimals: 18, address: null, chainId: 1 },
  { symbol: "ETH", name: "Ethereum", decimals: 18, address: null, chainId: 8453 },

  // WBTC - Wrapped Bitcoin (Ethereum and Polygon)
  { symbol: "WBTC", name: "Wrapped Bitcoin", decimals: 8, address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", chainId: 1 },
  { symbol: "WBTC", name: "Wrapped Bitcoin", decimals: 8, address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6", chainId: 137 },

  // USDC (all chains)
  { symbol: "USDC", name: "USD Coin", decimals: 6, address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", chainId: 1 },
  { symbol: "USDC", name: "USD Coin", decimals: 6, address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", chainId: 137 },
  { symbol: "USDC", name: "USD Coin", decimals: 6, address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", chainId: 8453 },

  // USDT (Ethereum and Polygon)
  { symbol: "USDT", name: "Tether", decimals: 6, address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", chainId: 1 },
  { symbol: "USDT", name: "Tether", decimals: 6, address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", chainId: 137 },

  // DAI (all chains)
  { symbol: "DAI", name: "Dai", decimals: 18, address: "0x6B175474E89094C44Da98b954EeecdeCB5dC3F4", chainId: 1 },
  { symbol: "DAI", name: "Dai", decimals: 18, address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063", chainId: 137 },
  { symbol: "DAI", name: "Dai", decimals: 18, address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb", chainId: 8453 },
];

// Get tokens available for a specific chain
export function getTokensForChain(chainId: number): TokenInfo[] {
  return SUPPORTED_TOKENS.filter((t) => t.chainId === chainId);
}

// Get native token for a chain
export function getNativeToken(chainId: number): TokenInfo | undefined {
  return SUPPORTED_TOKENS.find((t) => t.chainId === chainId && t.address === null);
}

// Get unique token key for selection (symbol-chainId)
export function getTokenKey(token: TokenInfo): string {
  return `${token.symbol}-${token.chainId}`;
}

// Get all unique token symbols
export function getUniqueTokenSymbols(): string[] {
  return [...new Set(SUPPORTED_TOKENS.map((t) => t.symbol))];
}

// Get all chains where a token is available, sorted by gas priority (cheapest first)
export function getChainsForToken(symbol: string): TokenInfo[] {
  return SUPPORTED_TOKENS
    .filter((t) => t.symbol === symbol)
    .sort((a, b) => getChainGasPriority(a.chainId) - getChainGasPriority(b.chainId));
}

// Get the cheapest chain option for a token
export function getCheapestTokenOption(symbol: string): TokenInfo | undefined {
  const options = getChainsForToken(symbol);
  return options[0]; // Already sorted by gas priority
}

// Get all tokens sorted by symbol, then by gas priority within each symbol
export function getAllTokensSorted(): TokenInfo[] {
  return [...SUPPORTED_TOKENS].sort((a, b) => {
    // First sort by symbol
    if (a.symbol !== b.symbol) {
      return a.symbol.localeCompare(b.symbol);
    }
    // Then by gas priority (cheapest first)
    return getChainGasPriority(a.chainId) - getChainGasPriority(b.chainId);
  });
}
