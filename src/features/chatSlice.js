import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  conversations: [],
  activeConversation: {},
  notifications: [],
  messages: [],
  files: [],
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
      state.messages = action.payload;
    },
    updateMessages: (state, action) => {
      state.messages = [...state.messages, ...action.payload];
    },
    addFiles: (state, action) => {
      state.files = [action.payload, ...state.files];
    },
    clearFiles: (state, action) => {
      state.files = [];
    },
    removeFile: (state, action) => {
      let index = action.payload;
      let files = [...state.files];
      let fileToRemove = [files[index]];
      state.files = files.filter((file) => !fileToRemove.includes(file));
    },
  },
});

export const {
  setActiveConversation,
  getConversations,
  getMessages,
  updateMessages,
  addFiles,
  clearFiles,
  removeFile,
} = chatSlice.actions;
export default chatSlice.reducer;
