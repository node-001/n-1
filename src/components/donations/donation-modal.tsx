"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { useAccount, useBalance, useSendTransaction, useWaitForTransactionReceipt, useDisconnect, useWriteContract, useReadContract, useSwitchChain } from "wagmi";
import { parseUnits, formatUnits, erc20Abi } from "viem";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Wallet, Heart, Check, Loader2, ExternalLink, LogOut, RefreshCw, AlertCircle } from "lucide-react";
import { fetchTokenPrices, convertUsdToToken, convertTokenToUsd, formatTokenAmount } from "@/lib/wagmi/prices";
import { TokenIcon } from "./token-icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DONATION_WALLET,
  SUPPORTED_CHAINS,
  getChainName,
  getChainIcon,
  getTokensForChain,
  TokenInfo
} from "@/lib/wagmi/config";

interface DonationSuccessData {
  txHash: string;
  amount: number;
  tokenAmount: number;
  tokenSymbol: string;
  chainId: number;
  displayName?: string;
  message?: string;
  isAnonymous: boolean;
}

interface DonationModalProps {
  trigger?: React.ReactNode;
  onSuccess?: (data: DonationSuccessData) => void;
}

// Default to Base (chainId 8453) as it has low fees
const DEFAULT_CHAIN_ID = 8453;

export function DonationModal({ trigger, onSuccess }: DonationModalProps) {
  const t = useTranslations('donationModal');
  const [open, setOpen] = useState(false);
  const [selectedChainId, setSelectedChainId] = useState<number>(DEFAULT_CHAIN_ID);
  const [selectedToken, setSelectedToken] = useState<TokenInfo | null>(null);
  const [usdAmount, setUsdAmount] = useState(""); // Amount in USD
  const [customUsdAmount, setCustomUsdAmount] = useState(""); // Custom amount in USD
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [showOnWall, setShowOnWall] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [pricesLoading, setPricesLoading] = useState(false);
  const pendingConnection = useRef(false);

  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitchingChain } = useSwitchChain();
  const { openConnectModal } = useConnectModal();

  // Reopen modal after wallet connection
  useEffect(() => {
    if (isConnected && pendingConnection.current) {
      pendingConnection.current = false;
      setOpen(true);
    }
  }, [isConnected]);

  const handleConnectClick = () => {
    pendingConnection.current = true;
    openConnectModal?.();
  };

  // Fetch prices on mount and when modal opens
  const loadPrices = useCallback(async () => {
    setPricesLoading(true);
    try {
      const fetchedPrices = await fetchTokenPrices();
      setPrices(fetchedPrices);
    } finally {
      setPricesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      loadPrices();
    }
  }, [open, loadPrices]);

  // Get available tokens for selected chain
  const availableTokens = getTokensForChain(selectedChainId);

  // Check if wallet needs to switch to the selected chain
  const needsChainSwitch = chain && selectedChainId !== chain.id;

  // Set default token when chain changes or modal opens
  useEffect(() => {
    if (open && isConnected) {
      const tokens = getTokensForChain(selectedChainId);
      // Default to USDC if available, otherwise first token
      const defaultToken = tokens.find(t => t.symbol === "USDC") || tokens[0];
      setSelectedToken(defaultToken || null);
    }
  }, [open, isConnected, selectedChainId]);

  // Handle chain selection
  const handleChainSelect = useCallback((chainIdStr: string) => {
    const chainId = parseInt(chainIdStr, 10);
    setSelectedChainId(chainId);
    // Reset token selection - will be set by effect above
    setSelectedToken(null);
    // Prompt wallet to switch if needed
    if (chain && chainId !== chain.id) {
      switchChain?.({ chainId });
    }
  }, [chain, switchChain]);

  // Handle token selection
  const handleTokenSelect = useCallback((symbol: string) => {
    const token = availableTokens.find((t) => t.symbol === symbol);
    if (token) {
      setSelectedToken(token);
    }
  }, [availableTokens]);

  // Get current token price
  const currentPrice = selectedToken ? prices[selectedToken.symbol] || 0 : 0;

  // Calculate token amount from USD
  const effectiveUsd = parseFloat(customUsdAmount || usdAmount) || 0;
  const tokenAmount = currentPrice > 0 ? convertUsdToToken(effectiveUsd, currentPrice) : 0;
  const formattedTokenAmount = selectedToken ? formatTokenAmount(tokenAmount, selectedToken.symbol) : "0";

  // Native token balance
  const { data: nativeBalance } = useBalance({ address });

  // ERC-20 token balance
  const { data: tokenBalance } = useReadContract({
    address: selectedToken?.address || undefined,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!selectedToken?.address && !!address,
    },
  });

  // Native token transfer
  const {
    sendTransaction,
    data: nativeTxHash,
    isPending: isNativeSending,
    error: nativeSendError,
    reset: resetNative,
  } = useSendTransaction();

  // ERC-20 token transfer
  const {
    writeContract,
    data: tokenTxHash,
    isPending: isTokenSending,
    error: tokenSendError,
    reset: resetToken,
  } = useWriteContract();

  const txHash = nativeTxHash || tokenTxHash;
  const isSending = isNativeSending || isTokenSending;
  const sendError = nativeSendError || tokenSendError;

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Preset USD amounts
  const presetUsdAmounts = ["5", "10", "25", "50"];

  // Check if token is a stablecoin
  const isStablecoin = selectedToken?.symbol === "USDC" || selectedToken?.symbol === "USDT" || selectedToken?.symbol === "DAI";

  // Get display balance with USD value
  const getDisplayBalance = () => {
    if (!selectedToken) return null;
    let balance: number;
    if (selectedToken.address === null) {
      // Native token
      if (!nativeBalance) return null;
      balance = parseFloat(formatUnits(nativeBalance.value, selectedToken.decimals));
    } else {
      // ERC-20 token
      if (tokenBalance === undefined) return null;
      balance = parseFloat(formatUnits(tokenBalance as bigint, selectedToken.decimals));
    }

    const usdValue = currentPrice > 0 ? convertTokenToUsd(balance, currentPrice) : 0;
    const formattedBalance = selectedToken.symbol === "WBTC" ? balance.toFixed(6) : balance.toFixed(4);

    if (usdValue > 0) {
      return `${formattedBalance} ${selectedToken.symbol} (~$${usdValue.toFixed(2)})`;
    }
    return `${formattedBalance} ${selectedToken.symbol}`;
  };

  const handleDonate = async () => {
    if (!effectiveUsd || !isConnected || !selectedToken || tokenAmount <= 0) return;

    try {
      const parsedAmount = parseUnits(formattedTokenAmount, selectedToken.decimals);

      if (selectedToken.address === null) {
        // Native token transfer
        sendTransaction({
          to: DONATION_WALLET as `0x${string}`,
          value: parsedAmount,
        });
      } else {
        // ERC-20 token transfer
        writeContract({
          address: selectedToken.address,
          abi: erc20Abi,
          functionName: "transfer",
          args: [DONATION_WALLET as `0x${string}`, parsedAmount],
        });
      }
    } catch (error) {
      console.error("Donation error:", error);
    }
  };

  // Handle success
  useEffect(() => {
    if (isConfirmed && txHash && !savedSuccess) {
      setSavedSuccess(true);

      // Save donation to database (store USD amount for consistency)
      fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: effectiveUsd,
          currency: "USD",
          tokenAmount: parseFloat(formattedTokenAmount),
          tokenSymbol: selectedToken?.symbol || "ETH",
          txHash,
          walletAddress: address,
          chainId: chain?.id,
          displayName: isAnonymous ? null : displayName,
          message,
          isAnonymous,
          showOnWall,
        }),
      }).catch((error) => console.error("Failed to save donation:", error));

      onSuccess?.({
        txHash,
        amount: effectiveUsd,
        tokenAmount: parseFloat(formattedTokenAmount),
        tokenSymbol: selectedToken?.symbol || "ETH",
        chainId: chain?.id || selectedChainId,
        displayName: isAnonymous ? undefined : displayName,
        message: message || undefined,
        isAnonymous,
      });

      // Reset form after a delay
      setTimeout(() => {
        setOpen(false);
        resetNative();
        resetToken();
        setUsdAmount("");
        setCustomUsdAmount("");
        setDisplayName("");
        setMessage("");
        setIsAnonymous(true);
        setSavedSuccess(false);
      }, 3000);
    }
  }, [isConfirmed, txHash, savedSuccess]);

  const getExplorerUrl = (hash: string) => {
    if (!chain) return "#";
    const explorers: Record<number, string> = {
      1: "https://etherscan.io/tx/",
      137: "https://polygonscan.com/tx/",
      8453: "https://basescan.org/tx/",
    };
    return `${explorers[chain.id] || ""}${hash}`;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="lg" className="gap-2 bg-foreground hover:bg-foreground/90 text-background font-semibold px-8">
            <Wallet className="h-5 w-5" />
            {t('donateCrypto')}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-foreground" />
            {t('supportMission')}
          </DialogTitle>
          <DialogDescription>
            {t('donationKeepsFree')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Wallet Connection */}
          {!isConnected ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="p-4 rounded-full bg-foreground/10">
                <Wallet className="h-8 w-8 text-foreground" />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                {t('connectToDonate')}
              </p>
              <Button
                size="lg"
                onClick={handleConnectClick}
                className="gap-2 bg-foreground hover:bg-foreground/90 text-background font-semibold px-8"
              >
                <Wallet className="h-5 w-5" />
                {t('connectWallet')}
              </Button>
            </div>
          ) : isConfirmed ? (
            // Success State
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="p-4 rounded-full bg-foreground/10">
                <Check className="h-8 w-8 text-foreground" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-1">{t('thankYou')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('donationReceived', { usd: effectiveUsd, amount: formattedTokenAmount, symbol: selectedToken?.symbol })}
                </p>
              </div>
              {txHash && (
                <a
                  href={getExplorerUrl(txHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-foreground hover:underline"
                >
                  {t('viewTransaction')} <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          ) : (
            // Donation Form
            <>
              {/* Connected Status */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="text-sm">
                  <span className="text-muted-foreground">{t('connected')}: </span>
                  <span className="font-mono">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-muted-foreground">
                    {getDisplayBalance()}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => disconnect()}
                    className="h-7 px-2 text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Network & Token Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>{t('networkAndToken')}</Label>
                  <button
                    type="button"
                    onClick={loadPrices}
                    disabled={pricesLoading}
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                  >
                    <RefreshCw className={`h-3 w-3 ${pricesLoading ? "animate-spin" : ""}`} />
                    {t('refreshPrices')}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {/* Network Dropdown */}
                  <Select
                    value={selectedChainId.toString()}
                    onValueChange={handleChainSelect}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Network">
                        {selectedChainId && SUPPORTED_CHAINS[selectedChainId] && (
                          <span className="flex items-center gap-2">
                            <Image
                              src={getChainIcon(selectedChainId) || ""}
                              alt={SUPPORTED_CHAINS[selectedChainId].name}
                              width={18}
                              height={18}
                              className="rounded-full"
                            />
                            <span>{SUPPORTED_CHAINS[selectedChainId].name}</span>
                          </span>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(SUPPORTED_CHAINS).map(([chainId, info]) => {
                        const isCurrentChain = chain?.id === parseInt(chainId, 10);
                        return (
                          <SelectItem key={chainId} value={chainId}>
                            <span className="flex items-center gap-2">
                              <Image
                                src={info.icon}
                                alt={info.name}
                                width={18}
                                height={18}
                                className="rounded-full"
                              />
                              <span className={isCurrentChain ? "text-foreground font-medium" : ""}>
                                {info.name}
                              </span>
                              {isCurrentChain && <span className="text-foreground text-xs">✓</span>}
                            </span>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>

                  {/* Token Dropdown */}
                  <Select
                    value={selectedToken?.symbol || ""}
                    onValueChange={handleTokenSelect}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Token">
                        {selectedToken && (
                          <span className="flex items-center gap-2">
                            <TokenIcon symbol={selectedToken.symbol} size={18} />
                            <span>{selectedToken.symbol}</span>
                          </span>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {availableTokens.map((token) => (
                        <SelectItem key={token.symbol} value={token.symbol}>
                          <span className="flex items-center gap-2">
                            <TokenIcon symbol={token.symbol} size={18} />
                            <span className="font-medium">{token.symbol}</span>
                            <span className="text-muted-foreground text-xs">
                              {prices[token.symbol] ? `$${prices[token.symbol].toLocaleString()}` : ""}
                            </span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Chain switch warning */}
                {needsChainSwitch && (
                  <div className="flex items-center gap-2 p-2 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>
                      {isSwitchingChain
                        ? t('switchingNetwork')
                        : t('switchTo', { network: getChainName(selectedChainId) })}
                    </span>
                    {!isSwitchingChain && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="ml-auto h-7 text-xs"
                        onClick={() => switchChain?.({ chainId: selectedChainId })}
                      >
                        {t('switch')}
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* Amount Selection */}
              <div className="space-y-3">
                <Label>{t('donationAmountUSD')}</Label>
                <div className="grid grid-cols-4 gap-2">
                  {presetUsdAmounts.map((preset) => (
                    <Button
                      key={preset}
                      type="button"
                      variant={usdAmount === preset && !customUsdAmount ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setUsdAmount(preset);
                        setCustomUsdAmount("");
                      }}
                      className={usdAmount === preset && !customUsdAmount ? "bg-foreground text-background hover:bg-foreground/90" : ""}
                    >
                      ${preset}
                    </Button>
                  ))}
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    step="1"
                    min="1"
                    placeholder={t('customAmount')}
                    value={customUsdAmount}
                    onChange={(e) => setCustomUsdAmount(e.target.value)}
                    className="pl-6"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    $
                  </span>
                </div>
                {/* Token conversion display */}
                {effectiveUsd > 0 && currentPrice > 0 && (
                  <div className="text-sm text-muted-foreground text-center p-2 bg-muted/50 rounded-md">
                    ≈ {formattedTokenAmount} {selectedToken?.symbol}
                    {!isStablecoin && (
                      <span className="text-xs ml-1">
                        @ ${currentPrice.toLocaleString()} {t('per')} {selectedToken?.symbol}
                      </span>
                    )}
                  </div>
                )}
                {effectiveUsd > 0 && currentPrice === 0 && !pricesLoading && (
                  <div className="text-sm text-amber-600 dark:text-amber-400 text-center p-2 bg-amber-500/10 rounded-md">
                    {t('unableToFetchPrice')}
                  </div>
                )}
              </div>

              {/* Attribution Options */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anonymous"
                    checked={isAnonymous}
                    onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                  />
                  <Label htmlFor="anonymous" className="text-sm font-normal cursor-pointer">
                    {t('keepAnonymous')}
                  </Label>
                </div>

                {!isAnonymous && (
                  <div className="space-y-2">
                    <Label htmlFor="displayName">{t('displayName')}</Label>
                    <Input
                      id="displayName"
                      placeholder={t('displayNamePlaceholder')}
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="message">{t('messageOptional')}</Label>
                  <Input
                    id="message"
                    placeholder={t('messagePlaceholder')}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showOnWall"
                    checked={showOnWall}
                    onCheckedChange={(checked) => setShowOnWall(checked as boolean)}
                  />
                  <Label htmlFor="showOnWall" className="text-sm font-normal cursor-pointer">
                    {t('showOnWall')}
                  </Label>
                </div>
              </div>

              {/* Error Display */}
              {sendError && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                  {sendError.message.includes("User rejected")
                    ? t('transactionCancelled')
                    : t('transactionFailed')}
                </div>
              )}

              {/* Donate Button */}
              <Button
                onClick={handleDonate}
                disabled={isSending || isConfirming || !effectiveUsd || tokenAmount <= 0 || !selectedToken || needsChainSwitch || isSwitchingChain}
                className="w-full bg-foreground hover:bg-foreground/90 text-background"
                size="lg"
              >
                {isSending || isConfirming ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isSending ? t('confirmInWallet') : t('confirming')}
                  </>
                ) : (
                  <>
                    <Heart className="mr-2 h-4 w-4" />
                    {t('donate')} ${effectiveUsd || "0"}
                    {tokenAmount > 0 && !isStablecoin && (
                      <span className="text-background/70 ml-1">
                        ({formattedTokenAmount} {selectedToken?.symbol})
                      </span>
                    )}
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                {t('noFees')}
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
