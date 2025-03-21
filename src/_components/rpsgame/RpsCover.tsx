import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

interface GameStartProps {
  setGameStart: Dispatch<SetStateAction<boolean>>;
}

export default function RpsCover({ setGameStart }: GameStartProps) {
  return (
    <div className="w-full h-full absolute top-0 left-0 z-[999] bg-[#dfdfdf] flex justify-center items-center">
      <div className="img-box text-center">
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
        <button
          type="button"
          className="btn-13 mt-[20px]"
          onClick={() => setGameStart(true)}
        >
          START !
        </button>
      </div>
    </div>
  );
}
