import { useRef } from 'react';
import { toPng } from 'html-to-image';

import ItemsGrid from './ItemsGrid';
import Button from '../Button';
import { FlexContainer } from '../../containers';

type Props = {
  type: 'artists' | 'tracks';
  data: TopItems;
};

export default function TabContent({ type, data }: Props) {
  const grid = useRef(null);

  const generatePng = async (element: HTMLElement) => {
    try {
      const imgUrl = await toPng(element);
      const blob = await fetch(imgUrl).then((res) => res.blob());
      const url = URL.createObjectURL(blob);

      window.open(url, '_blank');

      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (e) {
      console.error('Error generating image: ' + e);
    }
  };

  if (!data) return <p>There has been an error loading the content</p>;

  return (
    <FlexContainer>
      <ItemsGrid data={data as TopItems} type={type} ref={grid} />
      <Button
        className="tw-mt-8"
        onClick={() => grid.current && generatePng(grid.current)}
      >
        Get in PNG format
      </Button>
    </FlexContainer>
  );
}
