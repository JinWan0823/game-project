export interface Apple {
  x: number;
  y: number;
  value: number;
  width: number;
  height: number;
}

export const drawAppleShape = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
) => {
  ctx.save();
  ctx.translate(x, y);

  // 🌿 꼭지 (갈색)
  ctx.beginPath();
  ctx.moveTo(0, -size * 0.6);
  ctx.lineTo(size * 0.1, -size * 0.8);
  ctx.lineWidth = size * 0.1;
  ctx.strokeStyle = '#5C4033'; // 갈색
  ctx.stroke();

  // 🍃 잎사귀 (녹색)
  ctx.beginPath();
  ctx.moveTo(size * 0.2, -size * 0.6);
  ctx.quadraticCurveTo(size * 0.5, -size, size * 0.7, -size * 0.6);
  ctx.quadraticCurveTo(size * 0.5, -size * 0.2, size * 0.2, -size * 0.6);
  ctx.fillStyle = '#2E8B57'; // 녹색
  ctx.fill();

  // 🍎 사과 본체 (빨간색)
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
  ctx.fillStyle = '#FF0000'; // 빨간색
  ctx.fill();
  ctx.strokeStyle = '#AA0000';
  ctx.lineWidth = size * 0.05;
  ctx.stroke();

  ctx.restore();
};

export const drawApples = (
  ctx: CanvasRenderingContext2D,
  apples: Apple[],
  isDragging: boolean,
  dragStart: { x: number; y: number } | null,
  dragEnd: { x: number; y: number } | null,
) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  apples.forEach(({ x, y, value, width }) => {
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
    apples.forEach(({ x, y, width, height }) => {
      if (x + width > x1 && x < x2 && y + height > y1 && y < y2) {
        ctx.strokeRect(x, y, width, height);
      }
    });
  }
};
