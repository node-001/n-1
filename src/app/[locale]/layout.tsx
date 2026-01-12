import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import { routing } from '@/i18n/routing';
import { isRTL, type Locale } from '@/i18n/config';
import { ThemeProvider } from "@/providers/theme-provider";
import { Web3Provider } from "@/providers/web3-provider";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const rtl = isRTL(locale as Locale);

  return (
    <html
      lang={locale}
      dir={rtl ? 'rtl' : 'ltr'}
      suppressHydrationWarning
      className="overflow-x-hidden"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased min-h-screen flex flex-col overflow-x-hidden`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Web3Provider>
              <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rtl:right-auto rtl:left-4">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
              {children}
              <Toaster />
            </Web3Provider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
