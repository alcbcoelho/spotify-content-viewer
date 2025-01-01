import { useRef } from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTooltip } from 'victory';
import { useDispatch } from 'react-redux';

import * as S from './ChartStyle';
import DownloadButton from './DownloadButton';
import { BarChartItem } from '../../services/genreService';
import { colors as c, font } from '../../styles/global';
import { capitalizeStrings, hiphenize } from '../../utils';
import { setHoveredItemIndex } from '../../store/miscSlice';

type Props = {
  title: string;
  colors: string[];
  data: BarChartItem[];
  numberOfGenresToDisplay: number;
  className?: string;
};

const PRINT_ID = 'bar-chart';
const FILTER_OUT_ID = 'download-btn';

export default function BarChart({
  title,
  colors,
  data,
  numberOfGenresToDisplay,
  className
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const getMaxDomainY = (data: BarChartItem[]) => {
    return data
      .map((i) => i.y)
      .splice(0, numberOfGenresToDisplay)
      .sort((a, b) => b - a)[0];
  };

  const fileName = hiphenize(title.toLowerCase());

  return (
    <S.BarChart
      id={PRINT_ID}
      className={className ? `${className} spring-up` : 'spring-up'}
      ref={ref}
    >
      <h3>{title}</h3>
      <div>
        <VictoryChart
          padding={{
            top: 32,
            right: 64,
            bottom: 32,
            left: 100
          }}
          domain={{
            x: [0, numberOfGenresToDisplay],
            y: [0, getMaxDomainY(data)]
          }}
          title={title}
          height={400}
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
                fill: c.gray.light,
                padding: 80
              }
            }}
            label="Genre"
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(tick) => Math.trunc(tick)}
            offsetY={72}
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
                fill: c.gray.light,
                padding: 40
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
                          setHoveredItemIndex(
                            numberOfGenresToDisplay - 1 - index
                          )
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
        <DownloadButton
          id={FILTER_OUT_ID}
          elementToPrintId={PRINT_ID}
          elementToFilterOutId={FILTER_OUT_ID}
          fileName={fileName}
        />
      </div>
    </S.BarChart>
  );
}
