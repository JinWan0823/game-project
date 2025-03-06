import Image from 'next/image';

interface AppleGameProps {
  handleResetGame: () => void;
  score: number;
}

export default function AppleGameFinish({
  handleResetGame,
  score,
}: AppleGameProps) {
  return (
    <div className="z-[99999] absolute w-full h-full flex justify-center items-center bg-[#333333b5] top-0 left-0">
      <div className="img-box text-center">
        <div className="relative">
          <Image
            src="/apple.png"
            alt="apple img"
            className="translate-x-2"
            width={200}
            height={200}
            priority
          />
          <p className="text-6xl absolute text-[#333] top-1/2 left-1/2 translate-x-[-50%]">
            {score}
          </p>
        </div>
        <button
          type="button"
          className="btn-13 mt-[20px]"
          onClick={handleResetGame}
        >
          RESET !
        </button>
      </div>
    </div>
  );
}
