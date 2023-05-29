import { redirect } from "next/navigation"

const fetchRandomAnimeId = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/random`, {
    cache: "no-store",
  })
  return await res.json()
}

export default async function page() {
  const anime: number = await fetchRandomAnimeId()

  if (!anime) {
    return <div className="text-white">Loading...</div>
  } else {
    redirect(`/details/${anime}`)
  }
}

// TODO: Possibly refactor to not be a route. Redirecting may be jarring
