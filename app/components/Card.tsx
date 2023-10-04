import Link from "next/link"
import Image from "next/image"
import type { Anime } from "@types"

export function Card({
  anime,
  className,
}: {
  anime: Anime
  className?: string
}) {
  return (
    <Link
      prefetch={false}
      href={`/details/${anime.id}`}
      className={`card rounded-md cursor-pointer hover:!glass transition-all duration-300 flex-shrink-0 h-full w-48${
        className ? ` ${className}` : ""
      }`}
    >
      <div className="p-2">
        <figure>
          <Image width={200} height={300} className="aspect-[2/3] rounded-lg object-cover" src={anime.coverImage.extraLarge as string} alt={anime.title.english || (anime.title.romaji as string)} />
        </figure>
        <div className="card-body !pb-0 !pt-4 !px-0">
          <p className="card-title line-clamp-2 text-base antialiased">
            {anime.title.english || anime.title.romaji}
          </p>

          <div>
            <p className="text-gray-400 truncate max-w-xl">
              {`${anime.format}${
                anime.format === "MOVIE"
                  ? `${anime.duration ? ` • ${anime.duration}` : ""}`
                  : `${
                      anime.episodes
                        ? ` • ${anime.episodes} Episodes`
                        : `${anime.duration ? ` • ${anime.duration} mins` : ""}`
                    }`
              }`}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
