import styled from 'styled-components';

import { colors, font } from '../../styles/global';
import { chartColors, DEFAULT_CHART_COLOR } from '../../services/genreService';

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

export const ChartContainer = styled.div`
  // display: grid;
  // grid-template-columns: 52% 48%;
  // gap: 32px;

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
    // border: 1px red solid; //
  }

  .chart-container {
    display: grid;
    grid-template-columns: 52% auto;
    column-gap: 32px;
    margin-bottom: 32px;
    align-items: stretch;
  }
`;

export const PieContainer = styled.div`
  // display: flex;
  // flex-direction: column;
  // align-items: stretch;
  // justify-content: center;

  // width: 100%;
`;

export const LegendContainer = styled.div<LegendContainerProps>`
  position: relative;
  display: grid;
  grid-column: span 2 / span 2;
  grid-template-columns: 1fr 1fr;
  max-width: ${({ collapseLessPlayedGenres }) =>
    collapseLessPlayedGenres ? '52%' : '100%'};
  transition: max-width ease-in-out 0.75s;

  border: 2px ${colors.white} solid;
  border-radius: 8px;
  padding: 16px 20px;

  div {
    margin-top: 4px;
    position: relative;

    display: none;
    opacity: 0;
    transition: opacity 0.15s, display 0.15s allow-discrete;

    max-height: 188px;

    h3 {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      position: absolute;
      top: -12px;
      left: calc(50% - 60px / 3);
      z-index: 1;
      font-family: ${font.family.display};
      font-size: ${font.size.default};
      background-color: ${colors.gray.dark};
      color: ${colors.white};
    }

    ul {
      height: 100%;
      border: 1px ${colors.gray.default} solid;
      border-radius: 8px;
      padding: 16px 20px;

      li::before {
        background-color: ${DEFAULT_CHART_COLOR};
      }

      overflow-y: scroll;
      scrollbar-color: ${colors.gray.default} ${colors.gray.dark};
      scrollbar-width: thin;
    }
  }

  ul {
    text-transform: capitalize;

    li {
      display: flex;
      align-items: center;

      font-size: ${font.size.default};
      line-height: 2rem;

      &::before {
        display: inline-block;
        margin-right: 12px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: ${DEFAULT_CHART_COLOR};
        border: 1px ${colors.white} solid;
        content: '';
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
    transition: opacity 0.15s 0.75s, display 0.15s 0.75s allow-discrete;
  }

  @starting-style {
    .show {
      opacity: 0;
    }
  }
`;

export const ExpandButton = styled.button`
  display: inline-block;
  border-radius: 0;
  padding: 0;
  margin-left: 8px;
`;

export const BarChart = styled.div`
  background-color: ${colors.gray.darker};
  border-radius: 8px;
  width: 100%;
  height: 100%;
`;
