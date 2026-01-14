'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    // Check initial scroll position
    toggleVisibility();

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-5 z-[99999]
        w-11 h-11 rounded
        flex items-center justify-center
        bg-[#171d27] text-white
        transition-all duration-500 ease-in-out
        hover:bg-[#171d27] active:scale-95 cursor-pointer
        ${
          isVisible
            ? 'opacity-100 right-5 pointer-events-auto'
            : 'opacity-0 right-0 pointer-events-none'
        }
      `}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
