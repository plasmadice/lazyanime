"use client"

import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import HeaderSearch from "./HeaderSearch"
import HeaderLinks from "./HeaderLinks"
import DrawerSearch from "./DrawerSearch"
import { useRandomId } from "@hooks"

export default function Navbar() {
  const drawerRef = useRef<HTMLLabelElement>(null)
  const { randomId } = useRandomId()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  // Handle escape key to close drawer
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen && !e.defaultPrevented) {
        closeDrawer()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isDrawerOpen])

  return (
    <div className="drawer drawer-end">
      <input
        id="navbar-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={toggleDrawer}
      />
      
      {/* Navbar */}
      <div className="drawer-content flex flex-col">
        <div className="navbar !p-0 bg-base-300 fixed top-0 z-50">
          <div className="navbar-start px-4">
            <Link
              href="/"
              className="text-flamenco-500 text-2xl font-bold select-none"
              prefetch={false}
            >
              lazyanime
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="navbar-end px-4">
            <div className="hidden lg:flex items-center gap-2">
              <HeaderSearch />
              <HeaderLinks randomId={randomId} />
            </div>
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <label htmlFor="navbar-drawer" className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Drawer */}
      <div className="drawer-side z-50">
        <label
          ref={drawerRef}
          htmlFor="navbar-drawer"
          className="drawer-overlay"
          aria-label="Close menu"
        ></label>
        <div className="menu p-4 w-80 min-h-full bg-base-100">
          <div className="mt-16 flex flex-col gap-4">
            <DrawerSearch drawerRef={drawerRef} />
            <HeaderLinks randomId={randomId} isMobile={true} />
          </div>
        </div>
      </div>
    </div>
  )
} 