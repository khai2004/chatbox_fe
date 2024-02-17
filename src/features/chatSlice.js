import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  conversations: [],
  activeConversation: {},
  notifications: [],
  messages: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
    getConversations: (state, action) => {
      state.conversations = action.payload;
    },
    getMessages: (state, action) => {
      state.messages = [...state.messages, ...action.payload];
    },
  },
});

export const { setActiveConversation, getConversations, getMessages } =
  chatSlice.actions;
export default chatSlice.reducer;
