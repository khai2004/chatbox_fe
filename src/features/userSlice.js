import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    _id: '',
    name: '',
    email: '',
    picture: '',
    status: '',
    token: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      console.log(state.user);
    },
    logout: (state) => {
      state.user = {
        id: '',
        name: '',
        email: '',
        picture: '',
        status: '',
        token: '',
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { logout, setCredentials } = userSlice.actions;

export default userSlice.reducer;
