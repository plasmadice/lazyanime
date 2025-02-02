import { NextResponse } from "next/server"
import { request } from "graphql-request"
import { MediaSort, AnimeResponse } from "@types"
import { getCategory } from "@utils"

type Props = { params: Promise<{ sortMethod: MediaSort; quantity: number }> }

export async function GET(req: Request, props: Props) {
  const params = await props.params;
  const endpoint = process.env.GRAPHQL_API_URL
  const { sortMethod, quantity } = params

  const query = getCategory
  const variables = { sortMethod, quantity }

  let response: AnimeResponse = await request(
    endpoint as string,
    query,
    variables
  )

  return NextResponse.json(response)
}
