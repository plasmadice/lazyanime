import Link from "next/link"
import { useSession } from "next-auth/react"
import { signIn, signOut } from "next-auth/react"
import { AnimeSession } from "@types"
import { FiHome, FiSearch, FiShuffle, FiLogIn, FiLogOut, FiSettings, FiUser } from "react-icons/fi"

type Props = {
  data: AnimeSession | null
}

const HeaderLinks = ({ randomId }: { randomId?: number }) => {
  const { data: session }: Props = useSession()

  const linkClass = "flex items-center gap-2 px-4 py-2 hover:bg-base-200 rounded-lg transition-colors"

  return (
    <ul className="menu menu-horizontal lg:menu-horizontal gap-1">
      <li>
        <Link
          href="/"
          className={linkClass}
          prefetch={false}
        >
          <FiHome className="h-5 w-5" />
          <span>Home</span>
        </Link>
      </li>
      <li>
        <Link
          href="/search"
          className={linkClass}
          prefetch={false}
        >
          <FiSearch className="h-5 w-5" />
          <span>Search</span>
        </Link>
      </li>

      {randomId && (
        <li>
          <Link
            href={`/details/${randomId}`}
            className={linkClass}
            prefetch={false}
          >
            <FiShuffle className="h-5 w-5" />
            <span>Random</span>
          </Link>
        </li>
      )}

      <li>
        <button
          className={linkClass}
          onClick={() => (session ? signOut() : signIn())}
        >
          {session ? (
            <>
              <FiLogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </>
          ) : (
            <>
              <FiLogIn className="h-5 w-5" />
              <span>Sign In</span>
            </>
          )}
        </button>
      </li>

      {process.env.NODE_ENV === "development" && (
        <li>
          <Link
            href="/providers"
            className={linkClass}
            prefetch={false}
          >
            <FiSettings className="h-5 w-5" />
            <span>Providers</span>
          </Link>
        </li>
      )}

      <li>
        <div className={`${linkClass} cursor-default`}>
          <FiUser className="h-5 w-5" />
          <span className="truncate max-w-[150px]">
            {session?.user?.name || "Guest mode"}
            {session?.isAdult ? " (adult)" : ""}
          </span>
        </div>
      </li>
    </ul>
  )
}

export default HeaderLinks
