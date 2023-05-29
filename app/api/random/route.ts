import { NextResponse } from "next/server"
import { gql, request } from "graphql-request"
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

  return animeId
}


export async function GET(request: Request) {
  
  const results = await randomAnime()

  return NextResponse.json(results)
}
