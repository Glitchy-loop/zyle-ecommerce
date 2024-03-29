import type { Metadata } from "next"
import { Audiowide as FontSans } from "next/font/google"
import "../styles/globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/providers/ThemeProvider"
import Header from "@/components/layout/Header"
import { Toaster } from "@/components/ui/sonner"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import SmoothScrollProvider from "@/providers/SmoothScrollProvider"
import CartProvider from "@/providers/CartProvider"
import ShoppingCartSidebar from "@/components/layout/ShoppingCartSidebar"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400"],
})

export const metadata: Metadata = {
  title: "Zyle online store",
  description: "Zyle e-commerce store. Buy your favorite products online.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Fetch user data from the database using the session user ID
  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("id", session?.user?.id)

  // Merge additional user data from the database into session.user
  const mergedSession = session?.user
    ? { ...session, user: { ...session.user, ...userData } }
    : null

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <SmoothScrollProvider>
              <main className="min-h-screen ">
                <Header session={mergedSession} />
                <ShoppingCartSidebar />

                {children}
              </main>
            </SmoothScrollProvider>
          </CartProvider>
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
