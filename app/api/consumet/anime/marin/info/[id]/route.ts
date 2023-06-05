import { NextResponse } from "next/server"
import { ANIME } from "@consumet/extensions"

type Props = {
  params: {
    id: string
  }
}

// ex. http://localhost:3000/api/consumet/anime/marin/info/6opbhcth
export async function GET(request: Request, { params }: Props) {
  // Parameters from the URL path `/api/consumet/Gogoanime/[query]/route.ts`
  const id = params.id


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
    const marin = new ANIME.Marin()
    const res = await marin.fetchAnimeInfo(id)

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
