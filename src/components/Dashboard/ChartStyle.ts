import styled from 'styled-components';

import { breakpoints, colors, font } from '../../styles/global';
import { chartColors, DEFAULT_CHART_COLOR } from '../../services/genreService';

type PieContainerProps = {
  titleMaxWidth: number;
};

type LegendContainerProps = {
  collapseLessPlayedGenres: boolean;
};

function getLegendIconCSSRules(colorArray: string[]) {
  let cssRule = '';

  colorArray.forEach((color, index) => {
    cssRule += `
    
      &:nth-of-type(${index + 1})::before {
        background-color: ${color};
      }`;
  });

  return cssRule;
}

export const PieContainer = styled.div<PieContainerProps>`
  display: grid;
  grid-template-rows: 80px auto;

  h3 {
    max-width: ${({ titleMaxWidth }) => titleMaxWidth + 'px' || 'none'};
    width: 100%;
    margin: 0 auto;
  }
`;

export const BarChart = styled.div`
  display: grid;
  grid-template-rows: 80px auto;

  border-radius: 8px;
  background-color: ${colors.gray.darker};

  position: relative;

  button {
    position: absolute;
    bottom: 0;
    right: 0;
    border: 1px ${colors.gray.default} solid;
    padding: 4px;
    margin: 8px;
    opacity: 0.5;

    transition: all 0.2s;

    svg {
      fill: ${colors.gray.default};
    }

    &:hover {
      border-color: ${colors.green.default};
      opacity: 1;

      svg {
        fill: ${colors.green.default};
      }
    }
  }

  h3 {
    height: 100%;
  }
`;

export const Dashboard = styled.div`
  display: flex;
  flex-direction: column;

  .spring-up {
    animation-name: spring-up;
    animation-duration: 0.5s;
  }

  .rotate {
    animation-name: rotate;
    animation-duration: 0.5s;
  }

  .legend-container--default-width {
    width: max-content;
    margin: 0 auto;
  }

  div {
    // border: 1px yellow solid; //
  }

  > div {
    // border: 1px red solid; //
  }

  .chart-container {
    display: grid;
    grid-template-columns: 52% auto;
    column-gap: 32px;
    margin-bottom: 32px;

    h3 {
      // border: 1px purple solid; //
      display: flex;
      align-items: center;
      justify-content: center;

      text-align: center;
      font-family: ${font.family.display};

      &::before,
      &::after {
        margin-top: 12px;
        display: inline-block;
        width: 80px;
        height: 1px;
        content: '';
      }

      &::before {
        background-image: linear-gradient(
          90deg,
          ${colors.white + '00'},
          ${colors.white} 50%
        );
        margin-right: 8px;
      }

      &::after {
        background-image: linear-gradient(
          90deg,
          ${colors.white} 50%,
          ${colors.white + '00'}
        );
        margin-left: 8px;
      }
    }

    @media screen and (max-width: ${breakpoints.mobile.maxWidth}) {
      grid-template-columns: none;
      column-gap: none;

      > div {
        grid-template-rows: none;

        h3 {
          padding: 16px;
        }
      }

      ${PieContainer} h3 {
        max-width: none;
      }
    }
  }

  @media screen and (max-width: ${breakpoints.mobile.maxWidth}) {
    display: block;
  }
`;

export const LegendContainer = styled.div<LegendContainerProps>`
  position: relative;
  align-self: flex-end;
  width: ${({ collapseLessPlayedGenres }) =>
    collapseLessPlayedGenres ? 'calc(48% - 32px)' : '100%'};

  display: grid;
  grid-template-columns: 1fr 1fr;

  border: 2px ${colors.white} solid;
  border-radius: 8px;
  padding: 16px 20px;

  transition: width ease-in-out 0.5s;

  h3 {
    position: absolute;
    top: -12px;
    left: calc(50% - 90px / 2);
    background-color: ${colors.gray.dark};
    color: ${colors.white};
    padding: 0 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  div {
    margin-top: 4px;
    position: relative;

    display: none;
    opacity: 0;
    transition: opacity 0.15s, display 0.15s allow-discrete;

    max-height: 200px;
    color: ${colors.gray.light};

    h4 {
      position: absolute;
      top: -12px;
      left: calc(50% - 48px / 2);

      display: flex;
      align-items: center;
      justify-content: center;

      padding: 0 12px;
      font-family: ${font.family.display};
      font-size: ${font.size.default};
      background-color: ${colors.gray.dark};
    }

    ul {
      height: 100%;
      border: 1px ${colors.gray.light} solid;
      border-radius: 8px;
      padding: 16px 20px;

      li::before {
        border-color: ${colors.gray.light};
        background-color: ${DEFAULT_CHART_COLOR};
      }

      overflow-y: scroll;
      scrollbar-color: ${colors.gray.light} ${colors.gray.dark};
      scrollbar-width: thin;
    }
  }

  ul {
    text-transform: capitalize;

    li {
      display: flex;
      align-items: center;

      font-size: ${font.size.default};
      margin-bottom: 12px;

      &:last-of-type {
        margin-bottom: 0;
      }

      &::before {
        display: inline-block;
        margin-right: 12px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: ${DEFAULT_CHART_COLOR};
        border: 1px ${colors.white} solid;
        content: '';
        flex-shrink: 0;
      }
    }
  }

  > ul {
    li {
      ${getLegendIconCSSRules(chartColors)}
    }
  }

  .show {
    opacity: 1;
    display: block;
    transition: opacity 0.15s 0.5s, display 0.15s 0.5s allow-discrete;
  }

  @starting-style {
    .show {
      opacity: 0;
    }
  }

  @media screen and (max-width: ${breakpoints.mobile.maxWidth}) {
    align-self: auto;
    width: 100%;
    transition: none;

    ul li {
      font-size: ${font.size.small};
    }

    div h4 {
      left: 32.5%;
    }

    .show {
      transition: opacity 0.15s, display 0.15s allow-discrete;
    }

    div {
      max-height: 164px;
    }
  }
`;

export const ExpandButton = styled.button`
  display: inline-block;
  border-radius: 0;
  padding: 0;
  margin-left: 8px;
`;
