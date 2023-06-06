import { NextResponse } from "next/server"
import { performance } from "perf_hooks"
import { ANIME } from "@consumet/extensions"

// ex. http://localhost:3000/api/consumet/anime/enime/speed-test
export async function GET(request: Request) {
  let t0, t1 = performance.now()
  
  // Query parameters from the URL (e.g. `/api/consumet/Gogoanime/[query]/route.ts?page=1`)
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query") || "One Piece"
  

  try {
    const provider = new ANIME.Enime();

    t0 = performance.now()
    const res = await provider.search(query)
    t1 = performance.now()
    const speed = Number(((t1 - t0) / 1000).toFixed(2))

    if (res.results) {
      return NextResponse.json(speed)
    } else {
      return NextResponse.json(
        {
          error: "No results from Enime",
          description: `No results from Enime.${query ? ` Query: ${query}` : ""}}`,
        },
        { status: 404 }
      )
    }
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err?.message,
        description: `Error while checking Enime speed.`,
      },
      { status: 500 }
    )
  }
}
