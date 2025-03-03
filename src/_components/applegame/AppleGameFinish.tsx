import Image from 'next/image';

export default function AppleGameFinish() {
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
            91
          </p>
        </div>
        <button type="button" className="btn-13 mt-[20px]">
          RESET !
        </button>
      </div>
    </div>
  );
}
