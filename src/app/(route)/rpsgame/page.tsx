import CommonBg from '@/_components/common/CommonBg';
import TitleWrap from '@/_components/common/TitleWrap';

export default function RpsGame() {
  return (
    <main className="inner w-[1240px] py-[120px] mx-auto flex items-center justify-center">
      <section className="z-[9999]">
        <TitleWrap title="RPS GAME" />
        <p className="text-right">
          <span className="ml-[10px]">점수 : 6</span>
        </p>
        <div className="w-[1160px] h-auto bg-[#dfdfdf] rounded-lg border-8 border-[--pointcolor] relative">
          <div className="w-full flex relative border-b-[1px] border-[#333]">
            <div className="left w-[50%]">
              <p className="text-center p-2 text-3xl">ME</p>
              <div className="img-wrap flex justify-center items-center h-[480px]">
                <div className="img w-[240px] h-[240px] bg-[#333]" />
              </div>
            </div>
            <div className="left w-[50%]">
              <p className="text-center p-2 text-3xl">COM</p>
              <div className="img-wrap flex justify-center items-center h-[480px]">
                <div className="img w-[240px] h-[240px] bg-[#333]" />
              </div>
            </div>
            <div className="absolute w-[1px] h-[100%] bg-[#335782] top-0 left-1/2 translate-x-[-50%] flex items-center justify-center">
              <span className="text-7xl">VS</span>
            </div>
          </div>
          <div className="option-bar p-[10px]">
            <ul className="flex justify-center items-center">
              <li className="w-[100px] mx-[10px] h-[100px] rounded-full bg-[#333]" />
              <li className="w-[100px] mx-[10px] h-[100px] rounded-full bg-[#333]" />
              <li className="w-[100px] mx-[10px] h-[100px] rounded-full bg-[#333]" />
            </ul>
          </div>
        </div>
      </section>
      <CommonBg />
    </main>
  );
}
