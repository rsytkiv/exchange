import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { PAIRS_LIST, BASE_URL } from '../components/Constants';

const initialState = {
  currency: [],
  prevCurrency: [],
};

export const fetchCurrencyPrice = createAsyncThunk(
  'fetchCurrencyPrice',
  async () =>
    await Promise.all(
      PAIRS_LIST.map(async (currency) => {
        const res = await fetch(`${BASE_URL}${currency}`);
        const data = await res.json();

        return data;
      }),
    ),
);

const rootSlice = createSlice({
  name: 'rootSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCurrencyPrice.pending.type]: (state) => {
      state.prevCurrency = state.currency;
    },
    [fetchCurrencyPrice.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.currency = action.payload;
    },
  },
});

export default rootSlice.reducer;
