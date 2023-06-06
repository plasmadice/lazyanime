import { Providers } from "@types"

type Props = {
  provider: Providers
  query: string
  page?: number
}

export async function withProviderSearch({ provider, query, page }: Props) {
  if (!Object.values(Providers).includes(provider)) {
    return { error: "Invalid provider. Failure within withProviderSearch" }
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/consumet/search/${provider}/${query}/${page}`
  )
  
  return res
}

export async function withConsumetEpisodes({ provider, slug }: { provider: Providers, slug: string }) {
  if (!Object.values(Providers).includes(provider)) {
    return { error: "Invalid provider. Failure within withConsumetEpisodes" }
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/consumet/anime/${provider.toLowerCase()}/${slug}`
  )
  
  return res
}

export async function withConsumetEpisode({ provider, slug, episode }: { provider: Providers, slug: string, episode: string }) {
  if (!Object.values(Providers).includes(provider)) {
    return { error: "Invalid provider. Failure within withConsumetEpisode" }
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/consumet/episode/${provider}/${slug}/${episode}`
  )
  
  return res
}
