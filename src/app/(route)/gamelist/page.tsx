import ListCard from '@/components/ListCard';

export default function GameList() {
  return (
    <main className="inner w-[1240px] py-[120px] mx-auto">
      <section>
        <div className="text-center">
          <h1 className="text-4xl">Mini Game Night</h1>
          <h2 className="text-8xl point">GAME LIST</h2>
        </div>

        <ul className="grid grid-cols-3 gap-6 mt-[36px]">
          <ListCard game="Apple Game" />
          <ListCard game="Apple Game" />
          <ListCard game="Apple Game" />
          <ListCard game="Apple Game" />
          <ListCard game="Apple Game" />
        </ul>
      </section>
    </main>
  );
}
