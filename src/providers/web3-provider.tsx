"use client";

import { ReactNode, useState, useEffect } from "react";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/lib/wagmi/config";
import { useTheme } from "next-themes";

import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

function RainbowKitProviderWrapper({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Custom theme to match our emerald primary color
  const customDarkTheme = darkTheme({
    accentColor: "#10b981", // emerald-500
    accentColorForeground: "white",
    borderRadius: "medium",
  });

  const customLightTheme = lightTheme({
    accentColor: "#059669", // emerald-600
    accentColorForeground: "white",
    borderRadius: "medium",
  });

  // Use dark theme as default until mounted to avoid hydration mismatch
  const theme = mounted
    ? resolvedTheme === "dark"
      ? customDarkTheme
      : customLightTheme
    : customDarkTheme;

  return (
    <RainbowKitProvider theme={theme} modalSize="compact">
      {children}
    </RainbowKitProvider>
  );
}

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProviderWrapper>{children}</RainbowKitProviderWrapper>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
