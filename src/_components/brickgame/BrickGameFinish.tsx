interface ScoreProps {
  score: number;
  handleGameReset: () => void;
}

export default function BrickGameFinish({
  score,
  handleGameReset,
}: ScoreProps) {
  return (
    <div className="z-[99999] absolute w-full h-full flex justify-center items-center bg-[#333333b5] top-0 left-0">
      <div className="text-center">
        <h2 className="text-4xl point">GAME OVER</h2>
        <p className="text-6xl text-[#333]">{score}</p>
        <button
          type="button"
          className="btn-13 mt-[20px]"
          onClick={handleGameReset}
        >
          RESET !
        </button>
      </div>
    </div>
  );
}
