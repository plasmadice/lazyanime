import Link from "next/link"
import { useSession } from "next-auth/react"
import { signIn, signOut } from "next-auth/react"
import { AnimeSession } from "@types"
import { FiSearch, FiShuffle, FiLogIn, FiLogOut, FiSettings } from "react-icons/fi"
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

type Props = {
  data: AnimeSession | null
}

const HeaderLinks = ({ randomId, isMobile }: { randomId?: number, isMobile?: boolean }) => {
  const { data: session }: Props = useSession()

  const linkClass = "flex items-center gap-2 px-4 py-2 hover:bg-base-200 rounded-lg transition-colors w-full"
  const dropdownItemClass = "flex items-center gap-2 px-4 py-2 hover:bg-base-200 rounded-lg transition-colors cursor-pointer w-full text-left"

  const getInitials = (name: string) => {
    return name
      ?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase() || 'G'
  }

  const links = (
    <>
      {randomId && (
        <li className={isMobile ? "w-full" : ""}>
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
    </>
  )

  const userSection = !session ? (
    <li className={isMobile ? "w-full" : ""}>
      <button
        className={linkClass}
        onClick={() => signIn()}
      >
        <FiLogIn className="h-5 w-5" />
        <span>Sign In</span>
      </button>
    </li>
  ) : isMobile ? (
    // Mobile view - show all items directly in list
    <>
      <li className="w-full">
        <div className={linkClass}>
          <div className="w-6 h-6 rounded-full bg-base-200 flex items-center justify-center">
            {getInitials(session.user?.name || 'Guest')}
          </div>
          <span>
            {session.user?.name || "Guest"}
            {session.isAdult ? " (adult)" : ""}
          </span>
        </div>
      </li>
      <li className="w-full">
        <button className={linkClass} onClick={() => signOut()}>
          <FiLogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </li>
      {process.env.NODE_ENV === "development" && (
        <li className="w-full">
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
    </>
  ) : (
    // Desktop view - use dropdown
    <li className="flex items-center gap-2">
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger asChild>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-base-200 rounded-lg transition-colors">
            <div className="w-6 h-6 rounded-full bg-base-200 flex items-center justify-center">
              {getInitials(session.user?.name || 'Guest')}
            </div>
            <span>
              {session.user?.name || "Guest"}
              {session.isAdult ? " (adult)" : ""}
            </span>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="min-w-[200px] bg-base-100 rounded-lg shadow-lg p-2 z-50">
            <DropdownMenu.Item className={dropdownItemClass} onClick={() => signOut()}>
              <FiLogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </DropdownMenu.Item>

            {process.env.NODE_ENV === "development" && (
              <DropdownMenu.Item asChild>
                <Link
                  href="/providers"
                  className={dropdownItemClass}
                  prefetch={false}
                >
                  <FiSettings className="h-5 w-5" />
                  <span>Providers</span>
                </Link>
              </DropdownMenu.Item>
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </li>
  )

  return (
    <ul className={`menu ${isMobile ? "w-full flex flex-col gap-2" : "menu-horizontal !p-0 lg:menu-horizontal flex flex-row items-center gap-1"}`}>
      {links}
      {userSection}
    </ul>
  )
}

export default HeaderLinks
