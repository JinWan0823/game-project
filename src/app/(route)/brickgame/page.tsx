'use client';
import { useState } from 'react';

import BrickGameBoard from '@/_components/brickgame/BrickGameBoard';
import BrickGameCover from '@/_components/brickgame/BrickGameCover';
import BrickGameFinish from '@/_components/brickgame/BrickGameFinish';
import CommonBg from '@/_components/common/CommonBg';
import OptionBox from '@/_components/common/OptionBox';
import TitleWrap from '@/_components/common/TitleWrap';

export default function BrickGame() {
  const [score, setScore] = useState(0);
  const [gameFinish, setGameFinish] = useState(false);
  const [gameStart, setGameStart] = useState(true);

  const handleGameFinish = () => {
    setGameFinish(true);
    const finalScore = score;
    const bestScore = Number(window.localStorage.getItem('Brick Game'));

    if (finalScore > bestScore) {
      window.localStorage.setItem('Brick Game', String(finalScore));
    }
  };

  const handleGameReset = () => {
    setGameFinish(false);
    setGameStart(true);
    setScore(0);
  };

  const handleGameStart = () => {
    setGameStart(false);
  };

  return (
    <main className="inner w-[1240px] py-[120px] mx-auto flex items-center justify-center">
      <section className="z-[9999]">
        <TitleWrap title="GAME LIST" />
        <p className="text-right">
          <span className="ml-[10px]">점수 : {score}</span>
        </p>
        <div className="w-[1160px]  bg-[#dfdfdf] rounded-lg border-8 border-[--pointcolor] relative">
          {gameStart ? (
            <BrickGameCover handleGameStart={handleGameStart} />
          ) : (
            <BrickGameBoard
              setScore={setScore}
              handleGameFinish={handleGameFinish}
            />
          )}
          {gameFinish && (
            <BrickGameFinish score={score} handleGameReset={handleGameReset} />
          )}
        </div>
        <OptionBox handleResetGame={handleGameReset} gameStart={!gameStart} />
      </section>
      <CommonBg />
    </main>
  );
}
