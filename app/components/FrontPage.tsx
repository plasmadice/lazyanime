import { MediaSort, Anime } from "@types"
import { Row, Hero } from "./"

const getMedia = async (sortMethod: MediaSort, quantity: number = 10) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/data/${sortMethod}/${quantity}`
  )

  const data = await res.json()
  return await data?.Page?.media
}

// @ts-expect-error Server Component
const FrontPage = async (): any => {

  const [popular, trending, top, recent]: Anime[][] = await Promise.all([
    getMedia(MediaSort.POPULARITY_DESC),
    getMedia(MediaSort.TRENDING_DESC),
    getMedia(MediaSort.SCORE_DESC),
    getMedia(MediaSort.UPDATED_AT_DESC),
  ])

  return (
    <div className="bg-base-100">
      <Hero anime={trending[1]} />
      <div className="container mx-auto px-4">
        <Row animes={popular} rowName="Popular" />
        <Row animes={trending} rowName="Trending" />
        <Row animes={top} rowName="Top Rated" />
        <Row animes={recent} rowName="Recently Updated" />
      </div>
    </div>
  )
}

export default FrontPage
