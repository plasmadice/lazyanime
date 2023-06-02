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
// export async function search(query: string) {
//   const gogoanime = new ANIME.Gogoanime()
//   const res = await gogoanime.search(query)
//   console.log('res in snack', res)
//   return res
// }


// // function that accepts an anime id and searches for it on a dynamically chosen provider
// export async function providerQuery(provider: string, query: string) {
//   if (!(provider in ANIME)) {
//     throw new Error(`Provider ${provider} not found in ANIME`)
//   }

//   // @ts-ignore
//   const providerInstance = new ANIME[provider]()
//   const res = await providerInstance.search(query)
//   return res
// }