import { NextResponse } from "next/server"
import { ANIME } from "@consumet/extensions"

type Props = {
  params: {
    query: string
  }
}

export async function GET(request: Request, { params }: Props) {
  // Parameters from the URL path `/api/consumet/Gogoanime/[query]/route.ts`
  const query = params.query

  // Query parameters from the URL (e.g. `/api/consumet/Gogoanime/[query]/route.ts?page=1`)
  const { searchParams } = new URL(request.url)
  const page: number = Number(searchParams.get("page")) || 1

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
    const gogoanime = new ANIME.Gogoanime()
    const res = await gogoanime.search(query, page)

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
