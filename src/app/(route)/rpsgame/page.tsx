'use client';

import { useState } from 'react';

import CommonBg from '@/_components/common/CommonBg';
import OptionBox from '@/_components/common/OptionBox';
import TitleWrap from '@/_components/common/TitleWrap';
import RpsCover from '@/_components/rpsgame/RpsCover';
import RpsGameBoard from '@/_components/rpsgame/RpsGameBoard';

export default function RpsGame() {
  const [gameStart, setGameStart] = useState(false);
  const [score, setScore] = useState(0);

  const handleResetGame = () => {
    setScore(0);
    setGameStart(true);
  };

  return (
    <main className="inner w-[1240px] py-[120px] mx-auto flex items-center justify-center">
      <section className="z-[9999]">
        <TitleWrap title="RPS GAME" />
        <p className="text-right">
          <span className="ml-[10px]">점수 : {score}</span>
        </p>
        <div className="w-[1160px] h-auto bg-[#dfdfdf] rounded-lg border-8 border-[--pointcolor] relative">
          <RpsGameBoard setScore={setScore} />
          {!gameStart && <RpsCover setGameStart={setGameStart} />}
        </div>
        <OptionBox handleResetGame={handleResetGame} />
      </section>
      <CommonBg />
    </main>
  );
}
