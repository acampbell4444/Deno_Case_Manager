import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAndParseEmails } from '../thunks/emails.ts';

// Define the type for the email state in the slice
interface EmailState {
  michelleParsedEmails: any[]; // Replace `any[]` with the actual type
  cathyParsedEmails: any[]; // Replace `any[]` with the actual type
  loading: boolean;
  parsing: boolean;
  startDate: string | null;
  endDate: string | null;
}

const initialState: EmailState = {
  michelleParsedEmails: [],
  cathyParsedEmails: [],
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
      .addCase(fetchAndParseEmails.fulfilled, (state, action: any) => { // Replace `any[]` with the actual type
        state.loading = false;
        state.parsing = false;
        state.michelleParsedEmails = action.payload.michelleParsedEmails
        state.cathyParsedEmails = action.payload.cathyParsedEmails
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
