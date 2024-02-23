import { apiSlice } from './apiSlice';

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: (data) => {
        if (data)
          return {
            url: '/conversation',
            headers: {
              authorization: `Bearer ${data}`,
            },
          };
      },
      keepUnusedDataFor: 5,
      providesTags: ['Chats'],
    }),
    create_open_conversations: builder.mutation({
      query: (data) => ({
        url: '/conversation',
        method: 'POST',
        headers: {
          authorization: `Bearer ${data.token}`,
        },
        body: { receiver_id: data.receiver_id, isGroup: data.isGroup },
      }),
    }),
    createGroup: builder.mutation({
      query: (data) => ({
        url: '/conversation/group',
        method: 'POST',
        headers: {
          authorization: `Bearer ${data.token}`,
        },
        body: { name: data.name, users: data.users },
      }),
    }),
  }),
});

export const {
  useCreate_open_conversationsMutation,
  useGetConversationsQuery,
  useCreateGroupMutation,
} = chatApiSlice;
