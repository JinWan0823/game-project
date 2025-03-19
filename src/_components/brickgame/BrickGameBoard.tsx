'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

interface BrickGameProps {
  setScore: Dispatch<SetStateAction<number>>;
  handleGameFinish: () => void;
}

export default function BrickGameBoard({
  setScore,
  handleGameFinish,
}: BrickGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [stage, setStage] = useState(1);

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

  const generateBricks = () =>
    Array.from({ length: brickRowCount }, (_, row) =>
      Array.from({ length: brickColumnCount }, (_, col) => ({
        x: col * (brickWidth + brickPadding) + brickOffsetLeft,
        y: row * (brickHeight + brickPadding) + brickOffsetTop,
        status: 1, // 1 = 벽돌 존재, 0 = 깨짐
      })),
    );

  const bricksRef = useRef(generateBricks());

  const checkStageClear = () => {
    const remainingBricks = bricksRef.current
      .flat()
      .some((brick) => brick.status === 1);
    if (!remainingBricks) {
      setStage((prev) => prev + 1);
    }
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
            brick.status = 0;
            setScore((prev) => prev + 1);
            checkStageClear();

            // 충돌 방향 감지
            const dx = ball.x - (brick.x + brickWidth / 2);
            const dy = ball.y - (brick.y + brickHeight / 2);

            if (Math.abs(dx) > Math.abs(dy)) {
              ball.dx = -ball.dx;
            } else {
              ball.dy = -ball.dy;
            }
          }
        }
      });
    });
  };

  const updateBallPosition = () => {
    if (isGameOver) return;

    const ball = ballRef.current;
    const paddle = paddleRef.current;

    let newX = ball.x + ball.dx;
    let newY = ball.y + ball.dy;

    if (
      newX - ball.radius <= 0 ||
      newX + ball.radius >= canvasRef.current!.width
    ) {
      ball.dx = -ball.dx;
    }
    if (newY - ball.radius <= 0) {
      ball.dy = -ball.dy;
    }

    if (
      newY + ball.radius >= paddle.y &&
      newX >= paddle.x &&
      newX <= paddle.x + paddle.width
    ) {
      ball.dy = -Math.abs(ball.dy);
      ball.y = paddle.y - ball.radius;
    }

    if (newY + ball.radius > canvasRef.current!.height) {
      setIsGameOver(true);
      handleGameFinish();
      return;
    }

    checkCollision();

    ball.x += ball.dx;
    ball.y += ball.dy;
  };

  useEffect(() => {
    if (ctx) {
      const gameLoop = () => {
        const canvas = canvasRef.current;
        if (!canvas) return; // Early return if canvasRef is null

        if (isGameOver) return;
        ctx.clearRect(
          0,
          0,
          canvasRef.current!.width,
          canvasRef.current!.height,
        );
        bricksRef.current.forEach((row) =>
          row.forEach((brick) => {
            if (brick.status === 1) {
              ctx.fillStyle = '#FF5733';
              ctx.fillRect(brick.x, brick.y, brickWidth, brickHeight);
            }
          }),
        );
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
        ctx.fillStyle = '#0095DD';
        ctx.fillRect(
          paddleRef.current.x,
          paddleRef.current.y,
          paddleRef.current.width,
          paddleRef.current.height,
        );
        updateBallPosition();
        requestAnimationFrame(gameLoop);
      };
      requestAnimationFrame(gameLoop);
    }
  }, [ctx, isGameOver]);

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
    const handleMouseMove = (event: MouseEvent) => {
      if (isGameOver) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      let newX = event.clientX - rect.left - paddleRef.current.width / 2;
      newX = Math.max(
        0,
        Math.min(newX, canvas.width - paddleRef.current.width),
      );
      paddleRef.current.x = newX;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isGameOver]);

  useEffect(() => {
    bricksRef.current = generateBricks();
    ballRef.current = {
      x: 250,
      y: 250,
      dx: 6 + stage, // 스테이지 증가에 따라 속도 증가
      dy: -(6 + stage),
      radius: 10,
    };
  }, [stage]);

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-2 left-2 text-white bg-[--pointcolor] px-4 py-2 rounded">
        Stage: {stage}
      </div>
      <canvas
        ref={canvasRef}
        className="border border-gray-300"
        width={1140}
        height={600}
      />
    </div>
  );
}
