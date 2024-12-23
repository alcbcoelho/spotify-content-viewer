import styled from 'styled-components';
import { colors, font } from '../../styles/global';
import { forwardRef } from 'react';

type Props = {
  data: TopItems;
  type: 'artists' | 'tracks';
};

type SubcomponentProps = Pick<Props, 'type'> & {
  item: Artist | Track;
};

export const GRID_ITEM_SIZE = 320;
export const GRID_ITEM_QUANTITY = 9;

const GridStyle = styled.div`
  max-width: calc(${GRID_ITEM_SIZE}px * 3);
  width: 100%;
  // margin: 0 auto;
  display: grid;
  grid-template-columns: auto auto auto;

  animation-name: spring-up;
  animation-duration: 0.375s;

  border-radius: 16px;
  transition: background-color 0.2s, box-shadow 0.2s;

  // &:hover {
  //   background-color: ${colors.green.light};
  //   box-shadow: 0 0 128px ${colors.green.light + '3f'};
  // }

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
      width: ${GRID_ITEM_SIZE}px;
      height: ${GRID_ITEM_SIZE}px;
      content: '';
    }

    img {
      width: ${GRID_ITEM_SIZE}px;
      height: ${GRID_ITEM_SIZE}px;
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
    }
  }
`;

const Image = ({ item, type }: SubcomponentProps) => {
  if (type === 'artists')
    return (
      <img
        src={(item as Artist).images[0].url}
        alt={item.name}
        title={item.name}
      />
    );
  if (type === 'tracks')
    return (
      <img
        src={(item as Track).album.images[0].url}
        alt={`${(item as Track).album.artists[0].name} - ${item.name}`}
        title={`${(item as Track).album.artists[0].name} - ${item.name}`}
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

const ItemsGrid = forwardRef<HTMLDivElement, Props>(({ data, type }, ref) => (
  <GridStyle ref={ref}>
    {data.items.map((i) => (
      <div key={i.id}>
        <Image item={i} type={type} />
        <Caption item={i} type={type} />
      </div>
    ))}
  </GridStyle>
));

export default ItemsGrid;
