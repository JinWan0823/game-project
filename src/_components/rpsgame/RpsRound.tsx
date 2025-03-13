interface Props {
  result: 'win' | 'lose' | 'draw' | 'gray'; // result 타입을 명확히 지정
}

export default function RpsRound({ result }: Props) {
  const colors = {
    win: 'bg-green-500',
    lose: 'bg-red-500',
    draw: 'bg-blue-500',
    gray: 'bg-gray-500',
  };

  return <li className={`w-6 h-6 mx-1 rounded-full ${colors[result]}`} />;
}
