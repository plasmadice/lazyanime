import { Metadata } from "next"

type Props = {
  params: Promise<{ query: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  // const anime: AnimeDetails = await fetchDetails(params.id)
  return {
    title: `Search ${params.query ? ` - ${params.query}` : ""} | lazyanime`,
  }
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-[70vh] bg-base-100">{children}</div>
}
