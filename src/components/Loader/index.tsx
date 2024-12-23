import Style from './LoaderStyle';

export type LoaderProps = {
  width?: number;
  height?: number;
  color?: string;
  gap?: number;
  speed?: string;
  scale?: number;
};

const NUMBER_OF_BARS = 5;
const ANIMATION_DELAY = 0.1;

const arr: string[] = [];
for (let i = 1; i <= NUMBER_OF_BARS; i++) {
  arr[i] = (ANIMATION_DELAY * i).toFixed(1) + 's';
}

export default function Loader(props: LoaderProps) {
  return (
    <Style {...props}>
      {arr.map((i, index) => (
        <div key={index} style={{ animationDelay: i }} />
      ))}
    </Style>
  );
}
