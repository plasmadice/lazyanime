import { NextResponse, NextRequest } from "next/server"
import { ANIME } from "@consumet/extensions"

type Props = {
  params: {
    id: string[]
  }
}

export async function GET(request: NextRequest, { params }: Props) {
  // Parameters from the URL path `/api/consumet/Gogoanime/[query]/route.ts`
  const id = params.id.join('/')

  // Query parameters from the URL (e.g. `/api/consumet/Gogoanime/[query]/route.ts?page=1`)
  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get("page"))

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
    const animepahe = new ANIME.AnimePahe()
    const res = await animepahe.fetchAnimeInfo(id, page)

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
