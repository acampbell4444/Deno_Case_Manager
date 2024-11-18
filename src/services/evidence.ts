import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const evidenceApi = createApi({
  reducerPath: "evidenceApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Evidence"],
  endpoints: (builder) => ({
    //GET BY USER ID
    getEvidenceBooksByUserId: builder.query<any, string>({
      query: (userId) => ({
        url: `/evidence/user/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error, userId) => [
        { type: "Evidence", id: userId },
      ],
    }),

    //GET BY BOOK ID
    getEvidenceByBookId: builder.query<any, string>({
      query: (evidenceBookId) => ({
        url: `/evidence/book/${evidenceBookId}`,
        method: "GET",
      }),
      providesTags: (result, error, evidenceBookId) => [
        { type: "Evidence", evidenceBookId },
      ],
    }),

    //UPLOAD
    uploadEvidenceFile: builder.mutation<
      any,
      { file: File; newFileName: string }
    >({
      query: ({ file, newFileName }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("newFileName", newFileName);

        return {
          url: "/evidence/upload",
          method: "POST",
          body: formData,
        };
      },
    }),

    //CREATE
    createEvidenceEntry: builder.mutation<any, any>({
      query: (saveBody) => ({
        url: "/evidence",
        method: "POST",
        body: saveBody,
      }),
      invalidatesTags: (result, error, saveBody) => [
        { type: "Evidence", evidenceBookId: saveBody.evidence_book_id },
      ],
    }),

    //DELETE
    deleteEvidenceEntryById: builder.mutation<
      void,
      { id: string; fileName: string; evidenceBookId: string }
    >({
      query: ({ id, fileName, evidenceBookId }) => ({
        url: `/evidence/${id}`,
        method: "DELETE",
        body: { fileName },
      }),
      invalidatesTags: (result, error, { evidenceBookId }) => [
        { type: "Evidence", evidenceBookId },
      ],
    }),
  }),
});

export const {
  useGetEvidenceByBookIdQuery,
  useLazyGetEvidenceByBookIdQuery,
  useDeleteEvidenceEntryByIdMutation,
  useGetEvidenceBooksByUserIdQuery,
  useLazyGetEvidenceBooksByUserIdQuery,
  useCreateEvidenceEntryMutation,
  useUploadEvidenceFileMutation,
} = evidenceApi;

export default evidenceApi;
