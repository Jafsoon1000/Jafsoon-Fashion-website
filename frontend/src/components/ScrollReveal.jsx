import { useEffect, useRef, useState } from "react";

/**
 * ScrollReveal Component
 * Wraps children in a div that toggles an 'active' class when it enters the viewport.
 */
export default function ScrollReveal({ children, className = "", threshold = 0.15 }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Set visible if intersecting, otherwise hidden (for "everytime" effect)
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold }
    );

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={domRef}
      className={`reveal ${isVisible ? "active" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
