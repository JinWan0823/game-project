'use client';

import Image from 'next/image';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import ComRps from './ComRps';
import ResultRps from './ResultRps';
import RpsOpt from './RpsOpt';

interface ScoreProps {
  setScore: Dispatch<SetStateAction<number>>;
  handleGameFinish: () => void;
}

export default function RpsGameBoard({
  setScore,
  handleGameFinish,
}: ScoreProps) {
  const [selectRps, setSelectRps] = useState('rock');
  const [selected, setSelected] = useState<boolean | number>(false);
  const [comSelectRps, setComSelectRps] = useState('question');
  const [rpsResult, setRpsResult] = useState('');

  const rps = ['rock', 'scissors', 'paper'];

  useEffect(() => {
    if (comSelectRps === 'question') return; // 초기 상태일 때는 승패 판정 X

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

    const result = getResult(selectRps, comSelectRps);
    setRpsResult(result);
    console.log(result);

    // 점수 업데이트 로직 (중복 호출 방지)
    setScore((prevScore) => {
      if (result === 'win') {
        return prevScore + 1;
      }
      if (result === 'lose') {
        handleGameFinish();
        return 0;
      }
      return prevScore; // draw인 경우 점수 유지
    });

    console.log('결과', result);
  }, [comSelectRps, selectRps, setScore]);

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
              setSelectRps={setSelectRps}
              setSelected={setSelected}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
