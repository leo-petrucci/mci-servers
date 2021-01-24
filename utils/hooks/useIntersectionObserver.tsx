import React from 'react';
import { FetchNextPageOptions, InfiniteQueryObserverResult } from 'react-query';

export default function useIntersectionObserver({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
  enabled = true,
}: {
  root?: any;
  target: React.MutableRefObject<any>;
  onIntersect: (
    options?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<any, unknown>>;
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}): any {
  React.useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      }
    );

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    // eslint-disable-next-line consistent-return
    return () => {
      observer.unobserve(el);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.current, enabled]);
}
