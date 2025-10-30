'use client';

import { useEffect } from 'react';

export function Spotlight() {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      document.body.style.setProperty('--spotlight-x', `${event.clientX}px`);
      document.body.style.setProperty('--spotlight-y', `${event.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return null;
}
