import Link from "next/link"
import { AnimeSession } from "@types"

export function Footer({ session }: { session: AnimeSession | null }) {
  return (
    <footer className="mt-auto bg-base-100/80 backdrop-blur-lg border-t border-base-200/50 dark:border-gray-800/50">
      <div className="max-w-[1920px] mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link
              href="/"
              prefetch={false}
              className="text-2xl font-bold text-brand"
            >
              lazyanime
            </Link>
            <p className="text-base-content/80 text-sm">
              {new Date().getFullYear()} lazyanime.com
              <br />
              No data is stored. All information is retrieved from third parties.
              <br />
              Permissions are controlled by discord roles.
            </p>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h3 className="text-base-content font-semibold">Information</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/" prefetch={false} className="text-base-content/80 hover:text-base-content transition-colors text-sm">
                About
              </Link>
              <Link href="/" prefetch={false} className="text-base-content/80 hover:text-base-content transition-colors text-sm">
                Contact
              </Link>
              <Link
                href={`${process.env.NEXT_PUBLIC_DISCORD_SERVER_INVITE_LINK}`}
                target="_blank"
                prefetch={false}
                className={`text-base-content/80 hover:text-base-content transition-colors text-sm ${!session?.isAdult ? "text-blue-500 hover:text-blue-600" : ""}`}
              >
                Join Discord
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
