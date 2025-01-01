import _ from 'lodash';
import { colors } from '../styles/global';

type GenreTuple = [string, number];

export type PieChartItem = {
  x: string;
  y: number;
  occurrenceCount: number;
  isHovered: boolean;
};

export type PieChartLegendItem = {
  name: string;
  symbol: { fill: string };
};

export type BarChartItem = {
  x: string;
  y: number;
};

export const DEFAULT_CHART_COLOR = colors.gray.darker;

export const chartColors: string[] = Object.values(colors.green); // limit = 5

export const getTopGenresData = (topArtists: Artist[]): GenreTuple[] => {
  const genresPerArtist = topArtists.map((i) => i.genres);

  const map = new Map<string, number>();

  genresPerArtist.forEach((artist) => {
    artist.forEach((genre) => {
      const existingValue = map.get(genre);
      map.set(genre, existingValue ? existingValue + 1 : 1);
    });
  });

  const genreTuples = [...map.entries()];
  genreTuples.sort((a, b) => b[1] - a[1]);

  return genreTuples;
};

export const getBarChartGenreData = (
  topArtists: Artist[],
  limit?: number
): BarChartItem[] => {
  const data = getTopGenresData(topArtists);

  return applyLimitToGenreData(data, limit)
    .reverse()
    .map((i: GenreTuple) => ({ x: i[0], y: i[1] }));
};

const getTotalOccurrencesOfTopGenres = (genreData: GenreTuple[]) => {
  return genreData.map((i) => i[1]).reduce((acc, i) => acc + i);
};

export const getPieChartGenreData = (
  topArtists: Artist[],
  limit: number,
  collapseLessPlayedGenres: boolean
): PieChartItem[] => {
  const data = getTopGenresData(topArtists);
  const total = getTotalOccurrencesOfTopGenres(data);

  const [topGenres, otherGenres] = balcanizeGenreData(
    data,
    limit,
    collapseLessPlayedGenres
  );

  return ([...topGenres, ...otherGenres] as GenreTuple[]).map((i) => {
    const percentage = (i[1] / total) * 100;

    return {
      x: i[0],
      y: Number.isInteger(percentage)
        ? percentage
        : parseFloat(percentage.toFixed(1)),
      occurrenceCount: i[1],
      isHovered: false
    };
  });
};

export const getLegendData = (
  topArtists: Artist[],
  limit: number,
  collapseLessPlayedGenres: boolean
): PieChartLegendItem[][] => {
  const data = balcanizeGenreData(
    getTopGenresData(topArtists),
    limit,
    collapseLessPlayedGenres
  );

  return data.map((genreGroup) =>
    genreGroup.map((i, index) => ({
      name: (i as GenreTuple)[0],
      symbol: {
        fill: chartColors[index]
      }
    }))
  );
};

//

const applyLimitToGenreData = (
  data: GenreTuple[],
  limit?: number
): GenreTuple[] => {
  if (!limit) return data;

  return data.filter((i, index) => index < limit);
};

const balcanizeGenreData = (
  data: GenreTuple[],
  limit: number,
  reduceSecondGroup = false
): GenreTuple[][] => {
  const topGenres = data.slice(0, limit);
  const otherGenres = _.difference(data, topGenres);

  if (reduceSecondGroup) {
    const total = otherGenres.reduce((acc, [, i]) => acc + i, 0);
    return [topGenres, [['other', total]]];
  }
  return [topGenres, otherGenres];
};
