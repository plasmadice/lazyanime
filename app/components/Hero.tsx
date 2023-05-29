import type { Anime } from "@types"
import Link from "next/link"
import parse from "html-react-parser"

const formatDate = (date: any): string => {
  return new Date(date?.year, date?.month - 1, date?.day).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  )
}

const formatTimeUntilAiring = (time: number): string => {
  const days = Math.floor(time / (24 * 3600))
  const hours = Math.floor((time % (24 * 3600)) / 3600)

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""}`
  }
  return `${hours} hour${hours > 1 ? "s" : ""}`
}

export function Hero({
  anime,
  className,
}: {
  anime: Anime
  className?: string
}) {
  return (
    <div className={`hero container mx-auto antialiased${className ? ` ${className}` : ""}`}>
      {/* Backgrouind Hero Image */}
      <div
        className="grid grid-cols-1 md:grid-cols-5 px-6 w-full h-[30vh] md:h-full"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url(${anime.coverImage.extraLarge})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(1px)",
        }}
      ></div>
      {/* Content */}
      <div className="w-full self-end space-y-2 px-12 relative bottom-0 left-0 right-0 h-fit bg-gradient-to-t from-black to-70% to-transparent p-4">
        <h3 className="line-clamp-2 leading-tight text-white max-w-none lg:w-3/5 prose md:prose-lg lg:prose-xl">
          {anime.title.romaji || anime.title.english || anime.title.native}
        </h3>
        <p className="prose hidden sm:block text-white">
          {`${anime.format}, ${anime.duration} min, ${formatDate(
            anime.startDate
          )}`}
          {anime.nextAiringEpisode &&
            `, ep. ${
              anime.nextAiringEpisode.episode
            } drops in ${formatTimeUntilAiring(
              anime.nextAiringEpisode.timeUntilAiring as number
            )}`}
        </p>
        <p className="prose max-w-none lg:w-3/5 line-clamp-1 sm:line-clamp-2 text-white">
          {anime.description && parse(anime.description)}
        </p>
        {/* Action Links */}
        <Link
          prefetch={false}
          href={`/details/${anime.id}`}
          className="btn !normal-case font-base rounded-full"
        >
          Details
        </Link>
      </div>
    </div>
  )
}
