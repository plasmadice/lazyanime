/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { useState, useEffect, useCallback, useRef } from "react"

type ScrollProps = {
  thr?: number
  axis?: "x" | "y"
  scrollUp?: number
  scrollDown?: number
  still?: number
}

interface ExtraScrollProps extends ScrollProps {
  activeAfter?: number
}

export const useScroll = (options: ExtraScrollProps) => {
  const [isActive, setIsActive] = useState<boolean | undefined>(undefined)
  const [scrollY, setScrollY] = useState<number>(0)
  const debouncedTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  let activeAfter = options.activeAfter || 0
  let scrollDirection = options.still || 0

  useEffect(() => {
    const onScroll = () => {
      const { thr = 0, axis = "y", scrollUp = -1, scrollDown = 1, still = 0 } = options
      const scrollY = window.scrollY
      const direction = axis === "y" ? (scrollY > debouncedScrollY.current ? scrollDown : scrollUp) : still
      debouncedScrollY.current = scrollY
      if (Math.abs(direction) > thr) {
        setIsActive(true)
        debouncedTimeoutRef.current && clearTimeout(debouncedTimeoutRef.current)
        debouncedTimeoutRef.current = setTimeout(() => {
          setIsActive(false)
        }, activeAfter)
      }
    }

    const debouncedScrollY = { current: 0 }
    window.addEventListener("scroll", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      debouncedTimeoutRef.current && clearTimeout(debouncedTimeoutRef.current)
    }
  }, [options, activeAfter])

  return { isActive, scrollY }
}