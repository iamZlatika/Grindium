import { useEffect, useRef, useState, RefObject } from 'react';

interface UseImageOnScreenOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export function useImageOnScreen(
  options?: UseImageOnScreenOptions,
): [RefObject<HTMLDivElement | null>, boolean] {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const currentRef = containerRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);

      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
      }
    }, options);

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [options]);
  return [containerRef, isIntersecting];
}
