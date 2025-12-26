"use client";

import Image from "next/image";

interface TokenIconProps {
  symbol: string;
  className?: string;
  size?: number;
}

// CoinGecko CDN URLs for token icons
const TOKEN_ICONS: Record<string, string> = {
  ETH: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  WBTC: "https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png",
  USDC: "https://assets.coingecko.com/coins/images/6319/small/usdc.png",
  USDT: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
  DAI: "https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png",
};

export function TokenIcon({ symbol, className = "", size = 20 }: TokenIconProps) {
  const iconUrl = TOKEN_ICONS[symbol];

  if (!iconUrl) {
    // Fallback for unknown tokens
    return (
      <div
        className={`rounded-full bg-muted flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-[10px] font-bold text-muted-foreground">
          {symbol.slice(0, 2)}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={iconUrl}
      alt={`${symbol} icon`}
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      unoptimized // External URLs need this
    />
  );
}
