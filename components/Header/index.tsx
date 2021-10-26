import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import React, { useRef } from 'react';
import Image from 'next/image';

const MAX_HEIGHT = 150;
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
    <div ref={headerRef} style={{ height: MAX_HEIGHT }} className="w-full fixed bg-green-400">
      <div className="container mx-auto flex gap-x-10 items-center">
        <Image
          alt="logo"
          src="/logo/chrono.jpeg"
          width={343}
          height={86}
        />
        <Image
          width={30}
          height={30}
          src="/icons/home.png"
          alt="Home"
        />
      </div>
    </div>
  );
}
