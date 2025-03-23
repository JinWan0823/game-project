import Image from 'next/image';

interface BrickGameCoverProps {
  handleGameStart: () => void;
}

export default function BrickGameCover({
  handleGameStart,
}: BrickGameCoverProps) {
  return (
    <div className="z-[9999999] bg-[#fff] w-[1140px] h-[600px] flex justify-center items-center bg-[#333333b5] top-0 left-0">
      <div className="img-box text-center">
        <Image
          src="/brick.png"
          alt="apple img"
          width={200}
          height={200}
          priority
        />
        <button type="button" className="btn-13" onClick={handleGameStart}>
          START !
        </button>
      </div>
    </div>
  );
}
