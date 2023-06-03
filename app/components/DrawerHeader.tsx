"use client"

import Link from "next/link"
import HeaderSearch from "./HeaderSearch" // has an eventListener for clicks that opens the input
import DrawerSearch from "./DrawerSearch"
import { Footer } from "./"
import HeaderLinks from "./HeaderLinks"
import { useScroll, useRandomId } from "@hooks"
import { useRef, useState } from "react"

const DrawerHeader = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { isActive: hidden } = useScroll({ activeAfter: 48 })
  const drawerRef: any = useRef(null) // Passed to drawerSearch so that we can close the drawer
  const { randomId } = useRandomId()

  return (
    <div className="h-full drawer drawer-end relative">
      <input
        id="my-drawer-3"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content min-h-screen flex flex-col">
        {/* <!-- Navbar --> */}
        <header
          className={`fixed bg-base-300 top-0 left-0 z-50 max-h-12 flex w-full items-center transition-all delay-300 ease-in-out${
            hidden ? " -translate-y-12" : ""
          }`}
        >
          <div className="header-container flex-1 px-2 mx-2">
            <Link
              prefetch={false}
              className="text-flamenco-500 text-2xl font-bold select-none"
              href="/"
            >
              lazyanime
            </Link>
          </div>
          <div className="header-container flex-none hidden lg:block text-end h-full">
            <ul className="menu menu-horizontal">
              {/* <!-- Navbar menu content here --> */}
              <nav className="flex items-center">
                <HeaderSearch />
                <HeaderLinks randomId={randomId} />
              </nav>
            </ul>
          </div>
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
        </header>
        {/* <!-- Page content here --> */}

        <div className="p-0 h-full bg-base-100 relative top-12">{children}</div>

        <Footer />
      </div>
      <header className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay" ref={drawerRef}></label>
        <ul className="menu py-4 pt-16 w-1/2 bg-base-100 place-items-end h-full">
          {/* <!-- Sidebar content here --> */}
          <DrawerSearch drawerRef={drawerRef} />
          <HeaderLinks randomId={randomId} />
        </ul>
      </header>
    </div>
  )
}

export default DrawerHeader
