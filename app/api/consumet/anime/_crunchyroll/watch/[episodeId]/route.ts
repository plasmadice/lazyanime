import { NextResponse } from "next/server"
import { ANIME } from "@consumet/extensions"

type Props = {
  params: Promise<{
    episodeId: string
  }>
}

export async function GET(request: Request, props: Props) {
  const params = await props.params;
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
    const crunchyroll = await ANIME.Crunchyroll.create();
    const res = await crunchyroll.fetchEpisodeSources(episodeId)

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
