import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../../../../api';

export const getProjects = createAsyncThunk('tasksApp/projects/getProjects', async () => {
  try {
    const response = await instance.get('/projects');
    const data = await response.data;
    return data;
  } catch (error) {
    return error;
  }
});

const projectsSlice = createSlice({
  name: 'tasksApp/projects',
  initialState: {
    data: {},
    selectedProjects: [],
  },
  reducers: {
    setProjects: (state, action) => {
      state.selectedProjects = action.payload;
    },
  },
  extraReducers: {
    [getProjects.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setProjects } = projectsSlice.actions;

export const selectProjects = ({ tasksApp }) => tasksApp.projects.data;

export default projectsSlice.reducer;
