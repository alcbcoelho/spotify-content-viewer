import { VictoryPie, VictoryStyleInterface } from 'victory';
import { useDispatch } from 'react-redux';

import { PieChartItem, DEFAULT_CHART_COLOR } from '../../services/genreService';
import { setHoveredItemIndex } from '../../store/miscSlice';
import { colors as c, font } from '../../styles/global';
import * as S from './ChartStyle';
import { hiphenize } from '../../utils';

type Props = {
  title: string;
  colors: string[];
  data: PieChartItem[];
  className?: string;
};

const getPieStyle = (colors: string[]): VictoryStyleInterface => ({
  data: {
    fill: ({ index }) =>
      (index as number) <= colors.length - 1
        ? colors[index as number]
        : DEFAULT_CHART_COLOR
  },
  labels: {
    fill: c.white,
    fontFamily: font.family.display,
    fontSize: 14,
    textShadow: `1px 1px 0 ${c.black}`
  }
});

const scrollToLegend = (legendId: string) => {
  const legend = document.querySelector(`#${legendId}`);

  legend?.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

export default function PieChart({ className, colors, data, title }: Props) {
  const dispatch = useDispatch();

  return (
    <S.PieContainer
      className={`${className} spring-up`}
      title={title}
      titleMaxWidth={320}
    >
      <h3>{title}</h3>
      <div className="rotate">
        <VictoryPie
          padding={0}
          data={data}
          y={(datum) => datum.occurrenceCount}
          labelRadius={100}
          labels={() => ''}
          style={getPieStyle(colors)}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onMouseOver: () => [
                  {
                    target: 'data',
                    mutation: ({ index, datum, style }) => {
                      dispatch(setHoveredItemIndex(index));
                      scrollToLegend(hiphenize(datum.x));
                      return {
                        style: { ...style, stroke: c.white }
                      };
                    }
                  },
                  {
                    target: 'labels',
                    mutation: ({ datum }) => ({
                      text: `${datum.y}%`
                    })
                  }
                ],
                onMouseOut: () => [
                  {
                    target: 'data',
                    mutation: () => {
                      dispatch(setHoveredItemIndex(undefined));
                    }
                  },
                  {
                    target: 'labels',
                    mutation: () => ({ text: '' })
                  }
                ]
                // onHoveredChartItem: () => [
                //   {
                //     target: 'data',
                //     mutation: ({ style }) => {
                //       return {
                //         style: { ...style, stroke: c.white }
                //       };
                //     }
                //   },
                //   {
                //     target: 'labels',
                //     mutation: ({ datum }) => ({
                //       text: `${datum.y}%`
                //     })
                //   }
                // ]
              }
            },
            {
              target: 'labels',
              eventHandlers: {
                onMouseOver: () => [
                  {
                    mutation: ({ datum }) => ({
                      text: `${datum.y}%`
                    })
                  }
                ],
                onMouseOut: () => [
                  {
                    mutation: () => ({ text: '' })
                  }
                ]
                // onHoveredChartItem: () => [
                //   {
                //     mutation: ({ datum }) => ({
                //       text: `${datum.y}%`
                //     })
                //   }
                // ]
              }
            }
          ]}
        />
      </div>
    </S.PieContainer>
  );
}
