'use client';

import { useRouter } from 'next/navigation';

export default function CommonBtn() {
  const router = useRouter();
  const handleBtn = () => {
    router.back();
  };
  return (
    <button type="button" className="btn-13 mt-[20px]" onClick={handleBtn}>
      BACK
    </button>
  );
}
