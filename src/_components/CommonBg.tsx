import Image from 'next/image';

export default function CommonBg() {
  return (
    <>
      <Image
        className="dark:invert fixed right-[10px]"
        src="/bg-big.png"
        alt="Next.js logo"
        width={460}
        height={400}
        priority
      />
      <Image
        className="dark:invert fixed top-0 left-[20px]"
        src="/bg-mini.png"
        alt="Next.js logo"
        width={500}
        height={400}
        priority
      />
      <Image
        className="dark:invert fixed  bottom-[40px]"
        src="/bg-plus.png"
        alt="Next.js logo"
        width={120}
        height={400}
        priority
      />
      <Image
        className="dark:invert fixed left-[20px] bottom-[-50px]"
        src="/bg-phone.png"
        alt="Next.js logo"
        width={300}
        height={400}
        priority
      />
    </>
  );
}
