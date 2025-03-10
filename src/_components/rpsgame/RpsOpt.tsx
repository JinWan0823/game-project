import Image from 'next/image';
import { SetStateAction } from 'react';

interface RpsProps {
  option: string;
  setSelectRps: React.Dispatch<SetStateAction<string>>;
}

export default function RpsOpt({ option, setSelectRps }: RpsProps) {
  return (
    <li>
      <button
        type="button"
        className="w-[120px] mx-[16px] h-[120px] rounded-full bg-[#dfdfdf] border-[#333] border-[2px] cursor-pointer"
        onClick={() => setSelectRps(option)}
      >
        <Image src={`/${option}.png`} width={120} height={120} alt={option} />
      </button>
    </li>
  );
}
