'use client';

import { SetStateAction, useEffect, useRef, useState } from 'react';

interface AppleGameBoardProps {
  setScore: React.Dispatch<SetStateAction<number>>;
}

interface Apple {
  x: number;
  y: number;
  value: number;
  width: number;
  height: number;
}

export default function AppleGameBoard({ setScore }: AppleGameBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [apples, setApples] = useState<Apple[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [dragEnd, setDragEnd] = useState<{ x: number; y: number } | null>(null);

  const drawAppleShape = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
  ) => {
    ctx.save();
    ctx.translate(x, y);

    // 잎사귀
    ctx.beginPath();
    ctx.moveTo(size * 0.2, -size * 0.6);
    ctx.quadraticCurveTo(size * 0.5, -size, size * 0.7, -size * 0.6);
    ctx.quadraticCurveTo(size * 0.5, -size * 0.2, size * 0.2, -size * 0.6);
    ctx.fillStyle = '#2E8B57';
    ctx.fill();

    // 사과 본체
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = '#FF0000';
    ctx.fill();
    ctx.strokeStyle = '#AA0000';
    ctx.lineWidth = size * 0.05;
    ctx.stroke();

    ctx.restore();
  };

  const drawApples = (ctx: CanvasRenderingContext2D, appleList: Apple[]) => {
    if (!canvasRef.current || !imgRef.current) return;

    const canvas = canvasRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    appleList.forEach(({ x, y, value, width }) => {
      drawAppleShape(ctx, x + width / 2, y + width / 2, width);

      ctx.fillStyle = '#FFF';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(value.toString(), x + width / 2, y + width / 2);
    });

    if (isDragging && dragStart && dragEnd) {
      const x1 = Math.min(dragStart.x, dragEnd.x);
      const y1 = Math.min(dragStart.y, dragEnd.y);
      const x2 = Math.max(dragStart.x, dragEnd.x);
      const y2 = Math.max(dragStart.y, dragEnd.y);

      ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
      ctx.fillRect(x1, y1, x2 - x1, y2 - y1);

      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      appleList.forEach(({ x, y, width, height }) => {
        if (x + width > x1 && x < x2 && y + height > y1 && y < y2) {
          ctx.strokeRect(x, y, width, height);
        }
      });
    }
  };

  useEffect(() => {
    const removedApples = 170 - apples.length;
    setScore(() => removedApples);
  }, [apples]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const cols = 17;
    const rows = 10;
    const boxWidth = 36;
    const boxHeight = 44;
    const padding = 6;

    if (!imgRef.current) {
      imgRef.current = new Image();
      imgRef.current.src = '/apple2.png';
    }

    const numbers = Array.from({ length: 170 }, (_, i) => (i % 9) + 1);
    for (let i = numbers.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    const appleArray: Apple[] = numbers.map((num, idx) => ({
      x:
        (canvas.width - cols * (boxWidth + padding)) / 2 +
        (idx % cols) * (boxWidth + padding),
      y:
        (canvas.height - rows * (boxHeight + padding)) / 2 +
        Math.floor(idx / cols) * (boxHeight + padding),
      value: num,
      width: boxWidth,
      height: boxHeight,
    }));
    setApples(appleArray);

    imgRef.current.onload = () => drawApples(ctx, appleArray);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    setDragEnd(null);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    setDragEnd({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (!dragStart || !dragEnd) return;

    const x1 = Math.min(dragStart.x, dragEnd.x);
    const y1 = Math.min(dragStart.y, dragEnd.y);
    const x2 = Math.max(dragStart.x, dragEnd.x);
    const y2 = Math.max(dragStart.y, dragEnd.y);

    const selectedApples = apples.filter(
      ({ x, y, width, height }) =>
        x + width > x1 && x < x2 && y + height > y1 && y < y2,
    );

    const sum = selectedApples.reduce((acc, apple) => acc + apple.value, 0);
    if (sum === 10) {
      setApples((prevApples) => {
        const newApples = prevApples.filter(
          (apple) => !selectedApples.includes(apple),
        );
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) drawApples(ctx, newApples);

        return newApples;
      });
    }

    setDragStart(null);
    setDragEnd(null);

    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) drawApples(ctx, apples);
  };

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) drawApples(ctx, apples);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apples, dragStart, dragEnd]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="border border-gray-300 w-full h-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
}
