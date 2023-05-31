"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

const fetchRandomAnimeId = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/random`, {
    cache: "no-store",
  })
  const animeId: number = await res.json()
  return animeId
}

export const useRandomId = () => {
  const [randomId, setRandomId] = useState<number>(1)
  const pathname = usePathname()
  const [path, setPath] = useState<string>(pathname)
  
  useEffect(() => {
    setPath(pathname)
  }, [pathname])

  useEffect(() => {
    const newRandomId = async () => {
      if (randomId === 1 || path.includes(randomId.toString())) {
        const result = await fetchRandomAnimeId()
        setRandomId(result)
      }
    }

    newRandomId()
  }, [path])

  return { randomId }
}
