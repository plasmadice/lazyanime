import Image from "next/image"
import Link from "next/link"
import type { AnimeDetails } from "@types"

export function Character({
  edge,
  className,
}: {
  edge: AnimeDetails["characters"]["edges"][0]
  className?: string
}) {
  return (
    <div
      className={`flex flex-col rounded-lg overflow-hidden bg-base-200 hover:bg-base-300 transition-colors${className ? ` ${className}` : ""}`}
    >
      <div className="relative aspect-[2/3] w-full">
        <Image
          fill
          className="object-cover"
          src={edge.node.image.large as string}
          alt={edge.node.name.full as string}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="p-4">
        <div className="mb-4">
          <Link
            href={edge.node.siteUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-400 hover:text-blue-500"
          >
            {edge.node.name.full}
          </Link>
          <p className="text-sm opacity-70 m-0">{edge.role}</p>
        </div>

        {edge.voiceActors && edge.voiceActors[0] && (
          <div className="flex items-center gap-3">
            <Image
              width={40}
              height={40}
              className="rounded-full"
              src={edge.voiceActors[0].image.large as string}
              alt={edge.voiceActors[0].name.full as string}
            />
            <div>
              <Link
                href={edge.voiceActors[0].siteUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-500"
              >
                {edge.voiceActors[0].name.full}
              </Link>
              <p className="text-xs opacity-70 m-0">Voice Actor</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
