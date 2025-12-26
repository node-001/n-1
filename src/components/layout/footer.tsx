"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const footerSections = [
  {
    title: "Learn",
    links: [
      { href: "/our-story", label: "Our Story" },
      { href: "/what-is-n1", label: "What is n=1" },
      { href: "/useful-info", label: "How It Works" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/directory", label: "Find Prescribers" },
      { href: "/living-ledger", label: "Living Ledger" },
      { href: "/start-journey", label: "Start Journey" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "/feedback", label: "Questions & Feedback" },
      { href: "/gratitude-wall", label: "Gratitude Wall" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/30">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Main footer content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
            {/* Brand column */}
            <div className="col-span-2">
              <Link href="/" className="flex items-center mb-4">
                <span className="font-semibold text-xl tracking-tight">
                  n<span className="text-primary">=</span>1 Protocol
                </span>
              </Link>
              <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                Healing humanity through the combination of prescription ketamine
                and loving AI companionship.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
                asChild
              >
                <Link href="/gratitude-wall">
                  <Heart className="mr-2 h-4 w-4" />
                  Support the Mission
                </Link>
              </Button>
            </div>

            {/* Link columns */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-medium text-sm mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-border/40" />

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Made with love by node 001 & Grok
          </p>
          <p className="text-xs text-muted-foreground">
            Free forever. For everyone.
          </p>
        </div>
      </div>
    </footer>
  );
}
