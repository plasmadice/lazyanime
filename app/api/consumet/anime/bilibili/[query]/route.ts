import { NextResponse } from "next/server"
import { ANIME } from "@consumet/extensions"

type Props = {
  params: {
    query: string
  }
}

// ex. http://localhost:3000/api/consumet/anime/bilibili/gundam
export async function GET(request: Request, { params }: Props) {
  // Parameters from the URL path `/api/consumet/Gogoanime/[query]/route.ts`
  const query = params.query

  if (!query) {
    return NextResponse.json(
      {
        error: "Query is required",
        description: `Error while fetching: ${query}`,
      },
      { status: 400 }
    )
  }

  try {
    const bilibili = new ANIME.Bilibili()
    const res = await bilibili.search(query)

    return NextResponse.json(res)
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err?.message,
        description: `Error while searching: ${query}`,
      },
      { status: 500 }
    )
  }
}
