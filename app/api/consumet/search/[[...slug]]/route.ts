import { NextResponse } from "next/server"
import { ANIME } from "@consumet/extensions"
import { Providers } from "@types"

export async function GET(request: Request, props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params;
  const provider: any = params.slug[0] || Providers.Gogoanime
  const query = params.slug[1]
  const page = Number(params.slug[2]) || 1

  if (!Object.values(Providers).includes(provider)) {
    return NextResponse.json({ error: 'Provider not found', description: `Error while searching provider: ${provider}` }, { status: 400 });
  }

  try {
    // @ts-ignore
    const providerInstance = new ANIME[provider]()
    const res = await providerInstance.search(query, page)
    return NextResponse.json(res)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message, description: `Error while searching provider: ${provider}` }, { status: 500 });
  }
}