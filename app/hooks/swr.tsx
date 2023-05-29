"use client"

import {Anime} from "@types"
import { useEffect, useState } from "react"

import useSWR from "swr"

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)
  return res.json()
}

// jsdoc documentation
/**
 * @param {string} query - The search query
 * @returns {Anime[]}
 * @example
 * const { data, error, isLoading: loading } = useSearch(searchStr)
 **/
export const useSearch = (query: string | null) => {
  const [route, setRoute] = useState<string | null>(query?.length ? `/api/search/${query}` : null)

  useEffect(() => {
    const fetchResults = async () => {
      if (query && query?.length && `/api/search/${query}` !== route) {
        setRoute(`/api/search/${query}`)
      } else if (query === null) {
        setRoute(null)
      }
    }

    
    const getData = setTimeout(() => {
      fetchResults()
    }, 500)

    return () => clearTimeout(getData)
  }, [query, route])

  return useSWR<Anime[]>(
    route,
    fetcher
  ) 
}