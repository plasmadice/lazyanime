import Link from "next/link"
import { useSession } from "next-auth/react"
import { signIn, signOut } from "next-auth/react"
import { AnimeSession } from "@types"
// import { AiOutlineSetting } from "react-icons/ai"

type Props = {
  data: AnimeSession | null
}

const HeaderLinks = ({ randomId }: { randomId?: number }) => {
  const { data: session }: Props = useSession()

  return (
    <>
      <li>
        <Link
          prefetch={false}
          className="btn btn-link !m-0 !normal-case !no-underline no-animation p-2 place-content-center text-white text-base hover:text-gray-300"
          href="/"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          prefetch={false}
          className="btn btn-link !m-0 !normal-case !no-underline no-animation p-2 place-content-center text-white text-base hover:text-gray-300"
          href="/search"
        >
          Search
        </Link>
      </li>

      {randomId ? (
        <li>
          <Link
            className="btn btn-link !m-0 !normal-case !no-underline no-animation p-2 place-content-center text-white text-base hover:text-gray-300"
            href={`/details/${randomId}`}
            prefetch={false}
          >
            Random
          </Link>
        </li>
      ) : null}
      <li>
        <button
          className="btn btn-link !m-0 !normal-case !no-underline no-animation p-2 place-content-center text-white text-base hover:text-gray-300"
          onClick={() => (session ? signOut() : signIn())}
        >
          {session ? "Sign Out" : "Sign In"}
        </button>
      </li>
      {process.env.NODE_ENV === "development" ? (
        <li>
          <Link
            prefetch={false}
            className="btn btn-link !m-0 !normal-case !no-underline no-animation p-2 place-content-center text-white text-base hover:text-gray-300"
            href="/api/consumet/search/Gogoanime/naruto"
          >
            test
          </Link>
        </li>
      ) : null}
      {session?.user || !session?.user ? (
        // <Link href="/profile">
        // prefetch={false}
        <li>
          <p className="h-full">
            {session?.user?.name ? `${session?.user?.name}` : "Guest mode"}
            {session?.isAdult ? " (adult)" : ""}
            {/* <AiOutlineSetting size="2em" /> */}
          </p>
        </li>
      ) : // </Link>
      null}
    </>
  )
}

export default HeaderLinks
