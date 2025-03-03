'use client';

import { useState } from 'react';

import SoundBar from './SoundBar';

export default function OptionBox() {
  const [bgmOn, setBgmOn] = useState(true);
  const [volume, setVolume] = useState(20);

  const toggleBgm = () => {
    setBgmOn((prev) => !prev);
  };
  return (
    <div className="option-box mt-[10px] w-full flex justify-between items-center">
      <div className="sound-toggle flex items-center">
        <label
          aria-label="BGM TOGGLE"
          htmlFor="bgm"
          className="cursor-pointer mr-[4px]"
        >
          <input
            type="checkbox"
            id="bgm"
            onChange={toggleBgm}
            checked
            className="hidden"
          />
          <div className="w-10 h-5 bg-gray-500 rounded-full relative transition overflow-hidden">
            <div
              className={`w-5 h-5 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 transition ${bgmOn ? 'translate-x-0' : 'translate-x-5'}`}
            />
          </div>
        </label>
        <p>BGM {bgmOn ? 'ON' : 'OFF'}</p>
        <SoundBar volume={volume} setVolume={setVolume} />
      </div>
      <div className="reset-btn">RESET</div>
    </div>
  );
}
