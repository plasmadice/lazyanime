import { NextResponse } from "next/server"
import { Providers, AnimeSpeeds, Ping } from "@types"

const fetchSpeed = async (provider: Providers) => {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_URL
    }/api/consumet/anime/${provider.toLowerCase()}/speed-test`,
    {
      cache: "no-store",
    }
  )
  return await res.json()
}

// ex. http://localhost:3000/api/consumet/anime/providers
// ex. http://localhost:3000/api/consumet/anime/providers?provider=animepahe
export async function GET(request: Request) {
  // Query parameters from the URL (e.g. `/api/consumet/Gogoanime/[query]/route.ts?page=1`)
  const { searchParams } = new URL(request.url)
  const provider = searchParams.get("provider") as Providers

  if (provider && !Object.values(Providers).includes(provider)) {
    return NextResponse.json(
      {
        error: "Invalid provider",
        description: `Invalid provider: ${provider}`,
      },
      { status: 400 }
    )
  }

  try {
    // let res: AnimeSpeeds = {}

    // for (const provider in Providers) {
    //   res[provider] = await fetchSpeed(provider as Providers)
    // }
    // const [animepahe, enime, gogoanime, marin, zoro] = await Promise.all((Object.keys(Providers) as Array<Providers>).map(provider => fetchSpeed(provider)));

    let providersList = (Object.keys(Providers) as Array<Providers>)
    const results = await Promise.all(providersList.map(provider => fetchSpeed(provider)));
    const res: Ping[] = providersList.map((provider, index) => {
    const speed: number = results[index].speed || 0

      return {
        speed: speed,
        provider: provider,
        error: results[index].error,
      }
    })

    return NextResponse.json(res)
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err?.message,
        description: `Error while checking provider speed${
          provider ? ` for ${provider}` : " for all providers"
        }`,
      },
      { status: 500 }
    )
  }
}
