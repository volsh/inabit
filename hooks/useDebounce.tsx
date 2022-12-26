import {useState, useEffect, useRef} from "react";

const useDebounce = (searchTerm: string, delay = 500) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  useEffect(() => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, delay);
  }, [searchTerm]);
  return debouncedTerm;
};

export default useDebounce;
