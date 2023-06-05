import { NextResponse } from "next/server"
import { ANIME } from "@consumet/extensions"

type Props = {
  params: {
    episodeId: string[]
  }
}

// This endpoint is broken in consumet. Not just me. FIXME: Maybe fix it?
export async function GET(request: Request, { params }: Props) {
  // Parameters from the URL path `/api/consumet/Gogoanime/[query]/route.ts`
  const episodeId = params.episodeId.join("/")
  console.log("episodeId", episodeId)

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
    const animepahe = new ANIME.AnimePahe()
    const res = await animepahe.fetchEpisodeSources(episodeId)

    console.log("res in watch", res)

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
