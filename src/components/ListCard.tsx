'use client';

import { useState } from 'react';

interface GameProps {
  game: string;
}

export default function ListCard({ game }: GameProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left - width / 2) / width) * 20; // x축 회전 값
    const y = ((e.clientY - top - height / 2) / height) * 20; // y축 회전 값

    setRotation({ x: -y, y: x });
  };
  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <li
      className="p-[12px] bg-white rounded-lg shadow-[5px_5px_15px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(0,0,0,0.1)] border border-gray-200 transition-all duration-300 hover:border-gray-300"
      style={{
        transform: `perspective(500px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <figure>
        <div className="w-full h-[220px] bg-[#333]" />
      </figure>
      <div className="p-[4px]">
        <h2 className="text-xl point">{game}</h2>
        <p className="text-[#333]">Best Score : 10,000</p>
        <p className="text-[#333]">My Score : 600 </p>
      </div>
    </li>
  );
}
