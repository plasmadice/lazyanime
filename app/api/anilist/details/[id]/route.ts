import { NextResponse } from "next/server"
import { gql, request } from "graphql-request"
import type { AnimeDetails } from "@types"

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
      bannerImage
      type
      status
      format
      episodes
      duration
      genres
      averageScore
      meanScore
      popularity
      favourites
      trending
      rankings {
        id
        rank
        type
        format
        year
        season
        allTime
        context
      }
      tags {
        id
        name
        description
        rank
        isMediaSpoiler
        isGeneralSpoiler
      }
      source
      hashtag
      siteUrl
      season
      seasonYear
      mainStudios: studios(isMain: true) {
        edges {
          isMain
          node {
            id
            name
            siteUrl
          }
        }
      }
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }
      streamingEpisodes {
        title
        thumbnail
        url
        site
      }
      externalLinks {
        id
        url
        site
        type
        language
        color
        icon
      }
      isAdult
      trailer {
        id
        site
        thumbnail
      }
      characters(sort: [ROLE, RELEVANCE, ID], perPage: 12) {
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
            siteUrl
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
            siteUrl
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
            siteUrl
            image {
              large
            }
          }
          role
        }
      }
      allStudios: studios {
        edges {
          node {
            id
            name
            siteUrl
          }
        }
      }
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
            format
            status
            averageScore
            popularity
            siteUrl
          }
          relationType
        }
      }
    }
  }
`

const ANILIST_API_URL = 'https://graphql.anilist.co'

export const details = async (id: number) => {
  try {
    if (!id || isNaN(id)) {
      throw new Error('Invalid ID provided')
    }

    // Make a test request first to check if the anime exists
    const testRes = await fetch(ANILIST_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query ($id: Int) {
            Media(id: $id, type: ANIME) {
              id
              title {
                romaji
              }
            }
          }
        `,
        variables: { id }
      })
    })

    const testData = await testRes.json()
    
    if (testData.errors) {
      throw new Error(testData.errors[0].message)
    }

    if (!testData.data?.Media) {
      throw new Error('Anime not found')
    }

    // If the test request succeeds, make the full request
    const res = await fetch(ANILIST_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: getDetails,
        variables: { id }
      })
    })

    const data = await res.json()
    
    if (data.errors) {
      throw new Error(data.errors[0].message)
    }

    if (!data.data?.Media) {
      throw new Error('Failed to fetch anime details')
    }

    return data.data.Media
  } catch (error: any) {
    console.error('Error fetching anime details:', error)
    
    if (error.response?.errors?.[0]?.message) {
      throw new Error(error.response.errors[0].message)
    } else if (error.message) {
      throw new Error(error.message)
    }
    
    throw new Error('Failed to fetch anime details')
  }
}

export async function GET(
  request: Request,
  props: {
    params: Promise<{ id: number }>
  }
) {
  try {
    const params = await props.params;
    const id = parseInt(params.id.toString(), 10)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid ID provided" },
        { status: 400 }
      )
    }

    const results = await details(id)

    if (!results) {
      return NextResponse.json(
        { error: "Anime not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(results)
  } catch (error: any) {
    console.error('Error in GET handler:', error)
    
    // Try to extract the actual error message from the GraphQL error
    let errorMessage = "Failed to fetch anime details"
    let statusCode = 500
    
    if (error.message.includes('not found')) {
      statusCode = 404
      errorMessage = error.message
    } else if (error.message.includes('Invalid')) {
      statusCode = 400
      errorMessage = error.message
    } else if (error.message) {
      errorMessage = error.message
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    )
  }
}
