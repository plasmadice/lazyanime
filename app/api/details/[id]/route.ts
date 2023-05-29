import { NextResponse } from "next/server"
import { gql, request } from "graphql-request"
import type { AnimeDetails } from "../../../types"

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

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { id: number }
  }
) {
  const results = await details(params.id)

  return NextResponse.json(results)
}
