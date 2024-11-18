import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TextState {
  parsedTexts: string[];  // assuming parsedTexts is an array of strings, adjust if needed
  loading: boolean;
  parsing: boolean;
  startDate: string | null;  // assuming dates are in string format, adjust if using Date type
  endDate: string | null;  // assuming dates are in string format, adjust if using Date type
}

const initialState: TextState = {
  parsedTexts: [],
  loading: false,
  parsing: false,
  startDate: null,
  endDate: null,
};

const textSlice = createSlice({
  name: 'text',
  initialState,
  reducers: {
    setParsedTexts: (state, action: PayloadAction<string[]>) => {
      state.parsedTexts = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setParsing: (state, action: PayloadAction<boolean>) => {
      state.parsing = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string | null>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string | null>) => {
      state.endDate = action.payload;
    },
    resetFilters: (state) => {
      state.startDate = null;
      state.endDate = null;
    },
  },
});

export const {
  setParsedTexts,
  setLoading,
  setParsing,
  setStartDate,
  setEndDate,
  resetFilters,
} = textSlice.actions;

export default textSlice.reducer;
