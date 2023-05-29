import { NextResponse } from "next/server"
import { randomAnime } from "@utils"

export async function GET(request: Request) {
  const results = await randomAnime()

  return NextResponse.json(results)
}
