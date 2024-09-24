"use client"; // 클라이언트 컴포넌트로 지정, useEffect와 useState를 사용할 수 있도록 함

import Image from "next/image"; // Next.js의 Image 컴포넌트 import
import Weather from "./components/Weather"; // Weather 컴포넌트 import

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Weather /> {/* Weather 컴포넌트를 추가하여 날씨 정보 표시 */}

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
