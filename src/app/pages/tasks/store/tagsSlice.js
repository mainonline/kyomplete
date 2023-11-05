import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../../../../api';

export const getTags = createAsyncThunk('tasksApp/tags/getTags', async (params, { getState }) => {
  try {
    const response = await instance.get(`/tags`);
    const data = await response.data;
    return data;
  } catch (error) {
    return error;
  }
});

const tagsSlice = createSlice({
  name: 'tasksApp/tags',
  initialState: {},
  reducers: {},
  extraReducers: {
    [getTags.fulfilled]: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const selectTags = ({ tasksApp }) => tasksApp.tags;

export default tagsSlice.reducer;
