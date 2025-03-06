'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function BackBtn() {
  const router = useRouter();
  const pathName = usePathname();

  if (pathName === '/') {
    return undefined;
  }

  const handleBackBtn = () => {
    if (pathName === '/gamelist') {
      router.push('/');
    } else {
      router.push('/gamelist');
    }
  };
  return (
    <button
      type="button"
      onClick={handleBackBtn}
      className="fixed top-[20px] bg-[--pointcolor] p-1 px-[12px] rounded-lg left-[20px] z-[99999]"
    >
      Back
    </button>
  );
}
