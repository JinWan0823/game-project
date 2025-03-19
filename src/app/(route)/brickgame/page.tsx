'use client';
import { useState } from 'react';

import BrickGameBoard from '@/_components/brickgame/BrickGameBoard';
import BrickGameFinish from '@/_components/brickgame/BrickGameFinish';
import CommonBg from '@/_components/common/CommonBg';
import TitleWrap from '@/_components/common/TitleWrap';

export default function BrickGame() {
  const [score, setScore] = useState(0);

  return (
    <main className="inner w-[1240px] py-[120px] mx-auto flex items-center justify-center">
      <section className="z-[9999]">
        <TitleWrap title="GAME LIST" />
        <p className="text-right">
          <span>단계 : {score}</span>
          <span className="ml-[10px]">점수 : 100</span>
        </p>
        <div className="w-[1160px]  bg-[#dfdfdf] rounded-lg border-8 border-[--pointcolor] relative">
          <BrickGameBoard setScore={setScore} />
          <BrickGameFinish />
        </div>
      </section>
      <CommonBg />
    </main>
  );
}
