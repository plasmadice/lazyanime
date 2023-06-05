import { NextResponse } from "next/server"
import { ANIME } from "@consumet/extensions"

type Props = {
  params: {
    id: string
  }
}

// Not sure if this works
export async function GET(request: Request, { params }: Props) {
  // Parameters from the URL path `/api/consumet/Gogoanime/[query]/route.ts`
  const id = params.id

  // Query parameters from the URL (e.g. `/api/consumet/Gogoanime/[query]/route.ts?page=1`)
  const { searchParams } = new URL(request.url)
  const mediaType = searchParams.get("mediaType")
  const allSeasons = Boolean(searchParams.get("allSeasons"))


  if (!id) {
    return NextResponse.json(
      {
        error: "id is required",
        description: `Error while fetching: ${id}`,
      },
      { status: 400 }
    )
  }

  if (!mediaType) {
    return NextResponse.json(
      {
        error: "mediaType is required",
        description: `Error while fetching: ${mediaType}`,
      },
      { status: 400 }
    )
  }

  try {
    const crunchyroll = await ANIME.Crunchyroll.create();
    const res = await crunchyroll.fetchAnimeInfo(id, mediaType, allSeasons)

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
