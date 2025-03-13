'use client';

import { useState } from 'react';

import CommonBg from '@/_components/common/CommonBg';
import OptionBox from '@/_components/common/OptionBox';
import TitleWrap from '@/_components/common/TitleWrap';
import RpsCover from '@/_components/rpsgame/RpsCover';
import RpsGameBoard from '@/_components/rpsgame/RpsGameBoard';
import RpsGameFinish from '@/_components/rpsgame/RpsGameFinish';

export default function RpsGame() {
  const [gameStart, setGameStart] = useState(false);
  const [gameFinish, setGameFinish] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(1); // 연승 배율
  const [remainingChances, setRemainingChances] = useState(10); // 10번 기회
  const [comSelectRps, setComSelectRps] = useState('question');

  const handleResetGame = () => {
    setScore(0);
    setStreak(1);
    setRemainingChances(10);
    setGameStart(false);
    setGameFinish(false);
    setComSelectRps('question');
  };

  const handleGameFinish = () => {
    setGameFinish(true);
  };

  return (
    <main className="inner w-[1240px] py-[120px] mx-auto flex items-center justify-center">
      <section className="z-[9999]">
        <TitleWrap title="RPS GAME" />
        <p className="text-right">
          <span className="ml-[10px]">점수 : {score}</span>
          <span className="ml-[10px]">남은 기회 : {remainingChances}</span>
        </p>
        <div className="w-[1160px] h-auto bg-[#dfdfdf] rounded-lg border-8 border-[--pointcolor] relative">
          <RpsGameBoard
            setScore={setScore}
            setStreak={setStreak}
            streak={streak}
            setRemainingChances={setRemainingChances}
            handleGameFinish={handleGameFinish}
            comSelectRps={comSelectRps}
            setComSelectRps={setComSelectRps}
          />
          {!gameStart && <RpsCover setGameStart={setGameStart} />}
          {gameFinish && (
            <RpsGameFinish score={score} handleResetGame={handleResetGame} />
          )}
        </div>
        <OptionBox handleResetGame={handleResetGame} />
      </section>
      <CommonBg />
    </main>
  );
}
