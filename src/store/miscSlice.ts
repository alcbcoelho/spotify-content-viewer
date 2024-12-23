import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  chart: {
    hoveredItemIndex?: number;
    collapseLessPlayedGenres: boolean;
  };
};

const initialState: InitialState = {
  chart: {
    hoveredItemIndex: undefined,
    collapseLessPlayedGenres: true
  }
};

const miscSlice = createSlice({
  name: 'misc',
  initialState,
  reducers: {
    setHoveredItemIndex: (state, action: PayloadAction<number | undefined>) => {
      state.chart.hoveredItemIndex = action.payload;
    },
    setCollapseLessPlayedGenres: (state, action: PayloadAction<boolean>) => {
      state.chart.collapseLessPlayedGenres = action.payload;
    }
  }
});

export const { setHoveredItemIndex, setCollapseLessPlayedGenres } =
  miscSlice.actions;
export default miscSlice.reducer;
