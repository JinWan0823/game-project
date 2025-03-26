'use client';

import { useEffect, useRef, useState } from 'react';

import SoundBar from './SoundBar';

interface AppleGameProps {
  handleResetGame: () => void;
  gameStart: boolean;
}

export default function OptionBox({
  handleResetGame,
  gameStart,
}: AppleGameProps) {
  const [bgmOn, setBgmOn] = useState(true);
  const [volume, setVolume] = useState(20);
  const bgmRef = useRef<HTMLAudioElement | null>(null);

  const toggleBgm = () => {
    setBgmOn((prev) => !prev);
  };

  useEffect(() => {
    if (!gameStart) return;

    if (bgmOn) {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current.src = '';
        bgmRef.current = null;
      }

      const audio = new Audio('/sounds/bgm.mp3');
      audio.loop = true;
      audio.volume = volume / 100;
      audio.play().catch((error) => console.warn('Audio play failed:', error));

      bgmRef.current = audio;
    } else {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current.src = '';
        bgmRef.current = null;
      }
    }

    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current.src = '';
        bgmRef.current = null;
      }
    };
  }, [bgmOn, gameStart]);

  useEffect(() => {
    if (bgmRef.current) {
      bgmRef.current.volume = volume / 100;
    }
  }, [volume]);

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
            checked={bgmOn}
            className="hidden"
          />
          <div className="w-10 h-5 bg-gray-500 rounded-full relative transition overflow-hidden">
            <div
              className={`w-5 h-5 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 transition ${
                bgmOn ? 'translate-x-0' : 'translate-x-5'
              }`}
            />
          </div>
        </label>
        <p>BGM {bgmOn ? 'ON' : 'OFF'}</p>
        <SoundBar volume={volume} setVolume={setVolume} />
      </div>
      <button
        type="button"
        className="reset-btn bg-[--pointcolor] p-1 rounded-lg"
        onClick={handleResetGame}
      >
        RESET
      </button>
    </div>
  );
}
