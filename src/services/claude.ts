import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const claudApi = createApi({
  reducerPath: 'claud',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    generateLegalAnalysis: builder.mutation<any, any>({
      query: (caseData) => ({
        url: 'claude',
        method: 'POST',
        body: JSON.stringify(caseData),
      })
    })
  })
});

export const { useGenerateLegalAnalysisMutation } = claudApi;

export default claudApi;
