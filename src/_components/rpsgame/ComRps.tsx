import Image from 'next/image';

export default function ComRps() {
  return (
    <div className="left w-[50%]">
      <p className="text-center p-2 text-3xl">COM</p>
      <div className="img-wrap flex justify-center items-center h-[480px]">
        <Image
          src="/question.png"
          className="animate-wobble"
          width={240}
          height={240}
          alt="question"
        />
      </div>
    </div>
  );
}
