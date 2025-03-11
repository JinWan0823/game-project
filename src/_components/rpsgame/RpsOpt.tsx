import Image from 'next/image';
import { SetStateAction } from 'react';

interface RpsProps {
  option: string;
  setSelectRps: React.Dispatch<SetStateAction<string>>;
  setSelected: React.Dispatch<SetStateAction<boolean | number>>;
}

export default function RpsOpt({
  option,
  setSelectRps,
  setSelected,
}: RpsProps) {
  const handleSelectRps = () => {
    setSelectRps(option);
    setSelected(Date.now());
  };
  return (
    <li>
      <button
        type="button"
        className="w-[120px] mx-[16px] h-[120px] rounded-full bg-[#dfdfdf] border-[#333] border-[2px] cursor-pointer"
        onClick={handleSelectRps}
      >
        <Image
          src={`/${option}.png`}
          className="animate-wobble"
          width={120}
          height={120}
          alt={option}
        />
      </button>
    </li>
  );
}
