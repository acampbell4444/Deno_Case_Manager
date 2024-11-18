import { configureStore } from '@reduxjs/toolkit';
import emailReducer from '../slices/emails.ts';
import textReducer from '../slices/texts.ts';
import evidenceReducer from '../slices/evidence.ts';
// import openAiApi from './openAi/apiSlice.ts';
import evidenceApi from './evidence.ts';

export const store = configureStore({
  reducer: {
    email: emailReducer,
    text: textReducer,
    evidence: evidenceReducer,
    // openAiApi: openAiApi.reducer,
    [evidenceApi.reducerPath]: evidenceApi.reducer,
 
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware()
    .concat(
      // openAiApi.middleware,
      evidenceApi.middleware
    ),
});