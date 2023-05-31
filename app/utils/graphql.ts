import { gql, request } from "graphql-request"
import { MediaSort, AnimeDetails, AnimeResponse } from "../types"
import { type Session } from "next-auth"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

interface AnimeSession extends Session {
  isAdult?: boolean
}

const getSession = async () => {
  const session: AnimeSession | null = await getServerSession(authOptions)
  return session
}

// Home page query -- Creates anime rows
export const getCategory = gql`
  query getCategory($sortMethod: [MediaSort], $quantity: Int) {
    Page(page: 1, perPage: $quantity) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
      }
      media(type: ANIME, status: RELEASING, format: TV, sort: $sortMethod) {
        id
        title {
          romaji
          english
          native
        }
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        description
        coverImage {
          extraLarge
          large
          medium
          color
        }
        status
        format
        episodes
        duration
        genres
        averageScore
        popularity
        siteUrl
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
        isAdult
      }
    }
  }
`

// Used in /details route
const getDetails = gql`
  query getDetails($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      description
      coverImage {
        extraLarge
        large
        medium
        color
      }
      type
      status
      format
      episodes
      duration
      genres
      averageScore
      popularity
      siteUrl
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }
      isAdult
      trailer {
        id
        site
        thumbnail
      }
      characters(sort: [ROLE, RELEVANCE, ID], perPage: 10) {
        edges {
          node {
            id
            name {
              first
              last
              full
              native
            }
            image {
              large
            }
          }
          role
          voiceActors(language: JAPANESE, sort: [RELEVANCE, ID]) {
            id
            name {
              first
              last
              full
              native
            }
            image {
              large
            }
          }
        }
      }
      staff(perPage: 10) {
        edges {
          node {
            id
            name {
              first
              last
              full
              native
            }
          }
          role
        }
      }
      studios {
        edges {
          node {
            id
            name
          }
        }
      }
      # Add the relations field to retrieve related anime data
      relations {
        edges {
          node {
            id
            title {
              romaji
              english
            }
            coverImage {
              medium
            }
            averageScore
            popularity
            type
          }
          relationType
        }
      }
    }
  }
`
export const details = async (id: number) => {
  const res: { Media: AnimeDetails } = await request(
    process.env.GRAPHQL_API_URL as string,
    getDetails,
    { id }
  )
  return res?.Media
}

export const quickCategory = async (sortMethod: MediaSort) => {
  sortMethod = sortMethod || MediaSort.POPULARITY_DESC

  const res: AnimeResponse = await request(
    process.env.GRAPHQL_API_URL as string,
    getCategory,
    { sortMethod: [sortMethod], quantity: 10 }
  )
  return res?.Page?.media
}

// Used in /random page
const getRandomAnime = gql`
  query getRandomAnime($page: Int) {
    Page(page: $page) {
      media(type: ANIME) {
        id
      }
    }
  }
`
const getRandomCleanAnime = gql`
  query getRandomAnime($page: Int) {
    Page(page: $page) {
      media(type: ANIME, isAdult: false) {
        id
      }
    }
  }
`

export const randomAnime = async () => {
  const cleanRandomNumber = Math.floor(Math.random() * 344) + 1
  const randomNumber = Math.floor(Math.random() * 375) + 1
  const session = await getSession()
  const isAdultFlag = session?.isAdult || false

  const template = isAdultFlag ? getRandomAnime : getRandomCleanAnime
  const templateNumber = isAdultFlag ? randomNumber : cleanRandomNumber

  const res: any = await request(
    process.env.GRAPHQL_API_URL as string,
    template,
    { page: templateNumber }
  )

  const media = res?.Page?.media
  // retrieve a random ID from the list of IDs
  let animeId = media[Math.floor(Math.random() * media.length)].id
  console.log('animeId in randomAnime: ', animeId)

  return animeId
}

// Used in /search route and /search page
export const searchForAnime = gql`
  query searchForAnime($searchString: String) {
    Page {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
      }
      media(search: $searchString, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        description
        coverImage {
          extraLarge
          large
          medium
          color
        }
        status
        format
        episodes
        duration
        genres
        averageScore
        popularity
        siteUrl
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
        isAdult
      }
    }
  }
`

export const searchForAnimeClean = gql`
  query searchForAnime($searchString: String) {
    Page {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
      }
      media(search: $searchString, isAdult: false, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        description
        coverImage {
          extraLarge
          large
          medium
          color
        }
        status
        format
        episodes
        duration
        genres
        averageScore
        popularity
        siteUrl
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
        isAdult
      }
    }
  }
`

// Used in /search route and HeaderSearch
export const searchAnime = async (text: string) => {
  const session = await getSession()
  const isAdultFlag = session?.isAdult || false
  const template = isAdultFlag ? searchForAnime : searchForAnimeClean

  const res: AnimeResponse = await request(
    process.env.GRAPHQL_API_URL as string,
    template,
    { searchString: text, isAdult: isAdultFlag }
  )

  // Sort by popularity before returning results
  return res?.Page?.media.sort(
    (a, b) =>
      (b.popularity ? b.popularity : 0) - (a.popularity ? a.popularity : 0)
  )
}
