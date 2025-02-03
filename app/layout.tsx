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
  description: "Anime stuff",
}

const getSession = async () => {
  const session = await getServerSession(authOptions)
  return session
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession()
  return (
    <html lang="en">
      <body className="pt-16">
        <ThemeProvider>
          <AuthContext session={session}>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
              <Analytics />
            </div>
          </AuthContext>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
