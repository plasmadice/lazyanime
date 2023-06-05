import { NextResponse } from "next/server"
import { ANIME } from "@consumet/extensions"

type Props = {
  params: {
    id: string,
    number: number
  }
}

// ex. http://localhost:3000/api/consumet/anime/marin/watch/6opbhcth/1
export async function GET(request: Request, { params }: Props) {
  // Parameters from the URL path `/api/consumet/Gogoanime/[query]/route.ts`
  const id = params.id
  const number = params.number
  if (!id) {
    return NextResponse.json(
      {
        error: "id is required",
        description: `Error while fetching: ${id}`,
      },
      { status: 400 }
    )
  }

  if (!number) {
    return NextResponse.json(
      {
        error: "number is required",
        description: `Error while fetching: ${number}`,
      },
      { status: 400 }
    )
  }
  
  try {
    const marin = new ANIME.Marin()
    const res = await marin.fetchEpisodeSources(`${id}/${number}`)

    return NextResponse.json(res)
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err?.message,
        description: `Error while searching: ${id}/${number}`,
      },
      { status: 500 }
    )
  }
}
