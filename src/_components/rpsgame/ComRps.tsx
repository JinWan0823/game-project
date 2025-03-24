'use client';

import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface RpsProps {
  rps: string[];
  selected: boolean | number;
  comSelectRps: string;
  setComSelectRps: Dispatch<SetStateAction<string>>;
}

export default function ComRps({
  rps,
  selected,
  comSelectRps,
  setComSelectRps,
}: RpsProps) {
  useEffect(() => {
    if (!selected) return; // selected가 true일 때만 실행

    const randomRps = Math.floor(Math.random() * rps.length);
    const comRps = rps[randomRps];
    setComSelectRps(comRps);
  }, [selected]);

  return (
    <div className="left w-[50%]">
      <p className="text-center p-2 text-3xl">COM</p>
      <div className="img-wrap flex justify-center items-center h-[480px]">
        <Image
          src={`/${comSelectRps}.png`}
          className="animate-wobble"
          width={240}
          height={240}
          alt="question"
        />
      </div>
    </div>
  );
}
