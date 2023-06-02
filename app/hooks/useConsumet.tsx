import Gogoanime from "@consumet/extensions/dist/providers/anime/gogoanime"
// import nineanime from "@consumet/extensions/dist/providers/anime/9anime"
// import Crunchyroll from "@consumet/extensions/dist/providers/anime/crunchyroll"
// import Animepahe from "@consumet/extensions/dist/providers/anime/animepahe"
// import Zoro from "@consumet/extensions/dist/providers/anime/zoro"
// import Animefox from "@consumet/extensions/dist/providers/anime/animefox"
// import Enime from "@consumet/extensions/dist/providers/anime/enime"
// import Bilibili from "@consumet/extensions/dist/providers/anime/bilibili"
// import Marin from "@consumet/extensions/dist/providers/anime/marin"

export async function useConsumetSearch(query: string) {

  const gogoanime = new Gogoanime()
  const res = await gogoanime.search(query)
  return res
}
