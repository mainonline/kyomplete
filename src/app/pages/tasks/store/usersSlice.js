import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../../../../api';

export const getUsers = createAsyncThunk(
  'tasksApp/users/getUsers',
  async (params, { getState }) => {
    try {
      const response = await instance.get(`/users`);
      const data = await response.data;
      return data;
    } catch (error) {
      return error;
    }
  }
);

const usersSlice = createSlice({
  name: 'tasksApp/users',
  initialState: {},
  reducers: {},
  extraReducers: {
    [getUsers.fulfilled]: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const selectUsers = ({ tasksApp }) => tasksApp.users;

export default usersSlice.reducer;
