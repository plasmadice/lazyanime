import "./globals.css"
import Navbar from "./components/Navbar"
import AuthContext from "./AuthContext"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { Analytics } from "@vercel/analytics/react"
import { Footer } from "./components"
import { ThemeProvider } from "./providers/ThemeProvider"

export const metadata = {
  title: "LazyAnime",
  description: "Your modern anime companion",
}

const getSession = async () => {
  const session = await getServerSession(authOptions)
  return session
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession()
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 dark:from-gray-900 dark:to-gray-950">
        <ThemeProvider>
          <AuthContext session={session}>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow w-full max-w-[1920px] mx-auto pt-24 pb-16">
                {children}
              </main>
              <Footer session={session} />
              <Analytics />
            </div>
          </AuthContext>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
