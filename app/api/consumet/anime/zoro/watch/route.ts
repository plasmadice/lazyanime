import { NextResponse } from "next/server"
import { ANIME } from "@consumet/extensions"
import { StreamingServers } from "@consumet/extensions/dist/models"

export async function GET(request: Request) {

  // Query parameters from the URL (e.g. `/api/consumet/Gogoanime/[query]/route.ts?page=1`)
  const { searchParams } = new URL(request.url)
  const episodeId = searchParams.get("episodeId")
  const server = searchParams.get("server") as StreamingServers // FIXME: Consider using default streamingserver. 'vidcloud' specifically.

  if (!episodeId) {
    return NextResponse.json(
      {
        error: "episodeId is required",
        description: `Error while fetching: ${episodeId}`,
      },
      { status: 400 }
    )
  }

  if (server && !Object.values(StreamingServers).includes(server)) {
    return NextResponse.json(
      {
        error: "Invalid server",
        description: `Invalid server: ${server}`,
      },
      { status: 400 }
    )
  }

  try {
    const zoro = new ANIME.Zoro()
    const res = await zoro.fetchEpisodeSources(episodeId, server)

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
