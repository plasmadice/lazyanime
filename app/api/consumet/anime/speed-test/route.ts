import { NextResponse } from "next/server"

enum Providers {
  AnimePahe = "animepahe",
  Enime = "enime",
  Gogoanime = "gogoanime",
  Marin = "marin",
  Zoro = "zoro",
}

interface ErrorInfo {
  error: string;
  description: string;
}

type Speed = number | ErrorInfo;

interface AnimeSpeeds {
  [key: string]: Speed;
}

const fetchSpeed = async (provider: Providers) => {
  console.log(`Checking ${provider} speed...`)
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
  console.log("Checking provider speed...")
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
    let res: AnimeSpeeds = {}

    for (const provider in Providers) {
      res[provider] = await fetchSpeed(provider as Providers)
    }

    return NextResponse.json(await res)
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
