import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'
import DynamicHeader from '@/components/header/DynamicHeader'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { CurrencyProvider } from '@/context/CurrencyContext'
import CartDrawer from '@/components/cart/CartDrawer'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'CDKeyDeals - Best Deals on Game Keys & Software',
  description: 'Get the best deals on game keys, software licenses, gift cards and more. Instant delivery, secure payments, 24/7 support.',
  keywords: 'game keys, software keys, gift cards, steam keys, xbox keys, playstation keys, windows keys, office keys',
  icons: {
    icon: '/images/CDkeyDeals--Favicon.jpg',
    apple: '/images/CDkeyDeals--Favicon.jpg',
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <Script
          id="theme-init"
          src="/theme-init.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground" suppressHydrationWarning>
        {/* Browser Extension Attribute Cleaner - Runs after hydration */}
        <Script
          id="extension-attribute-cleaner"
          src="/extension-attribute-cleaner.js"
          strategy="afterInteractive"
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <CurrencyProvider>
              <WishlistProvider>
                <CartProvider>
                  <div className="min-h-screen flex flex-col">
                    <DynamicHeader />
                    <main className="flex-1">
                      {children}
                    </main>
                    <Footer />
                  </div>
                  <CartDrawer />
                  <Toaster position="top-right" richColors />
                  <Analytics />
                </CartProvider>
              </WishlistProvider>
            </CurrencyProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
