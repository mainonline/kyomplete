import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/kyo/messageSlice';
import instance from '../../../../api';

export const getTasks = createAsyncThunk(
  'tasksApp/tasks/getTasks',
  async ({ page = 1, limit = 20, search = '', projects = '', labels = '' }) => {
    try {
      let url = `/tasks?sortBy=order:asc&limit=${limit}&page=${page}`;
      if (search) {
        url += `&search=${search}`;
      }
      if (projects) {
        url += `&projects=${projects}`;
      }
      if (labels) {
        url += `&labels=${labels}`;
      }
      const response = await instance.get(url);
      const data = await response.data;
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const reorderList = createAsyncThunk(
  'tasksApp/tasks/reorder',
  async ({ currentOrder, newOrder }, { dispatch, getState }) => {
    dispatch(toggleOrder({ currentOrder, newOrder }));
    try {
      const response = await instance.patch(
        `/tasks/reorder?currentOrder=${currentOrder}&newOrder=${newOrder}`
      );
      dispatch(getTasks({}));

      const data = await response.data;
      dispatch(
        showMessage({
          message: 'Order Saved',
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      );
      return data;
    } catch (error) {
      return error;
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasksApp/tasks',
  initialState: {
    data: {},
    search: '',
    loading: false,
  },
  reducers: {
    setSearch: {
      reducer: (state, action) => {
        state.search = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    toggleOrder: (state, action) => {
      const { currentOrder, newOrder } = action.payload;

      const updatedResults = [...state.data.results];

      const currentUpdate = updatedResults.find((item) => item.order === currentOrder);
      const newUpdate = updatedResults.find((item) => item.order === newOrder);

      if (currentUpdate && newUpdate) {
        currentUpdate.order = newOrder;
        newUpdate.order = currentOrder;

        state.data.results = updatedResults.sort((a, b) => a.order - b.order);
      }
    },
  },
  extraReducers: {
    [getTasks.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [getTasks.pending]: (state, action) => {
      state.loading = true;
    },
    [getTasks.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { setSearch, toggleOrder } = tasksSlice.actions;

export const selectTasks = ({ tasksApp }) => tasksApp.tasks.data;
export const selectSearch = ({ tasksApp }) => tasksApp.tasks.search;
export const selectLoading = ({ tasksApp }) => tasksApp.tasks.loading;

export default tasksSlice.reducer;
