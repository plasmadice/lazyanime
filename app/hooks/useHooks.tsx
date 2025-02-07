import React from "react";

// import { useClickAway } from "@uidotdev/usehooks";

// Polyfill for experimental react feature
const useEffectEvent = (callback: any) => {
  const ref = React.useRef(callback);

  ref.current = callback;

  return (...args: any) => {
    ref.current(...args);
  }
}

// Definitely doesn't work in nextjs by default due to compiler 'attempting' server-side rendering by default in development
function getEnvironment() {
  const isDOM =
    typeof window !== "undefined" &&
    window.document &&
    window.document.documentElement;

  return isDOM ? "browser" : "server";
}

export function useClickAway(cb: (e: Event) => void) {
  const ref = React.useRef(null);
  const refCb = React.useRef(cb);

  React.useEffect(() => {
    // Handle mousedown from React event
    const handler = (e: any) => {
      const element: any = ref.current;
      if (element && !element.contains(e.target)) {
        refCb.current(e);
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  return ref;
}

export function useSessionStorage(key: any, initialValue: any) {
  // if (getEnvironment() === "server") {
  //   throw Error("useSessionStorage is a client-side only hook.");
  // }

  const readValue = React.useCallback(() => {
    try {
      const item = typeof window !== "undefined" && window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [localState, setLocalState] = React.useState(readValue);

  const handleSetState = React.useCallback(
    (value: any) => {
      try {
        const nextState =
          typeof value === "function" ? value(localState) : value;
          typeof window !== "undefined" && window.sessionStorage.setItem(key, JSON.stringify(nextState));
        setLocalState(nextState);
        typeof window !== "undefined" && window.dispatchEvent(new Event("session-storage"));
      } catch (e) {
        console.warn(e);
      }
    },
    [key, localState]
  );

  

  const onStorageChange = useEffectEvent((event: any) => {
    if (event?.key && event.key !== key) {
      return;
    }

    setLocalState(readValue());
  });

  React.useEffect(() => {
    typeof window !== "undefined" && window.addEventListener("session-storage", onStorageChange);

    return () => {
      typeof window !== "undefined" && window.removeEventListener("session-storage", onStorageChange);
    };
  }, [onStorageChange]);

  return [localState, handleSetState];
}

export function useKeyPress(key: any, cb: any, options: any = {}) {
  const { event = "keydown", target = window ?? null, eventOptions } = options;
  const eventOptionsRef = React.useRef(eventOptions);

  const onEvent = useEffectEvent((event: any) => {
    if (event.key === key) {
      cb(event);
    }
  });

  React.useEffect(() => {
    if (!target) return;
    target.addEventListener(event, onEvent, eventOptionsRef.current);

    return () => {
      target.removeEventListener(event, onEvent);
    };
  }, [target, event]);
}