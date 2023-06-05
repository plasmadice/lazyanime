import { NextResponse } from "next/server"
import { ANIME } from "@consumet/extensions"

export async function GET(request: Request) {
  // Query parameters from the URL (e.g. `/api/consumet/Gogoanime/[query]/route.ts?page=1`)
  const { searchParams } = new URL(request.url)
  const page: number = Number(searchParams.get("page")) || 1

  try {
    const gogoanime = new ANIME.Gogoanime()
    const res = await gogoanime.fetchTopAiring(page)

    return NextResponse.json(res)
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err?.message,
        description: `Error while searching for top-airing. page: ${page}`,
      },
      { status: 500 }
    )
  }
}
