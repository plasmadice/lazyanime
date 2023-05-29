import { NextResponse } from "next/server"
import { AnimeResponse } from "@types"

type Props = { params: { query: string; quantity: number } }

export async function GET(
  req: Request,
  { params }: Props
) {
  return NextResponse.json({})
}

// import { PROVIDERS_LIST, ANIME } from '@consumet/extensions'

// export function getProviders() {
//   const providerList = PROVIDERS_LIST.ANIME.filter(
//     (provider: any) => provider.isWorking
//   ).map((provider: any) => provider.name)

//   return providerList
// }

// export function getProvider(providerName: string) {
//   const provider = PROVIDERS_LIST.ANIME.filter(
//     (provider: any) => provider.name === providerName
//   )[0]

//   return provider
// }

// // Create a new instance of the Gogoanime provider and return the top airing anime
// export async function getTopAiring(page: number = 1) {
//   const gogoanime = new ANIME.Gogoanime()
//   return await gogoanime.fetchTopAiring(page)
// }

// // function that accepts an anime id and searches for it on gogoanime
// export async function search(id: string) {
//   const gogoanime = new ANIME.Gogoanime()
//   return await gogoanime.search(id)
// }
