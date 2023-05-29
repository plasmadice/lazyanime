"use client"

import { useState } from "react"
import { Card } from "../../components"
import { Anime } from "../../types"
import { useSearch } from "@hooks"

// Generate data for search page by modifying metadata
type Props = {
  params: { query: string | undefined }
}

export default function Page({ params }: Props) {
  const query = params.query || ""
  const [searchInput, setSearchInput] = useState<string>(decodeURI(query || ""))

  let searchStr = searchInput.length ? searchInput : query.length ? query : null

  const { data, error, isLoading: loading } = useSearch(searchStr)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    history.pushState({}, "", `/search/${searchInput}`)
  }

  return (
    <div className="container mx-auto h-full pt-4">
      <form onSubmit={handleSearch} className="flex place-content-center">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border border-gray-300 ml-2 p-2 w-1/2 rounded-md my-4"
          placeholder="Search for an anime"
        />
      </form>

      <h2 className="text-xl font-normal p-4">
        {data?.length ? `${data.length >= 50 ? '51+' : data.length} ` : ''}results for: <i className="ml-1">{searchInput}</i>
      </h2>

      <div className="flex flex-wrap gap-2 px-4">
        {loading && (
          <div className="flex w-full text-lg">
            <p className="text-center">Loading...</p>
          </div>
        )}
        {error && (
          <div className="flex w-full">
            <p className="text-center">Error: {JSON.stringify(error)}</p>
          </div>
        )}
        {data?.length
          ? data?.map((anime: Anime) => (
              <Card className="mb-4" key={anime.id} anime={anime} />
            ))
          : null}
      </div>
    </div>
  )
}
