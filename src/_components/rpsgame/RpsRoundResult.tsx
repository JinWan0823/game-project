import RpsRound from './RpsRound';

interface RoundResultProps {
  roundResult: string[];
}

export default function RpsRoundResult({ roundResult }: RoundResultProps) {
  // 항상 10개의 원을 유지하도록 앞쪽에 `draw` 추가
  const filledResults = [
    ...Array(10 - roundResult.length).fill('draw'),
    ...roundResult,
  ];

  return (
    <ul className="flex absolute top-0 left-0 translate-y-[-100%] p-[4px]">
      {filledResults.map((result, index) => (
        <RpsRound key={index} result={result} />
      ))}
    </ul>
  );
}
