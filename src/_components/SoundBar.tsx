'use client';

import React, { useRef, useState } from 'react';

export default function SoundBar() {
  const [volume, setVolume] = useState(50);
  const barRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!barRef.current) return;

    const bar = barRef.current;
    const barRect = bar.getBoundingClientRect();

    const updateVolume = (clientX: number) => {
      let newVolume = ((clientX - barRect.left) / barRect.width) * 100;
      newVolume = Math.min(100, Math.max(0, newVolume));
      setVolume(newVolume);
    };

    updateVolume(e.clientX);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      updateVolume(moveEvent.clientX);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={barRef}
      role="slider"
      aria-label="Volume control"
      aria-valuenow={volume}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      className="sound-bar w-[120px] h-[8px] bg-[#335782] relative"
      onMouseDown={handleMouseDown}
    >
      <div
        className="sound-vol w-[8px] h-[8px] bg-[#fff] rounded-xl absolute cursor-pointer"
        style={{ left: `${(volume / 100) * 120 - 4}px` }}
      />
    </div>
  );
}
