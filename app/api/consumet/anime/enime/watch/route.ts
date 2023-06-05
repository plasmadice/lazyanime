import { NextResponse } from "next/server"
import { ANIME } from "@consumet/extensions"


// ex. http://localhost:3000/api/consumet/anime/enime/watch?episodeId=clg7klp12002ypkibdqxvbu96
export async function GET(request: Request) {

  // Query parameters from the URL (e.g. `/api/consumet/Gogoanime/[query]/route.ts?page=1`)
  const { searchParams } = new URL(request.url)
  const episodeId = searchParams.get("episodeId")


  if (!episodeId) {
    return NextResponse.json(
      {
        error: "episodeId is required",
        description: `Error while fetching: ${episodeId}`,
      },
      { status: 400 }
    )
  }


  try {
    const enime = new ANIME.Enime();
    const res = await enime.fetchEpisodeSources(episodeId)

    return NextResponse.json(res)
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err?.message,
        description: `Error while searching: ${episodeId}`,
      },
      { status: 500 }
    )
  }
}
