import debounce from "lodash/debounce";
import { useEffect, useMemo, useRef } from "react";

export const useDebounce = (callback: any, time = 300): any => {
  const ref = useRef<(...args: any) => void>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = (...args: any[]) => {
      ref?.current?.(...args);
    };

    return debounce(func, time);
  }, []);

  return debouncedCallback;
};
