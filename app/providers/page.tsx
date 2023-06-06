import { Providers } from "@types"

const fetchData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/consumet/anime/speed-test`
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
  const [animepahe, enime, gogoanime, marin, zoro] = await Promise.all(
    (Object.keys(Providers) as Array<Providers>).map((provider) =>
      fetchSpeed(provider)
    )
  )
  const res = await Promise.all(
    (Object.keys(Providers) as Array<Providers>).map(async(provider) => {
      let speed = await fetchSpeed(provider)
      return { provider, ...speed }
    })
  )
  // [animepahe, enime, gogoanime, marin, zoro]
  let errors = res.filter((r) => r.error)
  let results = res.filter((r) => !r.error).sort((a, b) => a.speed - b.speed)

  console.log("results", results)
  return (
    <div className="m-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h1 className="text-3xl mb-4">Anime Speeds</h1>
      {results.map((result, index) => (
        <div key={index} className="p-4 mb-2 rounded-lg bg-white dark:bg-gray-700">
          <h2 className="text-xl font-bold">{result.provider}</h2>
          <p className="text-green-600">Speed: {result.speed}</p>
          {result.error && <p className="text-red-600">Error: {result.error}</p>}
          {result.description && <p className="text-red-600">Description: {result.description}</p>}
        </div>
      ))}
      {errors.map((result, index) => (
        <div key={index} className="p-4 mb-2 rounded-lg bg-white dark:bg-gray-700">
          <h2 className="text-xl font-bold">{result.provider}</h2>
          <p className="text-red-600">Error: {result.error}</p>
          {result.description && <p className="text-red-600">Description: {result.description}</p>}
        </div>
      ))}
    </div>
  );
}
