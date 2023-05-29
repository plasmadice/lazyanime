"use client"

import { useState, useEffect, useCallback, useRef } from "react";
import useDetectScroll, {
  Axis,
  Direction,
} from "@smakss/react-scroll-direction";

type ScrollProps = {
  thr?: number;
  axis?: Axis;
  scrollUp?: Direction;
  scrollDown?: Direction;
  still?: Direction;
};

interface ExtraScrollProps extends ScrollProps {
  activeAfter?: number;
}

export const useScroll = (options: ExtraScrollProps) => {
  const [isActive, setIsActive] = useState<boolean | undefined>(undefined);
  const [scrollY, setScrollY] = useState<number>(0);

  const debouncedTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  let activeAfter = options.activeAfter || 0;
  let scrollDirection = Direction.Still;

  if (typeof window !== "undefined") {
    scrollDirection = useDetectScroll(options);
  }

  const onScroll = useCallback(() => {
    if (typeof window !== "undefined") {
      if (debouncedTimeoutRef.current) {
        clearTimeout(debouncedTimeoutRef.current);
      }

      debouncedTimeoutRef.current = setTimeout(() => {
        setScrollY(window.scrollY);
      }, 200);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    }
  }, [onScroll]);

  useEffect(() => {
    if (
      !isActive &&
      scrollY > activeAfter &&
      scrollDirection === Direction.Down
    ) {
      setIsActive(true);
    } else if (isActive && scrollDirection === Direction.Up) {
      setIsActive(false);
    }
  }, [isActive, scrollY, activeAfter, scrollDirection]);

  return { scrollDirection, isActive };
};
