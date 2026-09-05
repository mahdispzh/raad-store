import React, { useCallback, useEffect, useRef } from "react";

interface InfiniteScrollProps<T> {
  data: T[];
  hasMore: boolean;
  loading: boolean;
  error?: string | null;
  loadMore: () => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

function InfiniteScroll<T>({
  data,
  hasMore,
  loading,
  error,
  loadMore,
  renderItem,
  className,
}: InfiniteScrollProps<T>) {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          const firstEntry = entries[0];
          if (firstEntry && firstEntry.isIntersecting && hasMore && !loading) {
            loadMore();
          }
        },
        { threshold: 1, rootMargin: "200px" },
      );
      observer.current.observe(node);
    },
    [loading, hasMore, loadMore],
  );

  useEffect(() => {
    if (data.length === 0 && !loading) {
      loadMore();
    }
    // eslint-disable-next-line react-_hooks/exhaustive-deps
  }, []);

  return (
    <div className={className}>
      {data.map((item, index) => {
        const isLast = index === data.length - 1;
        return (
          <div key={index} ref={isLast ? lastElementRef : null}>
            {renderItem(item, index)}
          </div>
        );
      })}
      {loading && (
        <div className="col-span-full flex justify-center py-8">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-danger" />
        </div>
      )}
      {error && (
        <div className="col-span-full py-3 text-center text-sm text-red-500">
          {error}
        </div>
      )}
      {!hasMore && data.length > 0 && (
        <div className="col-span-full py-3 text-center text-sm text-gray-400">
          تمام محصولات نمایش داده شد
        </div>
      )}
    </div>
  );
}

export default InfiniteScroll;
