import Image from 'next/image';

interface AppleGameProps {
  score: number;
}

export default function RpsGameFinish({ score }: AppleGameProps) {
  return (
    <div className="z-[99999] absolute w-full h-full flex justify-center items-center bg-[#333333b5] top-0 left-0">
      <div className="img-box text-center">
        <div className="relative">
          <div className="flex">
            <Image
              src="/rock.png"
              alt="apple img"
              width={120}
              height={120}
              priority
            />
            <Image
              src="/scissors.png"
              alt="apple img"
              width={120}
              height={120}
              priority
            />
            <Image
              src="/paper.png"
              alt="apple img"
              width={120}
              height={120}
              priority
            />
          </div>
          <p className="text-6xl text-[--pointcolor]">{score}</p>
        </div>
        <button type="button" className="btn-13 mt-[20px]">
          RESET !
        </button>
      </div>
    </div>
  );
}
