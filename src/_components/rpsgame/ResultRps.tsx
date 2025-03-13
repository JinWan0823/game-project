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

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rpsResult]);

  return (
    <div className="absolute top-0 left-0 w-full h-full z-[9999] flex justify-center items-center">
      <h2 className="bg-[--pointcolor] inline-block text-[#fff] text-7xl rotate-[-12deg] rounded-xl p-4 px-[60px]">
        {rpsResult}!
      </h2>
    </div>
  );
}
