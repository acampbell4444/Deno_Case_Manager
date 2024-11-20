import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const argumentsApi = createApi({
    reducerPath: "argumentsApi", // Ensure this name is correct
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    tagTypes: ["Arguments"],
    endpoints: (builder) => ({
        // Get all arguments by userId
        getArgumentsByUserId: builder.query<any, string>({
            query: (userId) => ({
                url: `/arguments/user/${userId}`,
                method: "GET",
            }),
            providesTags: (result, error, userId) => [
                { type: "Arguments", id: userId },
            ],
        }),
    }),
});

export const {
    useGetArgumentsByUserIdQuery,
} = argumentsApi;

export default argumentsApi;
