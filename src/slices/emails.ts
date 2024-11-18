import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAndParseEmails } from '../thunks/emails.ts';

// Define the type for the email state in the slice
interface EmailState {
  parsedEmails: any[]; // Replace `any` with the actual type for your emails if you have one
  loading: boolean;
  parsing: boolean;
  startDate: string | null;
  endDate: string | null;
}

const initialState: EmailState = {
  parsedEmails: [],
  loading: false,
  parsing: false,
  startDate: null,
  endDate: null,
};

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchAndParseEmails.pending, (state) => {
        state.loading = true;
        state.parsing = true;
      })
      .addCase(fetchAndParseEmails.fulfilled, (state, action: PayloadAction<any[]>) => { // Replace `any[]` with the actual type
        state.loading = false;
        state.parsing = false;
        state.parsedEmails = action.payload;
      })
      .addCase(fetchAndParseEmails.rejected, (state) => {
        state.loading = false;
        state.parsing = false;
      });
  }
});

export const { 
  setStartDate,
  setEndDate,
  resetFilters,
} = emailSlice.actions;

export default emailSlice.reducer;
