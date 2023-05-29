import { Card } from "."
import type { Anime } from "@types"

export function Row({
  animes,
  className = "",
  rowName = "",
}: {
  animes: Anime[]
  className?: string
  rowName: string
}) {
  return (
    <div className="my-4">
      <h2 className="text-xl font-normal pl-6 py-2 select-none">{rowName}</h2>
      <div
        className={`h-full${
          className.length ? ` ${className}` : ""
        }`}
      >
        <div className="flex pl-4 space-x-4 h-full overflow-x-scroll">
          {animes.map((item: Anime) => (
            <Card key={item.id} anime={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
