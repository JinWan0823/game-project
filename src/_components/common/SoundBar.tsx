'use client';

import React, { Dispatch, SetStateAction, useRef } from 'react';

interface VolumeProps {
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
}

export default function SoundBar({ volume, setVolume }: VolumeProps) {
  const barRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!barRef.current) return;

    const barRect = barRef.current.getBoundingClientRect();

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
      className="sound-bar w-[120px] h-[8px] bg-[#335782] relative cursor-pointer"
      onMouseDown={handleMouseDown}
    >
      <div
        className="sound-vol w-[8px] h-[8px] bg-[#fff] rounded-xl absolute"
        style={{ left: `${(volume / 100) * 120 - 4}px` }}
      />
    </div>
  );
}
