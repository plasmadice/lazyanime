import "./globals.css"
import DrawerHeader from "./components/DrawerHeader"
// import DrawerHeader from "./components/DrawerHeader"
import AuthContext from "./AuthContext"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { Analytics } from "@vercel/analytics/react"

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
          <DrawerHeader>
            <main>
              {children}
              <Analytics />
            </main>
          </DrawerHeader>
        </AuthContext>
      </body>
    </html>
  )
}

export default RootLayout
