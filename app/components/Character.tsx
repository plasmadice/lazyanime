import Image from "next/image"
import type { AnimeDetails } from "@types"

export function Character({
  edge,
  className,
}: {
  edge: AnimeDetails["characters"]["edges"][0]
  className?: string
}) {
  return (
    <li
      key={edge.node.id}
      className={`flex flex-col items-center rounded-md w-auto relative${className ? ` ${className}` : ""}`}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${edge.node.image.large})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "300px", // Adjust the height as needed
      }}
    >
      <div className="flex flex-col items-center mt-2 z-10">
        <Image
          width={200}
          height={300}
          className="w-24 h-auto mb-2 rounded-md"
          src={edge.node.image.large as string}
          alt={edge.node.name.full as string}
        />
        <span>
          {edge.node.name.full} ({edge.role})
        </span>
      </div>
      {edge.voiceActors && edge.voiceActors[0] && (
        <div className="flex flex-col items-center mt-2 z-10">
          <Image
            width={200}
            height={300}
            className="w-16 h-auto mb-2 rounded-md"
            src={edge.voiceActors[0].image.large as string}
            alt={edge.voiceActors[0].name.full as string}
          />
          <span>{edge.voiceActors[0].name.full}</span>
        </div>
      )}
    </li>
  )
}
