import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import React, { useRef } from 'react';

const MAX_HEIGHT = 200;
const MIN_HEIGHT = 100;

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  useScrollPosition(({ currPos }) => {
    let size = MAX_HEIGHT + currPos.y;
    if (size < MIN_HEIGHT) size = MIN_HEIGHT;
    if (headerRef.current) {
      headerRef.current.setAttribute('style', `height:${size}px`);
    }
  }, [])

  return (
    <div ref={headerRef} style={{height: MAX_HEIGHT }} className="w-full fixed bg-green-400 flex gap-x-10 items-center">
      <img src="https://prod-static.chronocarpe.com/nd/img/fr/logo_chrono_1202.jpg" />
      <img width={30} height={30} src="https://prod-static.chronocarpe.com/nd/img/common/home-icon.png" alt="Home" />
    </div>
  );
}
