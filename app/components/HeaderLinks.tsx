import Link from "next/link"
import { useSession } from "next-auth/react"
import { signIn, signOut } from "next-auth/react"
import { AnimeSession } from "@types"

type Props = {
  data: AnimeSession | null
}

const HeaderLinks = ({ randomId }: { randomId?: number}) => {
  const { data: session}: Props = useSession()

  return (
    <>
      <li>
        <Link
          prefetch={false}
          className="btn btn-link !m-0 !normal-case !no-underline no-animation px-2 !h-2 text-white text-base hover:text-gray-300"
          href="/"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          prefetch={false}
          className="btn btn-link !m-0 !normal-case !no-underline no-animation px-2 !h-2 text-white text-base hover:text-gray-300"
          href="/search"
        >
          Search
        </Link>
      </li>

      {randomId ? (
        <li>
        <Link
          className="btn btn-link !m-0 !normal-case !no-underline no-animation px-2 !h-2 text-white text-base hover:text-gray-300"
          href={`/details/${randomId}`}
          prefetch={false}
        >
          Random
        </Link>
      </li>
      ) : null}
      <li>
        <button
          className="btn btn-link !m-0 !normal-case !no-underline no-animation px-2 !h-2 text-white text-base hover:text-gray-300"
          onClick={() => (session ? signOut() : signIn())}
        >
          {session ? "Sign Out" : "Sign In"}
        </button>
      </li>
      {session?.user || !session?.user ? (
        <li>
          <p className="select-none !m-0 px-2">
            {session?.user?.name
              ? `Signed in as ${session?.user?.name}`
              : "Guest mode"}{session?.isAdult ? " (Adult)" : ""}
          </p>
        </li>
      ) : null}
    </>
  )
}

export default HeaderLinks
