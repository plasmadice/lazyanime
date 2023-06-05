import { NextResponse } from "next/server"
import { ANIME } from "@consumet/extensions"

// ex. http://localhost:3000/api/consumet/anime/enime/info?id=clfs7tw9000b801pk9f200aj3
export async function GET(request: Request) {
  // Query parameters from the URL (e.g. `/api/consumet/Gogoanime/[query]/route.ts?page=1`)
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json(
      {
        error: "id is required",
        description: `Error while fetching: ${id}`,
      },
      { status: 400 }
    )
  }

  try {
    const enime = new ANIME.Enime();
    const res = await enime.fetchAnimeInfo(id)

    return NextResponse.json(res)
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err?.message,
        description: `Error while searching: ${id}`,
      },
      { status: 500 }
    )
  }
}
