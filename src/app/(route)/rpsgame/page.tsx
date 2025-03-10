'use client';

import CommonBg from '@/_components/common/CommonBg';
import OptionBox from '@/_components/common/OptionBox';
import TitleWrap from '@/_components/common/TitleWrap';
import RpsGameBoard from '@/_components/rpsgame/RpsGameBoard';

export default function RpsGame() {
  const handleResetGame = () => {};

  return (
    <main className="inner w-[1240px] py-[120px] mx-auto flex items-center justify-center">
      <section className="z-[9999]">
        <TitleWrap title="RPS GAME" />
        <p className="text-right">
          <span className="ml-[10px]">점수 : 6</span>
        </p>
        <div className="w-[1160px] h-auto bg-[#dfdfdf] rounded-lg border-8 border-[--pointcolor] relative">
          <RpsGameBoard />
        </div>
        <OptionBox handleResetGame={handleResetGame} />
      </section>
      <CommonBg />
    </main>
  );
}
