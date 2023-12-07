// LazyLoadComponent.js
import React, { useEffect, useRef, useState } from "react";

const ComponentWithLazyLoad = ({ lazyComponent }) => {
  const ref = useRef();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.9 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref}>
      {inView && (
        <React.Suspense fallback={<div>Loading...</div>}>
          {lazyComponent}
        </React.Suspense>
      )}
    </div>
  );
};

const LazyLoadComponent = ({ lazyComponent }) => (
  <ComponentWithLazyLoad lazyComponent={lazyComponent} />
);

export default LazyLoadComponent;
