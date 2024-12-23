import { useSelector } from 'react-redux';

import {
  getLegendData,
  PieChartLegendItem,
  chartColors
} from '../../services/genreService';
import { RootState } from '../../store';
import { colors } from '../../styles/global';
import * as S from './ChartStyle';
import OtherGenresButton from './OtherGenresButton';
import { hiphenize } from '../../utils';

type Props = {
  data: PieChartLegendItem[][];
  className?: string;
  getLegendDataArgs: Parameters<typeof getLegendData>;
};

export const LIST_ID = 'other';

export default function LegendContainer({ data, getLegendDataArgs }: Props) {
  const hoveredItemIndex = useSelector(
    (state: RootState) => state.misc.chart.hoveredItemIndex
  );
  const collapse = useSelector(
    (state: RootState) => state.misc.chart.collapseLessPlayedGenres
  );

  const staticData = getLegendData(...getLegendDataArgs);
  const [staticTopGenres, staticOtherGenres] = staticData;
  const staticGenresCollapsed = [...staticTopGenres, ...staticOtherGenres];

  const [, otherGenres] = data;

  const isLastItem = (legendItem: PieChartLegendItem /* index: number */) => {
    const index = staticGenresCollapsed.findIndex((i) => i === legendItem);
    return index === staticGenresCollapsed.length - 1;
  };

  const setClassName = (legendItem: PieChartLegendItem, index: number) => {
    if (isLastItem(legendItem) && !collapse) return 'text--green';
    if (hoveredItemIndex === index) return 'text--green';
    return '';
  };

  return (
    <S.LegendContainer
      className={`spring-up`}
      collapseLessPlayedGenres={collapse}
    >
      <ul>
        {staticGenresCollapsed.map((i, index) => (
          <>
            <li key={index} className={setClassName(i, index)}>
              {i.name}
              {isLastItem(i) && (
                <OtherGenresButton color={colors.green.default} />
              )}
            </li>
          </>
        ))}
      </ul>
      <div className={!collapse ? 'show' : ''}>
        <h3>Other</h3>
        <ul>
          {otherGenres.map((i, index) => {
            const offset = index + chartColors.length;

            return (
              <li
                key={index}
                id={hiphenize(i.name)}
                className={setClassName(i, offset)}
              >
                {i.name}
              </li>
            );
          })}
        </ul>
      </div>
    </S.LegendContainer>
  );
}
