'use client';

import { useEffect, useRef, useState } from 'react';

export default function BrickGameBoard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const [ball, setBall] = useState({
    x: 250,
    y: 250,
    dx: 2,
    dy: -2,
    radius: 10,
  });
  const [paddle, setPaddle] = useState({
    width: 100,
    height: 10,
    x: 200,
    y: 590,
  });

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
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  };

  const drawPaddle = () => {
    if (!ctx) return;
    ctx.fillStyle = '#0095DD';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  };

  const updateBallPosition = () => {
    setBall((prev) => {
      let newX = prev.x + prev.dx;
      let newY = prev.y + prev.dy;
      let newDx = prev.dx;
      let newDy = prev.dy;

      // 벽 충돌 감지
      if (
        newX - prev.radius <= 0 ||
        newX + prev.radius >= canvasRef.current!.width
      ) {
        newDx = -prev.dx;
      }
      if (newY - prev.radius <= 0) {
        newDy = -prev.dy;
      }

      // 바와 충돌 감지 (정확한 반사 구현)
      if (
        newY + prev.radius >= paddle.y &&
        newX >= paddle.x &&
        newX <= paddle.x + paddle.width
      ) {
        newDy = -Math.abs(prev.dy); // 위로 튕기게 처리
        newY = paddle.y - prev.radius; // 공이 바 내부로 들어가지 않게 조정
      }

      // 게임 오버 (공이 바닥에 닿았을 때)
      if (newY + prev.radius > canvasRef.current!.height) {
        alert('Game Over!');
        return { x: 250, y: 250, dx: 2, dy: -2, radius: 10 };
      }

      return { x: newX, y: newY, dx: newDx, dy: newDy, radius: prev.radius };
    });
  };

  useEffect(() => {
    let animationFrameId: number;

    const gameLoop = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      drawBall();
      drawPaddle();
      updateBallPosition();
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [ctx, paddle]);

  const handleMouseMove = (event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    let newX = event.clientX - rect.left - paddle.width / 2;
    newX = Math.max(0, Math.min(newX, canvas.width - paddle.width));
    setPaddle((prev) => ({ ...prev, x: newX }));
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="border border-gray-300"
        width={1160}
        height={600}
      />
    </div>
  );
}
