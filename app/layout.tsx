import "./globals.css"
import Navbar from "./components/Navbar"
import AuthContext from "./AuthContext"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { Analytics } from "@vercel/analytics/react"
import { Footer } from "./components"

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
    <html lang="en" className="bg-base-300">
      <body>
        <AuthContext session={session}>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16">
              {children}
            </main>
            <Footer />
            <Analytics />
          </div>
        </AuthContext>
      </body>
    </html>
  )
}

export default RootLayout
