import { Providers } from "@types"

const fetchData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/consumet/anime/speed-test`,
  )
  return await res.json()
}

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


export default async function page() {
  const [animepahe, enime, gogoanime, marin, zoro] = await Promise.all((Object.keys(Providers) as Array<Providers>).map(provider => fetchSpeed(provider)));

  console.log('animepahe', animepahe)
  console.log('enime', enime)
  console.log('gogoanime', gogoanime)
  console.log('marin', marin)
  console.log('zoro', zoro)
  // const speeds: AnimeSpeeds = await fetchData()
  // console.log('speeds', speeds)
  
  // const providerList = (Object.keys(Providers) as Array<Providers>)

  // display anime speeds
  return (
    <div>
      <h1>Anime Speeds</h1>
      <div>AnimePahe: {JSON.stringify(animepahe)}</div>
      <div>Enime: {JSON.stringify(enime)}</div>
      <div>Gogoanime: {JSON.stringify(gogoanime)}</div>
      <div>Marin: {JSON.stringify(marin)}</div>
      <div>Zoro: {JSON.stringify(zoro)}</div>
    </div>
  )
}
