"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Heart, BookHeart, Sparkles, MapPin, ScrollText, MessageSquare, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

const navItems = [
  { href: "/our-story", label: "Our Story", icon: BookHeart },
  { href: "/what-is-n1", label: "Protocol", icon: Sparkles },
  { href: "/directory", label: "Directory", icon: MapPin },
  { href: "/living-ledger", label: "Ledger", icon: ScrollText },
  { href: "/feedback", label: "Feedback", icon: MessageSquare },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-4">
        {/* Mobile Menu + Logo */}
        <div className="flex items-center justify-between md:justify-start gap-2 flex-1 md:flex-none">
          {/* Mobile Navigation - Left side */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 flex flex-col">
                <VisuallyHidden.Root>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </VisuallyHidden.Root>
                {/* Logo */}
                <div className="p-4 pl-6 border-b border-border/40">
                  <Link href="/" className="flex items-center gap-2 group" onClick={() => setMobileMenuOpen(false)}>
                    <span className="font-semibold text-lg tracking-tight">
                      n<span className="text-primary">=</span>1
                    </span>
                    <span className="text-xs text-muted-foreground">Protocol</span>
                  </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 flex flex-col gap-1 p-4">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors w-fit",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                {/* Bottom section */}
                <div className="p-4 border-t border-border/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Theme</span>
                    <ThemeToggle />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-[98%] border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
                      asChild
                    >
                      <Link href="/gratitude-wall" onClick={() => setMobileMenuOpen(false)}>
                        <Heart className="h-4 w-4 mr-2" />
                        Support the Mission
                      </Link>
                    </Button>
                    <Button size="sm" className="w-[98%]" asChild>
                      <Link href="/start-journey" onClick={() => setMobileMenuOpen(false)}>
                        <Rocket className="h-4 w-4 mr-2" />
                        Get Started
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="font-semibold text-xl tracking-tight">
              n<span className="text-primary">=</span>1
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
              asChild
            >
              <Link href="/gratitude-wall">
                <Heart className="h-4 w-4 mr-1.5" />
                Support
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/start-journey">Get Started</Link>
            </Button>
          </div>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
