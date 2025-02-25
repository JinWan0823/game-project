import TitleWrap from '@/_components/TitleWrap';

export default function AppleGame() {
  const numbers = [];
  for (let i = 0; i < 170; i += 1) {
    numbers.push((i % 9) + 1);
  }
  // const numbers = Array.from({ length: 170 }, (_, i) => (i % 9) + 1);

  for (let i = numbers.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return (
    <main className="inner w-[1240px] py-[120px] mx-auto z-[99999] flex items-center justify-center">
      <section className="w-full z-[9999]">
        <TitleWrap title="APPLE GAME" />

        <div className="apple-wrap w-full">
          <div className="game-board bg-[#fff] rounded-lg p-[12px]">
            <ul className="grid grid-cols-[repeat(17,_minmax(0,1fr))] gap-2">
              {numbers.map((number, idx) => (
                <li
                  key={idx}
                  className="bg-gray-200 rounded flex items-center justify-center"
                >
                  {number}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
