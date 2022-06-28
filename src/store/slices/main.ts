import {createSlice} from '@reduxjs/toolkit';

export interface MainState {
  theme: 'light' | 'dark';
}

const initialState: MainState = {
  theme: 'light',
};

// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount: number) => {
//     const response = await fetchCount(amount);
//     return response.data;
//   }
// );

export const main = createSlice({
  name: 'main',
  initialState,
  reducers: {
    switchTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const {switchTheme} = main.actions;
export default main.reducer;
