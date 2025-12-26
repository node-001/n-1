"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { BookOpen, Users, MessageSquare, LayoutDashboard, LogOut, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/stories", label: "Stories", icon: BookOpen },
  { href: "/admin/prescribers", label: "Prescribers", icon: Users },
  { href: "/admin/feedback", label: "Feedback", icon: MessageSquare },
];

function SidebarContent({
  pathname,
  onLogout,
  isLoggingOut
}: {
  pathname: string;
  onLogout: () => void;
  isLoggingOut: boolean;
}) {
  return (
    <>
      {/* Logo */}
      <div className="p-4 pl-6 border-b border-border/40">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-semibold text-lg tracking-tight">
            n<span className="text-primary">=</span>1
          </span>
          <span className="text-xs text-muted-foreground">Admin</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 p-4">
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
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
      <div className="p-4 border-t border-border/40 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="justify-start text-muted-foreground hover:text-foreground"
          onClick={onLogout}
          disabled={isLoggingOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </Button>
      </div>
    </>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Don't require auth for login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setIsAuthenticated(true); // Skip check for login page
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        if (!data.authenticated) {
          router.push("/admin/login");
        } else {
          setIsAuthenticated(true);
        }
      } catch {
        router.push("/admin/login");
      }
    }
    checkAuth();
  }, [pathname, router, isLoginPage]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Show login page without layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show loading while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="space-y-4 text-center">
          <Skeleton className="h-8 w-32 mx-auto" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl md:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 flex flex-col">
              <VisuallyHidden.Root>
                <SheetTitle>Admin Navigation</SheetTitle>
              </VisuallyHidden.Root>
              <SidebarContent
                pathname={pathname}
                onLogout={handleLogout}
                isLoggingOut={isLoggingOut}
              />
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <span className="font-semibold text-lg tracking-tight">
              n<span className="text-primary">=</span>1
            </span>
            <span className="text-xs text-muted-foreground">Admin</span>
          </Link>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 border-r border-border/40 bg-card/30 flex-col">
          <SidebarContent
            pathname={pathname}
            onLogout={handleLogout}
            isLoggingOut={isLoggingOut}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-4 md:p-6 min-h-screen w-full max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
