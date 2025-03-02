import CommonBg from '@/_components/common/CommonBg';
import ListCard from '@/_components/ListCard';
import TitleWrap from '@/_components/common/TitleWrap';

export default function GameList() {
  return (
    <main className="inner w-[1240px] py-[120px] mx-auto z-[99999] flex items-center justify-center">
      <section className="w-full z-[9999]">
        <TitleWrap title="GAME LIST" />

        <ul className="grid grid-cols-3 gap-6 mt-[36px]">
          <ListCard game="Apple Game" />
          <ListCard game="Apple Game" />
          <ListCard game="Apple Game" />
          <ListCard game="Apple Game" />
          <ListCard game="Apple Game" />
        </ul>
      </section>
      <CommonBg />
    </main>
  );
}
