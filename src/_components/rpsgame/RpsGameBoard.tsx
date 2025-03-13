'use client';

import Image from 'next/image';
import { useState, Dispatch, SetStateAction } from 'react';

import ComRps from './ComRps';
import ResultRps from './ResultRps';
import RpsOpt from './RpsOpt';
import RpsRoundResult from './RpsRoundResult';

interface ScoreProps {
  setScore: Dispatch<SetStateAction<number>>;
  setStreak: Dispatch<SetStateAction<number>>;
  streak: number;
  setRemainingChances: Dispatch<SetStateAction<number>>;
  handleGameFinish: () => void;
  comSelectRps: string;
  setComSelectRps: Dispatch<SetStateAction<string>>;
  roundResult: string[];
  setRoundResult: Dispatch<SetStateAction<string[]>>;
}

export default function RpsGameBoard({
  setScore,
  setStreak,
  streak,
  setRemainingChances,
  handleGameFinish,
  comSelectRps,
  setComSelectRps,
  roundResult,
  setRoundResult,
}: ScoreProps) {
  const [selectRps, setSelectRps] = useState('rock');
  const [selected, setSelected] = useState<boolean | number>(false);
  const [rpsResult, setRpsResult] = useState('');

  const rps = ['rock', 'scissors', 'paper'];

  const handleSelectRps = (userChoice: string) => {
    setSelectRps(userChoice);
    setSelected(true);

    const randomIndex = Math.floor(Math.random() * rps.length);
    const comChoice = rps[randomIndex];
    setComSelectRps(comChoice);

    const getResult = (user: string, com: string) => {
      if (user === com) return 'draw';
      if (
        (user === 'rock' && com === 'scissors') ||
        (user === 'scissors' && com === 'paper') ||
        (user === 'paper' && com === 'rock')
      ) {
        return 'win';
      }
      return 'lose';
    };

    const result = getResult(userChoice, comChoice);
    setRpsResult(result);

    setRoundResult((prev) => {
      const newResults = [...prev];
      const nextIndex = prev.findIndex((item) => item === 'gray');

      if (nextIndex !== -1) {
        newResults[nextIndex] = result;
      }
      return newResults;
    });

    setScore((prevScore) => {
      if (result === 'win') {
        return (
          setStreak((prevStreak) => {
            const newStreak = prevStreak * 2; // 연승 시 2배 증가
            return newStreak;
          }),
          prevScore + streak
        ); // streak 값이 이전 연승 값을 기준으로 계산됨
      }
      if (result === 'lose') {
        setStreak(1);
        return prevScore > 0 ? prevScore - 1 : prevScore;
      }
      return prevScore;
    });

    // 기회 감소
    setRemainingChances((prev) => {
      if (prev - 1 === 0) {
        handleGameFinish();
      }
      return prev - 1;
    });
  };

  return (
    <>
      <div className="w-full flex relative border-b-[1px] border-[#333]">
        <div className="left w-[50%]">
          <p className="text-center p-2 text-3xl">ME</p>
          <div className="img-wrap flex justify-center items-center h-[480px]">
            <Image
              src={`/${selectRps}.png`}
              className="animate-wobble"
              width={240}
              height={240}
              alt={`selected-${selectRps}`}
            />
          </div>
        </div>
        <ComRps
          selected={selected}
          rps={rps}
          comSelectRps={comSelectRps}
          setComSelectRps={setComSelectRps}
        />
        <div className="absolute w-[1px] h-[100%] bg-[#333] top-0 left-1/2 translate-x-[-50%] flex items-center justify-center">
          <span className="text-7xl">VS</span>
        </div>
      </div>
      {rpsResult && (
        <ResultRps setRpsResult={setRpsResult} rpsResult={rpsResult} />
      )}
      <div className="option-bar p-[20px] relative">
        <ul className="flex justify-center items-center">
          {rps.map((item) => (
            <RpsOpt
              key={item}
              option={item}
              handleSelectRps={() => handleSelectRps(item)} // 클릭 시 `handleSelectRps` 호출
            />
          ))}
        </ul>
        <RpsRoundResult roundResult={roundResult} />
      </div>
    </>
  );
}
