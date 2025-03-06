'use client';

// import AppleGameFinish from '@/_components/applegame/AppleGameFinish';
import { useEffect, useState } from 'react';

import AppleGameBoard from '@/_components/applegame/AppleGameBoard';
import AppleGameCover from '@/_components/applegame/AppleGameCover';
import AppleGameFinish from '@/_components/applegame/AppleGameFinish';
import CommonBg from '@/_components/common/CommonBg';
import OptionBox from '@/_components/common/OptionBox';
import TitleWrap from '@/_components/common/TitleWrap';

export default function AppleGame() {
  const [gameStart, setGameStart] = useState(false);
  const [gameFinish, setGameFinish] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [score, setScore] = useState(0);

  const handleGameStart = () => {
    setScore(0);
    setGameStart(true);
  };

  const handleResetGame = () => {
    setGameStart(false);
    setGameFinish(false);
    setTimeLeft(120);
    setScore(0);
  };

  const finishGame = () => {
    const finalScore = score;
    const bestScore = Number(window.localStorage.getItem('appleGame'));

    if (!bestScore || finalScore > bestScore) {
      window.localStorage.setItem('appleGame', String(finalScore));
    }

    setGameFinish(true);
  };

  useEffect(() => {
    if (!gameStart) return undefined; // 게임이 시작되지 않으면 실행 안 함

    setTimeLeft(120); // 게임 시작 시 시간 초기화
    setGameFinish(false); // 게임 종료 화면 초기화

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          finishGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStart]);

  return (
    <main className="inner w-[1240px] py-[120px] mx-auto flex items-center justify-center">
      <section className="z-[9999]">
        <TitleWrap title="APPLE GAME" />
        <p className="text-right">
          <span>남은 시간 : {timeLeft}</span>
          <span className="ml-[10px]">점수 : {score}</span>
        </p>
        <div className="apple-wrap w-[960px] h-[606px] bg-[#dfdfdf] rounded-lg border-8 border-[--pointcolor] relative">
          {!gameStart ? (
            <AppleGameCover handleGameStart={handleGameStart} />
          ) : (
            <AppleGameBoard setScore={setScore} />
          )}
          {gameFinish && (
            <AppleGameFinish handleResetGame={handleResetGame} score={score} />
          )}
        </div>
        <OptionBox handleResetGame={handleResetGame} />
      </section>
      <CommonBg />
    </main>
  );
}
