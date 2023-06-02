import { NextResponse } from "next/server"
import { providerQuery, getProviders, getTopAiring } from "@utils"

export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  const provider = params.slug[0]
  const query = params.slug[1]
  const page = params.slug[2]

  console.log("params in route", params)
  const providers = getProviders()
  const topAiring = await getTopAiring()

  console.log('providers in route', providers)

  const res = await providerQuery(provider, query)

//   return NextResponse.json(res)
  return NextResponse.json(topAiring)
}
