"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearch } from "@hooks"

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

type Props = {
  className?: string,
  drawerRef?: any
}

const HeaderSearch = ({ className, drawerRef }: Props = { className: "" }) => {
  const [searchInput, setSearchInput] = useState("")
  const [isOpen, setIsOpen] = useState(true)
  const inputRef: any = useRef(null)
  const wrapperRef: any = useRef(null)
  const searchLinkRef: any = useRef(null)
  const { data, error, isLoading: loading } = useSearch(searchInput)
  
  const searchResults = data?.slice(0, 5)

  const closeDrawer = () => {
    if (drawerRef?.current) {
      drawerRef?.current?.click()
    }
  }

  // Close search when clicked outside
  useEffect(() => {
    const handleClickOutsideDrawer = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }

    // Bind the event listener and clean up on unmount
    document.addEventListener("click", handleClickOutsideDrawer, true)
    return () => {
      document.removeEventListener("click", handleClickOutsideDrawer, true)
    }
  }, [])

  // Set focus on input when search is opened
  useEffect(() => {
    if (isOpen) {
      // inputRef?.current?.focus()
    }
  }, [isOpen])

  const handleSearchSubmit = (e: any) => {
    e.preventDefault()
    searchLinkRef?.current?.click()
    setIsOpen(false)
    closeDrawer()
  }

  return (
    <div className={`${className?.length ? ` ${className}` : ""}`}>
      <div className="relative" ref={wrapperRef}>
        <form onSubmit={(e) => handleSearchSubmit(e)}>
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            ref={inputRef}
            onChange={(e) => setSearchInput(e.target.value)}
            className="input border border-gray-300 max-h-6 w-32"
          />
        </form>
        {/* Display search results */}
        {loading ? (
          <div className="absolute left-0 w-full z-20 flex justify-center">
            <div className="ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
          </div>
        ) : searchResults && searchResults.length ? (
          <div
            className={`absolute -left-72 w-full z-20${
              !isOpen ? " hidden" : ""
            }`}
          >
            <ul
              tabIndex={0}
              className="menu shadow bg-base-300 rounded-box w-max"
            >
              {searchResults.length >= 5 && (
                <li className="text-center">
                  <Link
                    href={`/search/${searchInput}`}
                    className="text-white underline"
                    prefetch={false}
                    ref={searchLinkRef}
                  >
                    More results for {searchInput}...
                  </Link>
                </li>
              )}
              {/* Search result items */}
              {searchResults.map((anime: any) => (
                <li key={anime.id} className="max-w-md">
                  <Link
                    prefetch={false}
                    className="grid grid-cols-8"
                    href={`/details/${anime.id}`}
                  >
                    <Image
                      width={200}
                      height={300}
                      src={anime.coverImage.medium}
                      alt="anime cover"
                      className="max-w-[6rem] rounded-md col-span-2 p-0"
                    />
                    <div className="col-span-6 grid grid-rows-3">
                      <p className="text-white truncate max-w-xl">
                        {anime?.title?.english || anime?.title?.romaji}
                      </p>
                      {anime.title.romaji &&
                        anime?.title?.english &&
                        anime.title.romaji.replaceAll(" ", "").toLowerCase() !==
                          anime?.title?.english
                            .replaceAll(" ", "")
                            .toLowerCase() && (
                          <h4 className="m-0 truncate">{anime.title.romaji}</h4>
                        )}
                      <p className="text-gray-400 truncate max-w-xl">
                        {anime.averageScore} •
                        {`${anime.format}${
                          anime.format === "MOVIE"
                            ? `${anime.duration ? ` • ${anime.duration}` : ""}`
                            : `${
                                anime.episodes
                                  ? ` • ${anime.episodes} Episodes`
                                  : `${
                                      anime.duration
                                        ? ` • ${anime.duration} mins`
                                        : ""
                                    }`
                              }`
                        }`}
                      </p>
                      <p className="text-gray-400 truncate max-w-xl">
                        {formatDate(anime.startDate)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default HeaderSearch
