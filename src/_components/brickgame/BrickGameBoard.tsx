'use client';

import { useEffect, useRef, useState } from 'react';

export default function BrickGameBoard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [dx, setDx] = useState(2);
  const [dy, setDy] = useState(-2);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        setCtx(context);
      }
    }
  }, []);

  const drawBall = () => {
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  };

  const draw = () => {
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    drawBall();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setX((prevX) => {
        const newX = prevX + dx;
        if (newX > canvasRef.current!.width || newX < 0) {
          setDx(-dx);
        }
        return newX;
      });

      setY((prevY) => {
        const newY = prevY + dy;
        if (newY > canvasRef.current!.height || newY < 0) {
          setDy(-dy);
        }
        return newY;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [dx, dy]);

  useEffect(() => {
    draw();
  }, [x, y]); // x와 y 값이 바뀔 때마다 draw 함수 호출
  return (
    <div className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="border border-gray-300 w-full h-full"
        width={500}
        height={500}
      />
    </div>
  );
}
