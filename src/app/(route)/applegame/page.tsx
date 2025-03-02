'use client';

// import AppleGameCover from '@/_components/applegame/AppleGameCover';
import AppleGameBoard from '@/_components/applegame/AppleGameBoard';
import AppleGameFinish from '@/_components/applegame/AppleGameFinish';
import CommonBg from '@/_components/common/CommonBg';
import SoundOptionBox from '@/_components/common/SoundOptionBox';
import TitleWrap from '@/_components/common/TitleWrap';

export default function AppleGame() {
  return (
    <main className="inner w-[1240px] py-[120px] mx-auto flex items-center justify-center">
      <section className="z-[9999]">
        <TitleWrap title="APPLE GAME" />
        <div className="apple-wrap mt-[20px] w-[960px] h-[606px] bg-[#dfdfdf] rounded-lg border-8 border-indigo-400 relative">
          {/* <AppleGameCover /> */}
          <AppleGameBoard />
          <SoundOptionBox />
          <AppleGameFinish />
        </div>
      </section>
      <CommonBg />
    </main>
  );
}
