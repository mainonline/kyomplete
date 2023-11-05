import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import history from '@history';
import instance from 'src/api';
import TaskModel from '../model/TaskModel';
import { getTasks } from './tasksSlice';

export const getTask = createAsyncThunk(
  'tasksApp/task/getTask',
  async (id, { dispatch, getState }) => {
    try {
      const response = await instance.get(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      history.push({ pathname: `/tasks` });
      return error;
    }
  }
);

export const addTask = createAsyncThunk(
  'tasksApp/tasks/addTask',
  async (task, { dispatch, getState }) => {
    try {
      const response = await instance.post(`/tasks`, task);
      const data = await response.data;
      dispatch(getTasks({}));
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasksApp/tasks/updateTask',
  async (task, { dispatch, getState }) => {
    const response = await instance.patch(`/tasks`, task);

    const data = await response.data;
    dispatch(getTasks({}));

    return data;
  }
);

export const removeTask = createAsyncThunk(
  'tasksApp/tasks/removeTask',
  async (taskId, { dispatch, getState }) => {
    try {
      const response = await instance.delete(`/tasks/${taskId}`);
      const data = await response.data;
      dispatch(getTasks());
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const selectTask = ({ tasksApp }) => tasksApp.task;

const taskSlice = createSlice({
  name: 'tasksApp/task',
  initialState: null,
  reducers: {
    newTask: (state, action) => {
      const type = action.payload;
      if (type === 'task') {
        return TaskModel();
      }
      return null;
    },
    resetTask: () => null,
  },
  extraReducers: {
    [getTask.pending]: (state, action) => null,
    [getTask.fulfilled]: (state, action) => action.payload,
    [removeTask.fulfilled]: (state, action) => null,
  },
});

export const { resetTask, newTask } = taskSlice.actions;

export default taskSlice.reducer;
