import { NextResponse } from "next/server"
import { searchAnime } from "@utils"

export async function GET(
  request: Request,
  props: {
    params: Promise<{ query: string }>
  }
) {
  const params = await props.params;
  const query = params.query // 'a', 'b', or 'c'
  const results = await searchAnime(query)

  return NextResponse.json(results)
}
