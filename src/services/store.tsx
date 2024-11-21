import { configureStore } from '@reduxjs/toolkit';
import emailReducer from '../slices/emails.ts';
import textReducer from '../slices/texts.ts';
import evidenceReducer from '../slices/evidence.ts';
// import openAiApi from './openAi/apiSlice.ts';
import evidenceApi from './evidence.ts';
import argumentsApi from './arguments.ts';

export const store = configureStore({
  reducer: {
    email: emailReducer,
    text: textReducer,
    evidence: evidenceReducer,
    // openAiApi: openAiApi.reducer,
    [evidenceApi.reducerPath]: evidenceApi.reducer,
    [argumentsApi.reducerPath]: argumentsApi.reducer,
 
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware()
    .concat(
      // openAiApi.middleware,
      evidenceApi.middleware,
      argumentsApi.middleware,
    ),
});