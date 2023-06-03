import React from "react";

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

function getEnvironment() {
  const isDOM =
    typeof window !== "undefined" &&
    window.document &&
    window.document.documentElement;

  return isDOM ? "browser" : "server";
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

  const useEffectEvent = (callback: any) => {
    const ref = React.useRef(callback);
  
    ref.current = callback;
  
    return (...args: any) => {
      ref.current(...args);
    }
  }

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