"use client"

import { SessionProvider } from "next-auth/react"
import React from "react"
import type { Session } from "next-auth"

interface PageProps {
  children: React.ReactNode
  session: Session | null
}

const AuthContext = ({ children, session }: PageProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default AuthContext
