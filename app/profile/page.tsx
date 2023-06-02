"use client"

import { useSession } from "next-auth/react"

// @ts-ignore
import { useSessionStorage } from "@hooks"
import { AnimeSession } from '@types'

export default function Page() {
  const { data, status, update } = useSession()

  let session: AnimeSession | null = data

  const [localSession, saveLocalSession] = useSessionStorage("profile", {
    isAdult: session?.isAdult || false,
  })

  const isAdult = localSession?.isAdult || false

  // Update user session and session storage
  const handleChange = (e: any) => {
    const { checked } = e.target
    const profile = { user: { name: "Guest" }, isAdult: checked}
    saveLocalSession({ isAdult: checked })
    update(profile)
  }

  return (
    <div className="container mx-auto h-full pt-4">
      <div className="form-control w-36">
        <label className="label cursor-pointer">
          <span className="label-text">Adult Mode</span>
          <input type="checkbox" className="toggle" checked={isAdult} onChange={handleChange} />
        </label>
      </div>
    </div>
  )
}
