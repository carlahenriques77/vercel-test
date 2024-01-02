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

    const currentRef = ref.current; // Store ref.current in a variable

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []); // Empty dependency array as we only want to run this effect once

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
