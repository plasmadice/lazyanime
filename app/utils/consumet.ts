import { AnimeProviders } from "@types"

type Props = {
  provider: AnimeProviders
  query: string
  page?: number
}

const searchProvider = async ({ provider, query, page }: Props) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/consumet/${provider}/${query}/${page}`
  )

  const data = await res.json()
  return await data
}

export async function withConsumetSearch({ provider, query, page }: Props) {
  if (!Object.values(AnimeProviders).includes(provider)) {
    return { error: "Invalid provider" }
  }

  const res = await searchProvider({ provider, query, page })
  
  return res
}
