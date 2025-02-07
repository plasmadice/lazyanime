"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearch } from "@hooks"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

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

const DrawerSearch = ({ className, drawerRef }: Props = { className: "" }) => {
  const [searchInput, setSearchInput] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef: any = useRef(null)
  const wrapperRef: any = useRef(null)
  const searchLinkRef: any = useRef(null)
  const router = useRouter()
  const { data, error, isLoading: loading } = useSearch(searchInput)
  
  const searchResults = data?.slice(0, 5)

  // Calculate position for search results
  const [resultsPosition, setResultsPosition] = useState<'below' | 'above'>('below')
  
  const closeDrawer = () => {
    if (drawerRef?.current) {
      drawerRef?.current?.click()
    }
  }

  const resetSearch = () => {
    setSearchInput("")
    setIsOpen(false)
    setSelectedIndex(-1)
    closeDrawer()
  }

  // Focus input when clicked
  const handleInputClick = () => {
    setIsOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
    setIsOpen(true)
  }

  // Close search when clicked outside
  useEffect(() => {
    const handleClickOutsideDrawer = (event: any) => {
      if (
        wrapperRef.current && 
        !wrapperRef.current.contains(event.target) &&
        !event.target.closest('.menu')
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutsideDrawer)
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDrawer)
    }
  }, [])

  // Handle global escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !e.defaultPrevented) {
        // Only close if we're not focused on the input
        if (document.activeElement !== inputRef.current) {
          resetSearch()
        }
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!searchResults?.length) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex(prev => (prev > -1 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex === -1) {
          searchLinkRef?.current?.click()
        } else {
          const selectedAnime = searchResults[selectedIndex]
          if (selectedAnime) {
            router.push(`/details/${selectedAnime.id}`)
            resetSearch()
          }
        }
        break
      case "Escape":
        e.preventDefault()
        if (searchInput) {
          // If there's text, first clear the input
          setSearchInput("")
          setSelectedIndex(-1)
        } else {
          // If input is already empty, close the search
          resetSearch()
        }
        break
    }
  }

  const handleSearchSubmit = (e: any) => {
    e.preventDefault()
    searchLinkRef?.current?.click()
    resetSearch()
  }

  const handleResultClick = () => {
    resetSearch()
  }

  useEffect(() => {
    if (!wrapperRef.current || !searchResults?.length) return

    const updatePosition = () => {
      const rect = wrapperRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top
      const resultsHeight = 400 // approximate max height of results

      setResultsPosition(spaceBelow >= resultsHeight || spaceBelow > spaceAbove ? 'below' : 'above')
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    return () => window.removeEventListener('resize', updatePosition)
  }, [searchResults?.length])

  useEffect(() => {
    if (isOpen) {
      resetSearch()
    }
  }, [isOpen, resetSearch])

  return (
    <div className={`${className?.length ? ` ${className}` : ""} w-full px-4`}>
      <div className="relative w-full" ref={wrapperRef}>
        <form onSubmit={handleSearchSubmit}>
          <AnimatePresence>
            <motion.div
              initial={{ width: "32px" }}
              animate={{ width: "100%" }}
              exit={{ width: "32px" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <input
                type="text"
                placeholder="Search"
                value={searchInput}
                ref={inputRef}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onClick={handleInputClick}
                className="input border border-gray-300 max-h-6 w-full"
              />
            </motion.div>
          </AnimatePresence>
        </form>
        {/* Display search results */}
        {loading ? (
          <div className="absolute left-0 w-full z-20 flex justify-center">
            <div className="ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
          </div>
        ) : searchResults && searchResults.length && isOpen ? (
          <div
            className={`absolute w-full z-20 ${
              resultsPosition === 'above' ? 'bottom-full mb-1' : 'top-full mt-1'
            }`}
          >
            <ul
              tabIndex={0}
              className="menu shadow bg-base-300 rounded-box w-full max-h-[60vh] overflow-y-auto"
            >
              {searchResults.length >= 5 && (
                <li className="text-center">
                  <Link
                    href={`/search/${searchInput}`}
                    className="text-base-content underline"
                    prefetch={false}
                    ref={searchLinkRef}
                    onClick={handleResultClick}
                  >
                    More results for {searchInput}...
                  </Link>
                </li>
              )}
              {/* Search result items */}
              {searchResults.map((anime: any, index: number) => (
                <li 
                  key={anime.id} 
                  className={`w-full ${selectedIndex === index ? "bg-base-200" : ""}`}
                >
                  <Link
                    prefetch={false}
                    className="grid grid-cols-8 gap-2"
                    href={`/details/${anime.id}`}
                    onClick={handleResultClick}
                  >
                    <Image
                      width={200}
                      height={300}
                      src={anime.coverImage.medium}
                      alt="anime cover"
                      className="w-full rounded-md col-span-2 aspect-[2/3] object-cover"
                    />
                    <div className="col-span-6 grid grid-rows-3">
                      <p className="text-white truncate max-w-full">
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
                      <p className="text-gray-400 truncate max-w-full">
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
                      <p className="text-gray-400 truncate max-w-full">
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

export default DrawerSearch
