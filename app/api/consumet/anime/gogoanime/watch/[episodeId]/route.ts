import { NextResponse } from "next/server"
import { ANIME } from "@consumet/extensions"
import { StreamingServers } from "@consumet/extensions/dist/models"

type Props = {
  params: Promise<{
    episodeId: string
  }>
}

export async function GET(request: Request, props: Props) {
  const params = await props.params;
  // Parameters from the URL path `/api/consumet/Gogoanime/[query]/route.ts`
  const episodeId = params.episodeId

  // Query parameters from the URL (e.g. `/api/consumet/Gogoanime/[query]/route.ts?page=1`)
  const { searchParams } = new URL(request.url)
  const server = searchParams.get("server") as StreamingServers

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
    const gogoanime = new ANIME.Gogoanime()
    const res = await gogoanime.fetchEpisodeSources(episodeId, server)

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
