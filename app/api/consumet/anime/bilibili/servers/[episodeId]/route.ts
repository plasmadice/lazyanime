import { NextResponse } from "next/server"
import { ANIME } from "@consumet/extensions"

type Props = {
  params: {
    episodeId: string
  }
}

// Method not implemented yet https://github.com/consumet/consumet.ts/blob/f89bc923f649fc89aa167bf95c18195eb734db2c/dist/providers/anime/animesaturn.js#L149C17-L149C17
// ex. http://localhost:3000/api/consumet/anime/animesaturn/servers/Gundam-vs-Hello-Kitty-ep-1
export async function GET(request: Request, { params }: Props) {
  // Parameters from the URL path `/api/consumet/Gogoanime/[query]/route.ts`
  const episodeId = params.episodeId

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
    const animesaturn = new ANIME.AnimeSaturn()
    const res = await animesaturn.fetchEpisodeServers(episodeId)

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
