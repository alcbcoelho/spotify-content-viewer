import { VictoryAxis, VictoryBar, VictoryChart, VictoryTooltip } from 'victory';
import { useDispatch, useSelector } from 'react-redux';

import * as S from './ChartStyle';
import { BarChartItem } from '../../services/genreService';
import { colors as c, font } from '../../styles/global';
import { capitalizeStrings } from '../../utils';
import { setHoveredItemIndex } from '../../store/miscSlice';
import { RootState } from '../../store';

type Props = {
  colors: string[];
  data: BarChartItem[];
  numberOfGenresToDisplay: number;
  className?: string;
};

export default function BarChart({
  colors,
  data,
  numberOfGenresToDisplay,
  className
}: Props) {
  const dispatch = useDispatch();
  const collapse = useSelector(
    (state: RootState) => state.misc.chart.collapseLessPlayedGenres
  );

  const getMaxDomainY = (data: BarChartItem[]) => {
    return data
      .map((i) => i.y)
      .splice(0, numberOfGenresToDisplay)
      .sort((a, b) => b - a)[0];
  };

  return (
    <S.BarChart className={`${className} spring-up`}>
      <VictoryChart
        padding={{
          top: collapse ? 40 : 0,
          right: 64,
          bottom: collapse ? 8 : 0,
          left: 100
        }}
        domain={{
          x: [0, numberOfGenresToDisplay],
          y: [0, getMaxDomainY(data)]
        }}
        // maxDomain={{
        //   x: 5,
        //   y: getMaxDomainY(data)
        // }}
        // domainPadding={{ x: 30 }}
        desc={`Top ${numberOfGenresToDisplay} most frequent genres amongst most listened artists`}
      >
        <VictoryAxis
          crossAxis
          tickFormat={(tick) => capitalizeStrings(tick.split(' '))}
          style={{
            tickLabels: {
              fill: c.white,
              fontSize: 12,
              fontFamily: font.family.default
            },
            axis: {
              stroke: 'transparent'
            },
            axisLabel: {
              fontSize: 10,
              fontFamily: font.family.display,
              fill: c.gray.default,
              padding: 80
            }
          }}
          label="Genre"
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(tick) => Math.trunc(tick)}
          offsetY={48}
          style={{
            tickLabels: {
              fill: c.white,
              fontSize: 12,
              fontFamily: font.family.default
            },
            axis: {
              stroke: 'transparent'
            },
            axisLabel: {
              fontSize: 10,
              fontFamily: font.family.display,
              fill: c.gray.default,
              padding: 30
            }
          }}
          label="Number of occurrences of genre amongst top played artists"
        />
        <VictoryBar
          horizontal
          data={data}
          style={{
            data: {
              fill: ({ index }) =>
                colors.filter((i) => i !== c.gray.darker).reverse()[
                  index as number
                ]
            }
          }}
          cornerRadius={2}
          labelComponent={
            <VictoryTooltip
              flyoutStyle={{
                stroke: 'none',
                fill: c.white
              }}
              flyoutWidth={24}
              flyoutHeight={24}
              style={{
                fontSize: 12,
                color: c.black
              }}
              pointerWidth={8}
            />
          }
          labels={({ datum }) => datum.y}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onMouseOver: () => [
                  {
                    mutation: ({ index, style }) => {
                      dispatch(
                        setHoveredItemIndex(numberOfGenresToDisplay - 1 - index)
                      );
                      return {
                        style: { ...style, stroke: c.white, strokeWidth: 1 }
                      };
                    }
                  },
                  {
                    target: 'labels',
                    mutation: () => ({
                      active: true
                    })
                  }
                ],
                onMouseOut: () => [
                  {
                    mutation: () => {
                      dispatch(setHoveredItemIndex(undefined));
                    }
                  },
                  {
                    target: 'labels',
                    mutation: () => ({
                      active: undefined
                    })
                  }
                ],
                onFocus: () => ({
                  target: 'labels',
                  mutation: () => ({
                    active: true
                  })
                }),
                onBlur: () => ({
                  target: 'labels',
                  mutation: () => ({
                    active: undefined
                  })
                })
              }
            }
          ]}
        />
      </VictoryChart>
    </S.BarChart>
  );
}
