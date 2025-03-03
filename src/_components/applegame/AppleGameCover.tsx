import Image from 'next/image';

interface AppleGameProps {
  handleGameStart: () => void;
}

export default function AppleGameCover({ handleGameStart }: AppleGameProps) {
  return (
    <div className="apple-cover flex justify-center items-center w-full h-full relative">
      <div className="img-box text-center">
        <Image
          src="/apple.png"
          alt="apple img"
          className="translate-x-2"
          width={200}
          height={200}
          priority
        />
        <button
          type="button"
          className="btn-13 mt-[20px]"
          onClick={handleGameStart}
        >
          START !
        </button>
      </div>
    </div>
  );
}
