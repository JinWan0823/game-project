'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Home() {
  const router = useRouter();
  const handleMovePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/gamelist');
  };

  return (
    <div className="inner w-[1440px] h-[100vh] mx-auto flex items-center justify-center">
      <div className="text-center z-[999]">
        <h1 className="text-4xl">Mini Game Night</h1>
        <h2 className="text-8xl point">GAME START</h2>
        <p className="text-xl">
          직접 구현한 미니게임들을 준비한 사이트입니다. <br />
          계속 추가할 예정이니 마음껏 즐겨주세요!
        </p>

        <button type="button" className="btn-13" onClick={handleMovePage}>
          Let&apos;s Go
        </button>
      </div>
      <Image
        className="dark:invert absolute right-[10px] z-[0]]"
        src="/bg-big.png"
        alt="Next.js logo"
        width={460}
        height={400}
        priority
      />
      <Image
        className="dark:invert absolute top-0 left-[20px]"
        src="/bg-mini.png"
        alt="Next.js logo"
        width={500}
        height={400}
        priority
      />
      <Image
        className="dark:invert absolute  bottom-[40px]"
        src="/bg-plus.png"
        alt="Next.js logo"
        width={120}
        height={400}
        priority
      />
      <Image
        className="dark:invert absolute left-[20px] bottom-[-50px]"
        src="/bg-phone.png"
        alt="Next.js logo"
        width={300}
        height={400}
        priority
      />
      <div />
    </div>
  );
}
