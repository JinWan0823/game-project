import { Dispatch, SetStateAction, useEffect } from 'react';

interface ResultRpsProps {
  setRpsResult: Dispatch<SetStateAction<string>>;
  rpsResult: string;
}

export default function ResultRps({ setRpsResult, rpsResult }: ResultRpsProps) {
  useEffect(() => {
    if (!rpsResult) return undefined;

    const timer = setTimeout(() => {
      setRpsResult('');
    }, 1000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 클리어
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rpsResult]);

  return (
    <h2 className="absolute bg-[--pointcolor] text-[#fff] text-7xl top-1/2 left-1/2 translate-x-[-50%] rotate-[-12deg] rounded-xl p-4 px-[60px]">
      {rpsResult}!
    </h2>
  );
}
