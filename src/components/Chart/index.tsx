import { useSelector } from 'react-redux';

import {
  getPieChartGenreData,
  getBarChartGenreData,
  getLegendData,
  chartColors
} from '../../services/genreService';
import * as S from './ChartStyle';
import BarChart from './BarChart';
import LegendContainer from './LegendContainer';
import PieChart from './PieChart';
import { RootState } from '../../store';

type Props = {
  topArtists: Artist[];
  numberOfGenresToDisplay: number;
};

export default function Chart({ topArtists, numberOfGenresToDisplay }: Props) {
  const collapse = useSelector(
    (state: RootState) => state.misc.chart.collapseLessPlayedGenres
  );

  const pieChartData = getPieChartGenreData(
    topArtists,
    numberOfGenresToDisplay,
    collapse
  );

  const legendData = getLegendData(
    topArtists,
    numberOfGenresToDisplay,
    collapse
  );

  const barChartData = getBarChartGenreData(
    topArtists,
    numberOfGenresToDisplay
  );

  return (
    <S.ChartContainer>
      <BarChart
        className="tw-mb-8"
        colors={chartColors}
        data={barChartData}
        numberOfGenresToDisplay={numberOfGenresToDisplay || barChartData.length}
      />
      <PieChart
        colors={chartColors}
        data={pieChartData}
        className={collapse ? 'tw-row-span-2' : ''} //
      />
      <LegendContainer
        data={legendData}
        getLegendDataArgs={[topArtists, numberOfGenresToDisplay, true]}
      />
    </S.ChartContainer>
  );
}
