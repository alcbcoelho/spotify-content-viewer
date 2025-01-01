import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { setCollapseLessPlayedGenres } from '../../store/miscSlice';

type Props = {
  topArtists: Artist[];
  numberOfGenresToDisplay: number;
};

export default function Chart({ topArtists, numberOfGenresToDisplay }: Props) {
  const dispatch = useDispatch();
  const collapse = useSelector(
    (state: RootState) => state.misc.chart.collapseLessPlayedGenres
  );

  useEffect(() => {
    return () => {
      dispatch(setCollapseLessPlayedGenres(true));
    };
  }, [dispatch]);

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
    <S.Dashboard>
      <div className="chart-container">
        <BarChart
          colors={chartColors}
          data={barChartData}
          numberOfGenresToDisplay={
            numberOfGenresToDisplay || barChartData.length
          }
          title="Top 5 most played genres"
        />
        <PieChart
          colors={chartColors}
          data={pieChartData}
          title="Top genres as fractions of genre pool"
        />
      </div>
      <LegendContainer
        data={legendData}
        getLegendDataArgs={[topArtists, numberOfGenresToDisplay, true]}
      />
    </S.Dashboard>
  );
}
