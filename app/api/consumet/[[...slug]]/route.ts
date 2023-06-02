import { NextResponse } from "next/server"
import { ANIME } from "@consumet/extensions"

enum AnimeProviders {
  Gogoanime,
  NineAnime,
  AnimePahe,
  Zoro,
  AnimeFox,
  Enime,
  Crunchyroll,
  Bilibili,
  Marin,
  AnimeSaturn,
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  const provider = params.slug[0]
  const query = params.slug[1]
  const page = Number(params.slug[2])

  console.log("params in route", params)

  if (!Object.values(AnimeProviders).includes(provider)) {
    return NextResponse.error()
  }

  // @ts-ignore
  const providerInstance = new ANIME[provider]()
  const res = await providerInstance.search(query)

  return NextResponse.json(res)
}