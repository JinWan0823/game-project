import Image from 'next/image';

interface RpsProps {
  handleSelectRps: () => void;
  option: string;
}

export default function RpsOpt({ handleSelectRps, option }: RpsProps) {
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
