import styled from 'styled-components';
import { LoaderProps } from '.';

import { colors } from '../../styles/global';

type StyleProps = LoaderProps;

const DEFAULT_GAP = 4;
const DEFAULT_HEIGHT = 40;
const DEFAULT_WIDTH = 4;
const DEFAULT_SCALE = 1;

export default styled.div<StyleProps>`
  @keyframes loading {
    0% {
      transform: scaleY(0.15);
      border-radius: 40%;
    }
    50% {
      transform: scaleY(1);
      border-radius: 16px;
    }
    100% {
      transform: scaleY(0.15);
      border-radius: 40%;
    }
  }

  display: flex;
  gap: ${({ gap, scale }) => setGap(gap, scale)};
  align-items: center;
  justify-content: center;
  height: calc(100vh - 50.8px - 32px - 72px);

  > div {
    width: ${({ width, scale }) => setWidth(width, scale)};
    height: ${({ height, scale }) => setHeight(height, scale)};
    background-color: ${({ color }) => color || colors.green.default};
    border-radius: 16px;

    animation-name: loading;
    animation-duration: ${({ speed }) => speed || '1s'};
    animation-iteration-count: infinite;
    animation-direction: reverse;
  }
`;

const setGap = (gap = DEFAULT_GAP, scale = DEFAULT_SCALE): string => {
  return gap * scale + 'px';
};

const setHeight = (height = DEFAULT_HEIGHT, scale = DEFAULT_SCALE): string => {
  return height * scale + 'px';
};

const setWidth = (width = DEFAULT_WIDTH, scale = DEFAULT_SCALE): string => {
  return width * scale + 'px';
};
