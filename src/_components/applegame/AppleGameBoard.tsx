'use client';

import { useEffect, useRef } from 'react';

export default function AppleGameBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 부모 요소의 크기 가져오기
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // 캔버스 크기 조정
    canvas.width = containerWidth;
    canvas.height = containerHeight;

    const cols = 17;
    const rows = 10;
    const boxWidth = 36;
    const boxHeight = 44;
    const padding = 6;

    // 1~9의 숫자가 170개 반복되는 배열을 랜덤하게 섞기
    const numbers = Array.from({ length: 170 }, (_, i) => (i % 9) + 1);
    for (let i = numbers.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    // 전체 그리드 크기 계산
    const gridWidth = cols * (boxWidth + padding);
    const gridHeight = rows * (boxHeight + padding);

    // 그리드의 시작 위치 중앙 정렬
    const startX = (canvas.width - gridWidth) / 2;
    const startY = (canvas.height - gridHeight) / 2;

    // 배경 이미지 로드
    const img = new Image();
    img.src = '/apple2.png';
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      numbers.forEach((num, idx) => {
        const x = startX + (idx % cols) * (boxWidth + padding);
        const y = startY + Math.floor(idx / cols) * (boxHeight + padding);

        // 이미지 배경 그리기
        ctx.drawImage(img, x, y, boxWidth, boxHeight);

        // 숫자 텍스트 그리기
        ctx.fillStyle = '#333eee';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(num.toString(), x + boxWidth / 2, y + boxHeight / 2);
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="border border-gray-300 w-full h-full"
      />
    </div>
  );
}
