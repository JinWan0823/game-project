interface TitleProps {
  title: string;
}

export default function TitleWrap({ title }: TitleProps) {
  return (
    <div className="text-center">
      <h1 className="text-4xl">Mini Game Night</h1>
      <h2 className="text-8xl point">{title}</h2>
    </div>
  );
}
