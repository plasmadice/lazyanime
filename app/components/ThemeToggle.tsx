"use client"

import { useTheme } from "@/app/providers/ThemeProvider"
import { FiSun, FiMoon } from "react-icons/fi"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-4 py-2 hover:bg-base-200 rounded-lg transition-colors"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? (
        <>
          <FiSun className="h-5 w-5" aria-hidden="true" />
          <span className="hidden md:inline">Light mode</span>
        </>
      ) : (
        <>
          <FiMoon className="h-5 w-5" aria-hidden="true" />
          <span className="hidden md:inline">Dark mode</span>
        </>
      )}
    </button>
  )
} 