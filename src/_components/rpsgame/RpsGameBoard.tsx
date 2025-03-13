'use client';

import Image from 'next/image';
import { useState, Dispatch, SetStateAction } from 'react';

import ComRps from './ComRps';
import ResultRps from './ResultRps';
import RpsOpt from './RpsOpt';

interface ScoreProps {
  setScore: Dispatch<SetStateAction<number>>;
  setStreak: Dispatch<SetStateAction<number>>;
  streak: number;
  setRemainingChances: Dispatch<SetStateAction<number>>;
  handleGameFinish: () => void;
  comSelectRps: string;
  setComSelectRps: Dispatch<SetStateAction<string>>;
}

export default function RpsGameBoard({
  setScore,
  setStreak,
  streak,
  setRemainingChances,
  handleGameFinish,
  comSelectRps,
  setComSelectRps,
}: ScoreProps) {
  const [selectRps, setSelectRps] = useState('rock');
  const [selected, setSelected] = useState<boolean | number>(false);
  const [rpsResult, setRpsResult] = useState('');

  const rps = ['rock', 'scissors', 'paper'];

  // 선택한 가위바위보에 대해 처리
  const handleSelectRps = (userChoice: string) => {
    setSelectRps(userChoice);
    setSelected(true);

    // 컴퓨터 선택 (랜덤)
    const randomIndex = Math.floor(Math.random() * rps.length);
    const comChoice = rps[randomIndex];
    setComSelectRps(comChoice);

    // 승패 판정 함수
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

    // 점수 업데이트
    setScore((prevScore) => {
      if (result === 'win') {
        const newStreak = streak * 2; // 연승 시 2배 증가
        setStreak(newStreak);
        return prevScore + newStreak;
      }
      if (result === 'lose') {
        setStreak(1); // 패배 시 연승 초기화
        if (prevScore === 0) {
          return prevScore;
        }
        return prevScore - 1;
      }
      return prevScore; // 무승부면 점수 유지
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
        {rpsResult && (
          <ResultRps setRpsResult={setRpsResult} rpsResult={rpsResult} />
        )}
      </div>
      <div className="option-bar p-[20px]">
        <ul className="flex justify-center items-center">
          {rps.map((item) => (
            <RpsOpt
              key={item}
              option={item}
              handleSelectRps={() => handleSelectRps(item)} // 클릭 시 `handleSelectRps` 호출
            />
          ))}
        </ul>
      </div>
    </>
  );
}
