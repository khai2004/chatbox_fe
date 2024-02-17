import { apiSlice } from './apiSlice';

export const messagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (data) => {
        return {
          url: `/message/${data.converId}`,
          headers: {
            authorization: `Bearer ${data.token}`,
          },
        };
      },
      keepUnusedDataFor: 5,
      providesTags: ['Messages'],
    }),
    sendMessage: builder.mutation({
      query: (data) => ({
        url: '/message',
        method: 'POST',
        headers: {
          authorization: `Bearer ${data.token}`,
        },
        body: {
          message: data.message,
          conve_id: data.conve_id,
          files: data.files,
        },
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = messagesApiSlice;
