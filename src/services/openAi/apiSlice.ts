// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import envVariables from '../../env.ts';
// const API_KEY = envVariables.OPENAI_API_KEY;
// const API_CHAT_COMPLETION_URL = 'https://api.openai.com/v1/chat/completions';

// const openAiApi = createApi({
//     reducerPath: 'openAiApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: '/',
//         prepareHeaders: (headers) => {
//             headers.set('Authorization', `Bearer ${API_KEY}`);
//             return headers;
//         },
//     }),
//     endpoints: (builder) => ({
//         getChatResponse: builder.query({
//             query: (messages) => ({
//                 url: API_CHAT_COMPLETION_URL,
//                 method: 'POST',
//                 body: {
//                     model: 'gpt-3.5-turbo',
//                     messages: messages,
//                 },
//             }),
//         }),
//     }),
// });

// export const {
//     useGetChatResponseQuery,
//     useLazyGetChatResponseQuery
// } = openAiApi;

// export default openAiApi;
