import { NextResponse } from "next/server"
import { ANIME } from "@consumet/extensions"

// ex. http://localhost:3000/api/consumet/anime/marin/recent-episodes?page=2
export async function GET(request: Request) {
  // Query parameters from the URL (e.g. `/api/consumet/Gogoanime/[query]/route.ts?page=1`)
  const { searchParams } = new URL(request.url)
  const page: number = Number(searchParams.get("page")) || 1

  try {
    const marin = new ANIME.Marin()
    const res = await marin.recentEpisodes(page)

    return NextResponse.json(res)
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err?.message,
        description: `Error while searching for recent episodes on Gogoanime.`,
      },
      { status: 500 }
    )
  }
}
