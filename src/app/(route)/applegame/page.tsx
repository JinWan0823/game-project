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
  const [timeLeft, setTimeLeft] = useState(3);

  const handleGameStart = () => {
    setGameStart(true);
  };

  const handleResetGame = () => {
    setGameStart(false);
    setGameFinish(false);
    setTimeLeft(3);
  };

  const finishGame = () => {
    setGameFinish(true);
  };

  useEffect(() => {
    if (!gameStart) return undefined;

    setTimeLeft(3);
    setGameFinish(false);

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
  }, [gameStart]);
  return (
    <main className="inner w-[1240px] py-[120px] mx-auto flex items-center justify-center">
      <section className="z-[9999]">
        <p>{timeLeft}</p>
        <TitleWrap title="APPLE GAME" />
        <div className="apple-wrap mt-[20px] w-[960px] h-[606px] bg-[#dfdfdf] rounded-lg border-8 border-indigo-400 relative">
          {!gameStart ? (
            <AppleGameCover handleGameStart={handleGameStart} />
          ) : (
            <AppleGameBoard />
          )}
          {gameFinish && <AppleGameFinish />}
        </div>
        <OptionBox handleResetGame={handleResetGame} />
      </section>
      <CommonBg />
    </main>
  );
}
