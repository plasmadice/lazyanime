"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"

type Props = {
  className?: string
}

const HeaderLinks = ({ className }: Props) => {
  const { data: session } = useSession()
  
  const [animeId, setAnimeId] = useState<number>(1)

  // Strange pattern. Fetches data using effect hook and on every /random click
  const fetchRandomAnimeId = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/random`, {
      cache: "no-store",
    })
    const animeId: number = await res.json()
    setAnimeId(animeId)
  }

  useEffect(() => {
    fetchRandomAnimeId()
  }, [])

  return (
    <>
      <li>
        <Link
          prefetch={false}
          className="btn btn-link !m-0 !normal-case !no-underline no-animation px-2 !h-2 text-white text-base hover:text-gray-300"
          href="/"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          prefetch={false}
          className="btn btn-link !m-0 !normal-case !no-underline no-animation px-2 !h-2 text-white text-base hover:text-gray-300"
          href="/search"
        >
          Search
        </Link>
      </li>

      {session?.user ||
      (!session?.user && process.env.NODE_ENV === "development") ? (
        <>
          <li>
            <Link
              className="btn btn-link !m-0 !normal-case !no-underline no-animation px-2 !h-2 text-white text-base hover:text-gray-300"
              href={`/details/${animeId}`}
              prefetch={false}
              onClick={() => fetchRandomAnimeId()}
            >
              Random
            </Link>
          </li>
        </>
      ) : null}
      <li>
        <Link
          prefetch={false}
          className="btn btn-link !m-0 !normal-case !no-underline no-animation px-2 !h-2 text-white text-base hover:text-gray-300"
          href={`/api/auth/${session ? "signout" : "signin"}`}
        >
          {session ? "Sign Out" : "Sign In"}
        </Link>
      </li>
      {session?.user ||
      (!session?.user && process.env.NODE_ENV === "development") ? (
        <li>
          <p className="select-none !m-0 px-2">
            Signed in as {session?.user?.name || "admin"}
          </p>
        </li>
      ) : null}
    </>
  )
}

export default HeaderLinks
