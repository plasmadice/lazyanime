import { NextResponse } from "next/server"
import { searchAnime } from "@utils"

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { query: string }
  }
) {
  const query = params.query // 'a', 'b', or 'c'
  const results = await searchAnime(query)

  return NextResponse.json(results)
}
