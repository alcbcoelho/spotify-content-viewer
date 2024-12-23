import {
  VictoryChart,
  VictoryScatter,
  VictoryAxis,
  VictoryLine,
  VictoryTheme,
  VictoryGroup,
  VictoryLegend,
  VictoryLabel
} from 'victory';

type Data = {
  name: string;
  data: number[];
};

const series: Data[] = [
  {
    name: 'Canada',
    data: [
      3.9670002, 5.2650003, 6.201, 7.8010006, 9.694, 11.214001, 11.973001,
      12.250001, 12.816001, 13.413001, 13.626961, 14.30356, 15.295461
    ]
  },
  {
    name: 'Germany',
    data: [
      26.903002, 28.712002, 30.979002, 33.477, 38.614002, 44.58, 49.435, 55.58,
      58.721004, 60.742004, 62.201004, 63.833004, 66.315
    ]
  },
  {
    name: 'India',
    data: [
      13.184001, 16.179, 17.2997, 18.4204, 22.465302, 25.08819, 28.700441,
      32.84846, 35.288105, 37.50518, 38.558605, 40.06727, 41.929783
    ]
  },
  {
    name: 'United States',
    data: [
      39.349697, 45.79497, 59.453304, 60.198166, 64.43019, 72.767235, 81.502365,
      87.83079, 94.66619, 103.835556, 118.66354, 133.01929, 140.86162
    ]
  },
  {
    name: 'Italy',
    data: [
      5.794, 6.918, 8.102, 8.542001, 8.683001, 9.137, 9.384001, 9.736579,
      10.230247, 10.679461, 10.870623, 11.253734, 11.779734
    ]
  },
  {
    name: 'Japan',
    data: [
      2.2940001, 2.4190001, 2.562, 2.6460001, 2.753, 2.808, 3.2470002,
      3.4830003, 3.4980001, 3.9540002, 4.367, 4.467, 4.577
    ]
  },
  {
    name: 'Spain',
    data: [
      20.693, 21.529001, 22.789001, 22.958, 22.925001, 22.943, 22.990002,
      23.12448, 23.405056, 25.590076, 26.819191, 27.907652, 29.307837
    ]
  }
];

const symbols = ['circle', 'diamond', 'plus', 'square', 'triangleUp'];

export default function Chart() {
  return (
    <VictoryChart
      theme={VictoryTheme.clean}
      padding={{
        top: 50,
        left: 70,
        right: 50,
        bottom: 100
      }}
    >
      <VictoryAxis
        tickValues={[2010, 2012, 2014, 2016, 2018, 2020, 2022]}
        style={{
          tickLabels: {
            fontSize: 8
          },
          ticks: {
            stroke: '#757575',
            size: 5
          }
        }}
      />
      <VictoryAxis
        dependentAxis
        tickValues={[0, 40, 80, 120, 160, 200]}
        tickFormat={(value) => `${value} GW`}
        style={{
          axis: {
            stroke: 'transparent'
          },
          axisLabel: {
            fontSize: 8,
            padding: 50
          },
          tickLabels: {
            fontSize: 8
          },
          grid: {
            stroke: '#d9d9d9',
            size: 5
          }
        }}
      />
      {series.map((s, i) => (
        <VictoryGroup
          key={s.name}
          data={s.data.map((d, i) => ({ x: i + 2010, y: d }))}
        >
          <VictoryLine
            style={{
              data: {
                stroke: VictoryTheme.clean.palette?.qualitative![i],
                strokeWidth: 1
              }
            }}
          />
          <VictoryScatter
            size={2}
            style={{
              data: {
                fill: VictoryTheme.clean.palette?.qualitative![i]
              }
            }}
            symbol={symbols[i]}
          />
        </VictoryGroup>
      ))}
      <VictoryLegend
        itemsPerRow={4}
        x={50}
        y={220}
        data={series.map((s, i) => ({
          name: s.name,
          symbol: {
            fill: VictoryTheme.clean.palette?.qualitative![i],
            type: symbols[i]
          }
        }))}
        style={{
          data: {
            fill: ({ datum }) => datum.symbol.fill
          },
          labels: {
            fontSize: 8
          },
          border: {
            stroke: 'transparent'
          }
        }}
      />
    </VictoryChart>
  );
}
