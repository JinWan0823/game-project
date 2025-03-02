'use client';

// import AppleGameBoard from '@/_components/AppleGameBoard';
import Image from 'next/image';
import { useState } from 'react';

import CommonBg from '@/_components/CommonBg';
import SoundBar from '@/_components/SoundBar';
import TitleWrap from '@/_components/TitleWrap';

export default function AppleGame() {
  const [bgmOn, setBgmOn] = useState(true);

  const toggleBgm = () => {
    setBgmOn((prev) => !prev);
  };

  return (
    <main className="inner w-[1240px] py-[120px] mx-auto flex items-center justify-center">
      <section className="z-[9999]">
        <TitleWrap title="APPLE GAME" />
        <div className="apple-wrap mt-[20px] w-[960px] h-[606px] bg-[#dfdfdf] rounded-lg border-8 border-indigo-400">
          <div className="apple-cover flex justify-center items-center w-full h-full relative">
            <div className="img-box text-center">
              {/* <div className=" w-[200px] h-[200px] bg-[#333]" /> */}
              <Image
                src="/apple.png"
                alt="apple img"
                width={200}
                height={200}
                priority
              />
              <button type="button" className="btn-13 mt-[20px]">
                START !
              </button>
            </div>

            <div className="option-box absolute bottom-[8px] w-full p-4 flex items-center">
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
              </div>
              <SoundBar />
            </div>
          </div>
          {/* <AppleGameBoard /> */}
        </div>
      </section>
      <CommonBg />
    </main>
  );
}
