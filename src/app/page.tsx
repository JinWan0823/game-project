'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import CommonBg from '@/_components/common/CommonBg';
import TitleWrap from '@/_components/common/TitleWrap';

export default function Home() {
  const router = useRouter();
  const handleMovePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/gamelist');
  };

  return (
    <main className="inner w-[1440px] h-[100vh] mx-auto flex items-center justify-center">
      <section className="text-center z-[999]">
        <TitleWrap title="GAME START" />
        <p className="text-xl">
          직접 구현한 미니게임들을 준비한 사이트입니다. <br />
          계속 추가할 예정이니 마음껏 즐겨주세요!
        </p>

        <button
          type="button"
          className="btn-13 mt-[20px]"
          onClick={handleMovePage}
        >
          Let&apos;s Go
        </button>
      </section>
      <CommonBg />
    </main>
  );
}
