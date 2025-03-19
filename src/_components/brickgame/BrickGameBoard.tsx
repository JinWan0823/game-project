'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

interface BrickGameProps {
  setScore: Dispatch<SetStateAction<number>>;
}

export default function BrickGameBoard({ setScore }: BrickGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const ballRef = useRef({ x: 250, y: 250, dx: 6, dy: -6, radius: 10 });
  const paddleRef = useRef({ width: 100, height: 10, x: 200, y: 590 });

  // 벽돌 설정
  const brickRowCount = 5;
  const brickColumnCount = 10;
  const brickWidth = 100;
  const brickHeight = 30;
  const brickPadding = 10;
  const brickOffsetTop = 50;
  const brickOffsetLeft = 30;

  const bricksRef = useRef(
    Array.from({ length: brickRowCount }, (_, row) =>
      Array.from({ length: brickColumnCount }, (_, col) => ({
        x: col * (brickWidth + brickPadding) + brickOffsetLeft,
        y: row * (brickHeight + brickPadding) + brickOffsetTop,
        status: 1, // 1 = 벽돌 존재, 0 = 깨짐
      })),
    ),
  );

  const drawBricks = () => {
    if (!ctx) return;

    bricksRef.current.forEach((row) => {
      row.forEach((brick) => {
        if (brick.status === 1) {
          ctx.fillStyle = '#FF5733';
          ctx.fillRect(brick.x, brick.y, brickWidth, brickHeight);
        }
      });
    });
  };

  const checkCollision = () => {
    const ball = ballRef.current;

    bricksRef.current.forEach((row) => {
      row.forEach((brick) => {
        if (brick.status === 1) {
          if (
            ball.x + ball.radius > brick.x &&
            ball.x - ball.radius < brick.x + brickWidth &&
            ball.y + ball.radius > brick.y &&
            ball.y - ball.radius < brick.y + brickHeight
          ) {
            // 벽돌 제거
            brick.status = 0;
            setScore((prev) => prev + 1);

            // 충돌 방향 감지 (수평 또는 수직 충돌 판별)
            const ballCenterX = ball.x;
            const ballCenterY = ball.y;
            const brickCenterX = brick.x + brickWidth / 2;
            const brickCenterY = brick.y + brickHeight / 2;
            const dx = ballCenterX - brickCenterX;
            const dy = ballCenterY - brickCenterY;

            if (Math.abs(dx) > Math.abs(dy)) {
              // 좌우 반사
              ball.dx = -ball.dx;
              if (dx > 0) {
                ball.x = brick.x + brickWidth + ball.radius; // 오른쪽에서 충돌
              } else {
                ball.x = brick.x - ball.radius; // 왼쪽에서 충돌
              }
            } else {
              // 위아래 반사
              ball.dy = -ball.dy;
              if (dy > 0) {
                ball.y = brick.y + brickHeight + ball.radius; // 아래에서 충돌
              } else {
                ball.y = brick.y - ball.radius; // 위에서 충돌
              }
            }
          }
        }
      });
    });
  };
  const updateBallPosition = () => {
    const ball = ballRef.current;
    const paddle = paddleRef.current;

    let newX = ball.x + ball.dx;
    let newY = ball.y + ball.dy;

    // 벽 충돌 감지
    if (
      newX - ball.radius <= 0 ||
      newX + ball.radius >= canvasRef.current!.width
    ) {
      ball.dx = -ball.dx; // 반사
    }
    if (newY - ball.radius <= 0) {
      ball.dy = -ball.dy; // 반사
    }

    // 바와 충돌 감지
    if (
      newY + ball.radius >= paddle.y &&
      newX >= paddle.x &&
      newX <= paddle.x + paddle.width
    ) {
      ball.dy = -Math.abs(ball.dy);
      ball.y = paddle.y - ball.radius;
    }

    // 게임 오버 감지 (공이 바닥에 닿았을 때)
    if (newY + ball.radius > canvasRef.current!.height) {
      alert('Game Over!');
      Object.assign(ballRef.current, { x: 250, y: 250, dx: 6, dy: -6 });
      return;
    }

    // 벽돌 충돌 감지
    checkCollision();

    // 공 위치 업데이트
    ball.x += ball.dx;
    ball.y += ball.dy;
  };

  const drawBall = () => {
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(
      ballRef.current.x,
      ballRef.current.y,
      ballRef.current.radius,
      0,
      Math.PI * 2,
    );
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  };

  const drawPaddle = () => {
    if (!ctx) return;
    ctx.fillStyle = '#0095DD';
    ctx.fillRect(
      paddleRef.current.x,
      paddleRef.current.y,
      paddleRef.current.width,
      paddleRef.current.height,
    );
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        setCtx(context);
      }
    }
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const gameLoop = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      drawBricks();
      drawBall();
      drawPaddle();
      updateBallPosition();
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [ctx]);

  const handleMouseMove = (event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    let newX = event.clientX - rect.left - paddleRef.current.width / 2;
    newX = Math.max(0, Math.min(newX, canvas.width - paddleRef.current.width));
    paddleRef.current = { ...paddleRef.current, x: newX };
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
        width={1140}
        height={600}
      />
    </div>
  );
}
