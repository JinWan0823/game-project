import { Metadata } from 'next';

import CommonBg from '@/_components/common/CommonBg';
import TitleWrap from '@/_components/common/TitleWrap';
import CommonBtn from '@/_components/common/CommonBtn';

export const metadata: Metadata = {
  title: '404 Page not found',
};

export default function NotFound() {
  return (
    <main className="inner w-[1240px] h-[100vh] py-[120px] mx-auto flex items-center justify-center">
      <section className="text-center z-[999]">
        <TitleWrap title="Not Found Page!" />
        <p className="text-xl">
          죄송합니다. 찾고 계신 페이지를 찾을 수 없습니다. <br />
          URL을 잘못 입력하셨나요? 맞춤법을 확인하세요.
        </p>
        <CommonBtn />
      </section>
      <CommonBg />
    </main>
  );
}
