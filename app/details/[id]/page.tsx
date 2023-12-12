import Link from "next/link"
import Image from "next/image"
import type { AnimeDetails } from "@types"
import { Metadata } from "next"
import { DetailDescription, Character } from "@components"
// import { withProviderSearch } from "@utils"

const fetchDetails = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/anilist/details/${id}`
  )
  return await res.json()
}

type Props = {
  params: { id: number }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // fetch data

  const anime: AnimeDetails = await fetchDetails(params.id)
  return {
    title: `${anime.title.english || anime.title.romaji} | lazyanime`,
  }
}

export default async function page({ params }: { params: { id: number } }) {
  const anime: AnimeDetails = await fetchDetails(params.id)

  if (!anime) {
    return <div>Loading...</div>
  } else {
    // This filters out all NON-anime from Related Anime
    if (anime && anime.relations && anime.relations.edges) {
      anime.relations.edges = anime?.relations.edges.filter(
        (item: any) => item?.node?.type === "ANIME"
      )
    }
  }

  return (
    <div className="max-w-full mx-auto bg-base-100">
      <div
        className="grid grid-cols-1 md:grid-cols-5 mb-6 p-6 mx-auto"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgb(0, 0, 0, 0.7), rgb(0, 0, 0, 0.7)), url(${anime.coverImage.extraLarge})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Image
          width={200}
          height={300}
          className="w-10/12 max-w-md rounded-lg col-span-2 justify-self-center"
          src={String(anime.coverImage.extraLarge)}
          alt={String(
            anime.title.english || anime.title.romaji || anime.title.native
          )}
          priority
        />
        <div className="col-span-3 prose text-neutral-300">
          <div>
            <h1 className="text-3xl font-bold mb-0 mt-6 md:mt-0 text-neutral-300">
              {anime.title.english || anime.title.romaji}
            </h1>
            {anime.title.romaji &&
              anime?.title?.english &&
              anime.title.romaji.replaceAll(" ", "").toLowerCase() !==
                anime?.title?.english.replaceAll(" ", "").toLowerCase() && (
                <h4 className="m-0 text-neutral-300">
                  {anime.title.romaji}
                  {anime.title.native &&
                    anime.title.native.replaceAll(" ", "").toLowerCase() !==
                      anime?.title?.english
                        ?.replaceAll(" ", "")
                        .toLowerCase() &&
                    anime.title.native.replaceAll(" ", "").toLowerCase() !==
                      anime?.title?.romaji
                        ?.replaceAll(" ", "")
                        .toLowerCase() && (
                      <span className="pl-2 text-base-content">
                        {anime.title.romaji ? "• " : null}
                        {anime.title.native}
                      </span>
                    )}
                </h4>
              )}
          </div>
          <DetailDescription description={anime.description as string} />

          <div className="grid grid-cols-2 pt-8 gap-8">
            <div>
              <p className="m-0">Score: {anime.averageScore}</p>
              <p className="m-0">Status: {anime.status}</p>
              <p className="m-0">Format: {anime.format}</p>
              <p className="m-0">Episodes: {anime.episodes}</p>
              <p className="m-0">Genres: {anime.genres.join(", ")}</p>
            </div>
            <div>
              <p>
                Start Date: {anime.startDate.year}-{anime.startDate.month}-
                {anime.startDate.day}
              </p>
              {anime.endDate.year && (
                <p className="m-0">
                  End Date: {anime.endDate.year}-{anime.endDate.month}-
                  {anime.endDate.day}
                </p>
              )}
              <div>
                {anime.trailer && (
                  <Link
                    className="text-blue-400 hover:text-blue-500 no-underline"
                    prefetch={false}
                    href={`https://www.${anime.trailer.site}.com/watch?v=${anime.trailer.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch Trailer
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Related Anime */}
          {anime.relations &&
            anime.relations.edges &&
            anime.relations.edges.length > 0 && (
              <div className="mt-2 prose">
                <h2 className="text-neutral-300 font-normal">Related Anime</h2>
                <ul className="flex flex-col gap-4 max-h-48 h-min overflow-y-auto">
                  {anime.relations.edges.map((edge) => (
                    <li
                      key={edge.node.id}
                      className="mb-1 list-none items-center"
                    >
                      <Link
                        prefetch={false}
                        className="items-center no-underline text-neutral-300"
                        href={`/details/${edge.node.id}`}
                      >
                        {edge.relationType}:{" "}
                        {edge.node.title.english || edge.node.title.romaji}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      </div>

      {/* Studios / Staff / Characters */}
      <div className="grid md:grid-cols-6 gap-4 text-neutral-300">
        <div className="grid grid-cols-1 pl-16 col-span-1 w-full">
          <div className="mb-6 prose">
            <h2 className="text-base-content font-normal mb-2">Studios</h2>
            <ul className="list-none">
              {anime.studios.edges.map((edge) => (
                <li key={edge.node.id} className="mb-1">
                  {edge.node.name}
                </li>
              ))}
            </ul>
            <h2 className="text-base-content font-normal mb-2">Staff</h2>
            <ul className="list-none">
              {anime.staff.edges.map((edge, index) => (
                <li key={index} className="mb-1">
                  {edge.node.name.full} ({edge.role})
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-6 prose"></div>
        </div>
        <div className="mb-6 w-full col-span-1 md:col-span-5">
          <h2 className="text-base-content font-normal mx-8 mb-4 ml-16 prose">
            Characters
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-16">
            {anime.characters.edges.map((edge) => (
              <Character key={edge.node.id} edge={edge} />
            ))}
          </ul>
        </div>
      </div>

      {/* Episodes */}
      {/* <div className="grid grid-cols-1 md:grid-cols-5 mb-6 p-6 mx-auto">
        <div className="col-span-3 prose">
          <h2 className="text-base font-normal mb-2">Episodes</h2>
          <ul className="list-none">
            {anime.streamingEpisodes.map((episode) => (
              <li key={episode.title} className="mb-1">
                {episode.title}
              </li>
            ))}
          </ul>
        </div>
      </div> */}
    </div>
  )
}
