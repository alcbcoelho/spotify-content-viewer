import { forwardRef, useState, useEffect } from 'react';

import styled from 'styled-components';

import { CONTAINER_ID } from '../../pages/Viewer';
import { breakpoints, colors, font } from '../../styles/global';

type Props = {
  data: TopItems;
  type: 'artists' | 'tracks';
  onResize?: React.ReactEventHandler<HTMLDivElement>;
};

type SubcomponentProps = Pick<Props, 'type'> & {
  item: Artist | Track;
};

export const GRID_ITEM_QUANTITY = 9;
const numberOfColumns = 3;

const GridStyle = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${numberOfColumns}, auto);

  animation-name: spring-up;
  animation-duration: 0.375s;

  > div {
    position: relative;

    &:nth-of-type(1) {
      &::after,
      img {
        border-top-left-radius: 4px;
      }
    }

    &:nth-of-type(3) {
      &::after,
      img {
        border-top-right-radius: 4px;
      }
    }

    &:nth-of-type(7) {
      &::after,
      img {
        border-bottom-left-radius: 4px;
      }
    }

    &:nth-of-type(9) {
      &::after,
      img {
        border-bottom-right-radius: 4px;
      }
    }

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      background-image: linear-gradient(
        0deg,
        ${colors.black + 'e8'} 0%,
        ${colors.black + '00'} 50%
      );
      width: 100%;
      height: 100%;
      content: '';
    }

    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }

    .grid-item-caption {
      font-size: ${font.size.default};
      user-select: none;
      position: absolute;
      bottom: 8px;
      right: 8px;
      z-index: 2;
      text-align: right;

      p {
        font-size: ${font.size.small};
      }

      @media screen and (max-width: ${breakpoints.mobile.maxWidth}) {
        bottom: 4px;
        right: 4px;
        font-size: ${font.size.extraSmall};

        p {
          font-size: ${font.size.micro};
        }
      }
    }
  }
`;

const getClientWidthFromElement = (id: string) =>
  document.getElementById(id)?.clientWidth;

const Image = ({ item, type }: SubcomponentProps) => {
  if (type === 'artists')
    return <img src={(item as Artist).images[0].url} alt={item.name} />;
  if (type === 'tracks')
    return (
      <img
        src={(item as Track).album.images[0].url}
        alt={`${(item as Track).album.artists[0].name} - ${item.name}`}
      />
    );
};

const Caption = ({ item, type }: SubcomponentProps) => {
  if (type === 'artists')
    return <h3 className="grid-item-caption">{item.name}</h3>;
  if (type === 'tracks')
    return (
      <div className="grid-item-caption">
        <h3>{item.name}</h3>
        <p>
          by{' '}
          <span className="tw-font-bold">
            {(item as Track).album.artists[0].name}
          </span>
        </p>
      </div>
    );
};

const ItemsGrid = forwardRef<HTMLDivElement, Props>(({ data, type }, ref) => {
  const [containerWidth, setContainerWidth] = useState<number | undefined>(
    getClientWidthFromElement(CONTAINER_ID)
  );

  useEffect(() => {
    function updateContainerWidth() {
      const cWidth = getClientWidthFromElement(CONTAINER_ID);

      if (cWidth !== containerWidth) setContainerWidth(cWidth);
    }

    updateContainerWidth();

    window.addEventListener('resize', updateContainerWidth);
    return () => window.removeEventListener('resize', updateContainerWidth);
  }, [containerWidth]);

  return (
    <GridStyle id="grid" ref={ref}>
      {data.items.map((i) => (
        <div
          id={i.id}
          key={i.id}
          title={
            type === 'artists'
              ? i.name
              : `${(i as Track).album.artists[0].name} - ${i.name}`
          }
          style={{
            height: (containerWidth as number) / numberOfColumns
          }}
        >
          <Image item={i} type={type} />
          <Caption item={i} type={type} />
        </div>
      ))}
    </GridStyle>
  );
});

export default ItemsGrid;
