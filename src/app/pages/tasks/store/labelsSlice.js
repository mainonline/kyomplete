import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../../../../api';

export const getLabels = createAsyncThunk('tasksApp/labels/getLabels', async () => {
  try {
    const response = await instance.get('/labels');
    const data = await response.data;
    return data;
  } catch (error) {
    return error;
  }
});

export const createLabel = createAsyncThunk('tasksApp/labels/createLabel', async (label) => {
  try {
    const response = await instance.post('/labels', label);
    const data = await response.data;
    return data;
  } catch (error) {
    return error;
  }
});

const labelsSlice = createSlice({
  name: 'tasksApp/labels',
  initialState: {
    labelsDialogOpen: false,
    leftSidebarOpen: true,
    data: {},
  },
  reducers: {
    openLabelsDialog: (state, action) => {
      state.labelsDialogOpen = true;
    },
    closeLabelsDialog: (state, action) => {
      state.labelsDialogOpen = false;
    },
    openLeftSidebar: (state, action) => {
      state.leftSidebarOpen = true;
    },
    closeLeftSidebar: (state, action) => {
      state.leftSidebarOpen = false;
    },
    toggleLeftSidebar: (state, action) => {
      state.leftSidebarOpen = !state.leftSidebarOpen;
    },
  },
  extraReducers: {
    [getLabels.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { openLabelsDialog, closeLabelsDialog, closeLeftSidebar, openLeftSidebar, toggleLeftSidebar } =
  labelsSlice.actions;

export const selectLeftSidebarOpen = ({ tasksApp }) => tasksApp.labels.leftSidebarOpen;
export const selectLabelsDialogOpen = ({ tasksApp }) => tasksApp.labels.labelsDialogOpen;
export const selectLabels = ({ tasksApp }) => tasksApp.labels.data;

export default labelsSlice.reducer;
