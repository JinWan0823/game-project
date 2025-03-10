'use client';

import Image from 'next/image';
import { useState } from 'react';

import ComRps from './ComRps';
import RpsOpt from './RpsOpt';

export default function RpsGameBoard() {
  const [selectRps, setSelectRps] = useState('rock');
  const rps = ['rock', 'scissors', 'paper'];

  return (
    <>
      <div className="w-full flex relative border-b-[1px] border-[#333]">
        <div className="left w-[50%]">
          <p className="text-center p-2 text-3xl">ME</p>
          <div className="img-wrap flex justify-center items-center h-[480px]">
            <Image
              src={`/${selectRps}.png`}
              width={240}
              height={240}
              alt={`selected-${selectRps}`}
            />
          </div>
        </div>
        <ComRps />
        <div className="absolute w-[1px] h-[100%] bg-[#333] top-0 left-1/2 translate-x-[-50%] flex items-center justify-center">
          <span className="text-7xl">VS</span>
        </div>
      </div>
      <div className="option-bar p-[20px]">
        <ul className="flex justify-center items-center">
          {rps.map((item) => (
            <RpsOpt key={item} option={item} setSelectRps={setSelectRps} />
          ))}
        </ul>
      </div>
    </>
  );
}
