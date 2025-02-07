import Link from "next/link"
import Image from "next/image"
import type { AnimeDetails } from "@types"
import { Metadata } from "next"
import { DetailDescription, Character } from "@components"
import { FaExternalLinkAlt, FaHashtag, FaPlay, FaHeart } from "react-icons/fa"
import { formatDate, formatTimeUntilAiring } from "@utils"
// import { withProviderSearch } from "@utils"

const fetchDetails = async (id: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/anilist/details/${id}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    )
    
    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.error || 'Failed to fetch anime details')
    }
    
    const data = await res.json()
    if (!data) {
      throw new Error('No data returned from API')
    }
    
    return data
  } catch (error) {
    console.error('Error fetching anime details:', error)
    throw error
  }
}

type Props = {
  params: Promise<{ id: number }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  try {
    const params = await props.params;
    const anime: AnimeDetails = await fetchDetails(params.id)
    
    return {
      title: `${anime.title.english || anime.title.romaji} | lazyanime`,
      description: anime.description?.replace(/<[^>]*>/g, '').slice(0, 160) + '...',
      openGraph: {
        title: anime.title.english || anime.title.romaji || '',
        description: anime.description?.replace(/<[^>]*>/g, '').slice(0, 160) + '...',
        images: [anime.coverImage.extraLarge || ''],
      },
    }
  } catch (error) {
    return {
      title: 'Error | lazyanime',
      description: 'Failed to load anime details',
    }
  }
}

export default async function page(props: { params: Promise<{ id: number }> }) {
  try {
    const params = await props.params;
    const anime: AnimeDetails = await fetchDetails(params.id)

    if (!anime) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Anime Not Found</h1>
            <p className="text-neutral-500">The requested anime could not be found.</p>
            <Link href="/" className="btn btn-primary mt-4">
              Return Home
            </Link>
          </div>
        </div>
      )
    }

    // Filter non-anime relations
    if (anime?.relations?.edges) {
      anime.relations.edges = anime.relations.edges.filter(
        (item) => item?.node?.type === "ANIME"
      )
    }

    return (
      <div className="max-w-[1920px] mx-auto bg-base-100">
        {/* Hero Section with gradient overlay */}
        <div
          className="relative min-h-[400px] lg:min-h-[500px] p-6"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)), url(${anime.bannerImage || anime.coverImage.extraLarge})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Cover Image */}
              <div className="col-span-2 flex flex-col items-center md:items-start">
                <div className="relative w-64 md:w-full aspect-[2/3] shadow-2xl">
                  <Image
                    fill
                    className="rounded-lg object-cover"
                    src={String(anime.coverImage.extraLarge)}
                    alt={String(anime.title.english || anime.title.romaji || anime.title.native)}
                    priority
                    sizes="(max-width: 768px) 256px, (max-width: 1280px) 300px"
                  />
                </div>
              </div>

              {/* Main Info */}
              <div className="col-span-3 prose prose-lg text-neutral-100 max-w-none">
                <div className="flex flex-col gap-4">
                  {/* Title Section */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <h1 className="text-3xl font-bold mb-0 text-neutral-300">
                        {anime.title.english || anime.title.romaji}
                      </h1>
                      <Link
                        href={anime.siteUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-500"
                      >
                        <FaExternalLinkAlt />
                      </Link>
                    </div>

                    {/* Alternative Titles */}
                    {anime.title.romaji &&
                      anime?.title?.english &&
                      anime.title.romaji.replaceAll(" ", "").toLowerCase() !==
                        anime?.title?.english.replaceAll(" ", "").toLowerCase() && (
                        <h4 className="m-0 text-neutral-400 text-lg">
                          {anime.title.romaji}
                          {anime.title.native &&
                            anime.title.native.replaceAll(" ", "").toLowerCase() !==
                              anime?.title?.english?.replaceAll(" ", "").toLowerCase() &&
                            anime.title.native.replaceAll(" ", "").toLowerCase() !==
                              anime?.title?.romaji?.replaceAll(" ", "").toLowerCase() && (
                            <span className="pl-2 opacity-80">
                              • {anime.title.native}
                            </span>
                          )}
                        </h4>
                      )}
                  </div>

                  {/* Quick Stats */}
                  <div className="flex flex-wrap gap-4 items-center text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 font-bold text-lg">{anime.averageScore}</span>
                      <span className="opacity-70">Mean: {anime.meanScore}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaHeart className="text-pink-500" />
                      <span>{anime.favourites}</span>
                    </div>
                    {anime.status && (
                      <span className="badge badge-outline">{anime.status}</span>
                    )}
                    {anime.format && (
                      <span className="badge badge-outline">{anime.format}</span>
                    )}
                    {anime.episodes && (
                      <span className="badge badge-outline">
                        {anime.episodes} eps {anime.duration && `(${anime.duration} min)`}
                      </span>
                    )}
                  </div>

                  {/* Rankings Badges */}
                  {anime.rankings && anime.rankings.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {anime.rankings
                        .sort((a, b) => {
                          if (a.allTime !== b.allTime) return b.allTime ? 1 : -1;
                          return a.rank - b.rank;
                        })
                        .map((rank) => (
                          <div
                            key={rank.id}
                            className="badge badge-sm badge-primary gap-1"
                            title={`${rank.context}${rank.year ? ` (${rank.year})` : ''}${rank.season ? ` ${rank.season}` : ''}`}
                          >
                            #{rank.rank}
                            <span className="opacity-70 text-xs">
                              {rank.allTime ? 'All Time' : 'Seasonal'}
                            </span>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* Description */}
                  <DetailDescription description={anime.description as string} />

                  {/* Genres */}
                  <div className="flex flex-wrap gap-2">
                    {anime.genres.map((genre, index) => (
                      <span
                        key={`genre-${genre}-${index}`}
                        className="px-3 py-1 rounded-full bg-base-200/50 text-sm backdrop-blur-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

                  {/* Additional Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div className="space-y-2">
                      <p className="m-0">
                        <span className="font-semibold">Source:</span> {anime.source}
                      </p>
                      <p className="m-0">
                        <span className="font-semibold">Season:</span>{" "}
                        {anime.season} {anime.seasonYear}
                      </p>
                      <p className="m-0">
                        <span className="font-semibold">Start Date:</span>{" "}
                        {formatDate(anime.startDate)}
                      </p>
                      {anime.endDate.year && (
                        <p className="m-0">
                          <span className="font-semibold">End Date:</span>{" "}
                          {formatDate(anime.endDate)}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <p className="m-0">
                        <span className="font-semibold">Popularity:</span>{" "}
                        #{anime.popularity}
                      </p>
                      {anime.hashtag && (
                        <p className="m-0 flex items-center gap-2">
                          <FaHashtag className="text-blue-400" />
                          {anime.hashtag}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 mt-4">
                    {anime.trailer && (
                      <Link
                        className="btn btn-primary gap-2"
                        prefetch={false}
                        href={`https://www.${anime.trailer.site}.com/watch?v=${anime.trailer.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaPlay /> Watch Trailer
                      </Link>
                    )}
                    {anime.externalLinks && anime.externalLinks.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {anime.externalLinks.map((link) => (
                          <Link
                            key={`external-${link.id}`}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline btn-sm"
                          >
                            {link.site}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Next Episode Info */}
                  {anime.nextAiringEpisode && (
                    <div className="mt-4 p-4 bg-base-200/50 backdrop-blur-sm rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Next Episode</h3>
                      <p className="m-0">
                        Episode {anime.nextAiringEpisode.episode} airing in{" "}
                        {formatTimeUntilAiring(anime.nextAiringEpisode.timeUntilAiring || 0)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Related Anime */}
          {anime.relations &&
            anime.relations.edges &&
            anime.relations.edges.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-6 text-base-content">Related Anime</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {anime.relations.edges
                    .sort((a, b) => {
                      // Define relation type priorities
                      const relationPriority: { [key: string]: number } = {
                        'SEQUEL': 10,
                        'PREQUEL': 9,
                        'PARENT': 8,
                        'SIDE_STORY': 7,
                        'SPIN_OFF': 6,
                        'ALTERNATIVE': 5,
                        'OTHER': 4,
                        'CHARACTER': 3,
                        'SUMMARY': 2,
                        'ADAPTATION': 1
                      };

                      // Get priorities (default to 0 if not found)
                      const aPriority = relationPriority[a.relationType || ''] || 0;
                      const bPriority = relationPriority[b.relationType || ''] || 0;

                      // First, sort by relation type priority
                      if (aPriority !== bPriority) {
                        return bPriority - aPriority;
                      }

                      // Then by format (prioritize TV and MOVIE)
                      const formatPriority: { [key: string]: number } = {
                        'TV': 3,
                        'MOVIE': 2,
                        'OVA': 1,
                        'SPECIAL': 0
                      };
                      const aFormatPriority = formatPriority[a.node.format || ''] || 0;
                      const bFormatPriority = formatPriority[b.node.format || ''] || 0;
                      
                      if (aFormatPriority !== bFormatPriority) {
                        return bFormatPriority - aFormatPriority;
                      }

                      // Finally by popularity
                      return (b.node.popularity || 0) - (a.node.popularity || 0);
                    })
                    .slice(0, 3)
                    .map((edge) => (
                      <Link
                        key={`relation-${edge.node.id}`}
                        href={`/details/${edge.node.id}`}
                        className="card bg-base-200 hover:bg-base-300 transition-colors"
                      >
                        <div className="card-body p-4">
                          <div className="flex gap-4">
                            <div className="w-[60px] h-[90px] relative flex-shrink-0">
                              <Image
                                fill
                                src={edge.node.coverImage.medium || ""}
                                alt={edge.node.title.english || edge.node.title.romaji || ""}
                                className="rounded-md object-cover"
                              />
                            </div>
                            <div className="flex-grow min-w-0">
                              <h3 className="card-title text-base truncate">
                                {edge.node.title.english || edge.node.title.romaji}
                              </h3>
                              <p className="text-sm opacity-70">{edge.relationType}</p>
                              {edge.node.averageScore && (
                                <p className="text-sm">Score: {edge.node.averageScore}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
                
                {anime.relations.edges.length > 3 && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-blue-400 hover:text-blue-500">
                      Show {anime.relations.edges.length - 3} more related anime
                    </summary>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                      {anime.relations.edges.slice(3).map((edge) => (
                        <Link
                          key={`relation-${edge.node.id}`}
                          href={`/details/${edge.node.id}`}
                          className="card bg-base-200 hover:bg-base-300 transition-colors"
                        >
                          <div className="card-body p-4">
                            <div className="flex gap-4">
                              <div className="w-[60px] h-[90px] relative flex-shrink-0">
                                <Image
                                  fill
                                  src={edge.node.coverImage.medium || ""}
                                  alt={edge.node.title.english || edge.node.title.romaji || ""}
                                  className="rounded-md object-cover"
                                />
                              </div>
                              <div className="flex-grow min-w-0">
                                <h3 className="card-title text-base truncate">
                                  {edge.node.title.english || edge.node.title.romaji}
                                </h3>
                                <p className="text-sm opacity-70">{edge.relationType}</p>
                                {edge.node.averageScore && (
                                  <p className="text-sm">Score: {edge.node.averageScore}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </details>
                )}
              </section>
            )}

          {/* Characters & Staff Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* Staff & Studios */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Studios Section */}
                <section className="card bg-base-200/50 backdrop-blur-sm p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-base-content">Studios</h2>
                  {anime.mainStudios.edges.length === 0 && anime.allStudios.edges.length === 0 ? (
                    <p className="text-base-content/70 text-sm">No studios found</p>
                  ) : (
                    <ul className="list-none p-0 space-y-2">
                      {anime.mainStudios.edges.map((edge: { isMain: boolean; node: { id: number; name: string | null; siteUrl: string | null } }) => (
                        <li key={`main-studio-${edge.node.id}`} className="mb-2">
                          {edge.node.siteUrl ? (
                            <Link
                              href={edge.node.siteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-500 font-bold"
                            >
                              {edge.node.name}
                            </Link>
                          ) : (
                            <span className="font-bold">{edge.node.name}</span>
                          )}
                          <span className="text-sm opacity-70"> (Main)</span>
                        </li>
                      ))}
                      {anime.allStudios.edges
                        .filter(edge => !anime.mainStudios.edges.some(mainEdge => mainEdge.node.id === edge.node.id))
                        .map((edge: { node: { id: number; name: string | null; siteUrl: string | null } }) => (
                          <li key={`other-studio-${edge.node.id}`} className="mb-2">
                            {edge.node.siteUrl ? (
                              <Link
                                href={edge.node.siteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-500"
                              >
                                {edge.node.name}
                              </Link>
                            ) : (
                              edge.node.name
                            )}
                          </li>
                        ))}
                    </ul>
                  )}
                </section>

                {/* Staff Section */}
                <section className="card bg-base-200/50 backdrop-blur-sm p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-base-content">Staff</h2>
                  {anime.staff.edges.length === 0 ? (
                    <p className="text-base-content/70 text-sm">No staff information available</p>
                  ) : (
                    <ul className="list-none p-0 space-y-4">
                      {anime.staff.edges.slice().reverse().map((edge) => (
                        <li key={`staff-${edge.node.id}-${edge.role}`} 
                            className="flex items-center gap-4 p-3 rounded-lg bg-base-200/50 hover:bg-base-300/50 transition-colors">
                          <div className="w-12 h-12 relative flex-shrink-0">
                            {edge.node.image && (
                              <Image
                                fill
                                src={edge.node.image.large || ""}
                                alt={edge.node.name.full || ""}
                                className="rounded-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-grow min-w-0">
                            <Link
                              href={edge.node.siteUrl || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-500 block truncate font-medium"
                            >
                              {edge.node.name.full}
                            </Link>
                            <p className="text-sm opacity-70 m-0 truncate">{edge.role}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </div>
            </div>

            {/* Characters */}
            <div className="lg:col-span-2 xl:col-span-3">
              <section className="card bg-base-200/50 backdrop-blur-sm p-6">
                <h2 className="text-2xl font-semibold mb-6 text-base-content">Characters</h2>
                {anime.characters.edges.length === 0 ? (
                  <p className="text-base-content/70">No character information available</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {anime.characters.edges.map((edge) => (
                      <Character key={`character-${edge.node.id}-${edge.role}`} edge={edge} />
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>

          {/* Streaming Episodes */}
          {anime.streamingEpisodes && anime.streamingEpisodes.length > 0 && (
            <section className="card bg-base-200/50 backdrop-blur-sm">
              <div className="card-body">
                <h3 className="text-xl font-semibold mb-4">Official Streams</h3>
                <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                  {anime.streamingEpisodes.map((episode, index) => (
                    <Link
                      key={`${episode.site}-${index}`}
                      href={episode.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-2 rounded-lg hover:bg-base-300/50 transition-colors"
                    >
                      {episode.thumbnail && (
                        <Image
                          width={80}
                          height={45}
                          src={episode.thumbnail}
                          alt={episode.title}
                          className="rounded"
                        />
                      )}
                      <div className="flex-grow">
                        <p className="font-medium text-sm">{episode.title}</p>
                        <p className="text-xs text-base-content/70">{episode.site}</p>
                      </div>
                      <FaExternalLinkAlt className="text-base-content/50" />
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-neutral-500 mb-4">
            {error instanceof Error ? error.message : 'Failed to load anime details'}
          </p>
          <Link href="/" className="btn btn-primary">
            Return Home
          </Link>
        </div>
      </div>
    )
  }
}
