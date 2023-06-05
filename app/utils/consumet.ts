import { AnimeProviders } from "@types"

type Props = {
  provider: AnimeProviders
  query: string
  page?: number
}

export async function withProviderSearch({ provider, query, page }: Props) {
  if (!Object.values(AnimeProviders).includes(provider)) {
    return { error: "Invalid provider. Failure within withProviderSearch" }
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/consumet/search/${provider}/${query}/${page}`
  )
  
  return res
}

export async function withConsumetEpisodes({ provider, slug }: { provider: AnimeProviders, slug: string }) {
  if (!Object.values(AnimeProviders).includes(provider)) {
    return { error: "Invalid provider. Failure within withConsumetEpisodes" }
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/consumet/anime/${provider.toLowerCase()}/${slug}`
  )
  
  return res
}

export async function withConsumetEpisode({ provider, slug, episode }: { provider: AnimeProviders, slug: string, episode: string }) {
  if (!Object.values(AnimeProviders).includes(provider)) {
    return { error: "Invalid provider. Failure within withConsumetEpisode" }
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/consumet/episode/${provider}/${slug}/${episode}`
  )
  
  return res
}
