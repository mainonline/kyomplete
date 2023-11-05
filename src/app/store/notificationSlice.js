import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/kyo/messageSlice';
import instance from '../../api';

export const getNotifications = createAsyncThunk(
  'getData',
  async ({ startDate = '', endDate = '' }) => {
    try {
      let url = '/notifications';
      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }
      const response = await instance.get(url);
      const data = await response.data;

      return data;
    } catch (error) {
      return error;
    }
  }
);

export const getNotification = createAsyncThunk('getNotification', async (id) => {
  try {
    const response = await instance.get(`/notifications/${id}`);
    const data = await response.data;

    return data;
  } catch (error) {
    return error;
  }
});

export const dismissAll = createAsyncThunk('dismissAll', async ({ dispatch }) => {
  try {
    const response = await instance.put('/notifications/dismiss');
    dispatch(getNotifications({}));
    dispatch(showMessage({ message: 'All notifications dismissed!', variant: 'success' }));
    return response.data;
  } catch (error) {
    dispatch(showMessage({ message: error?.response?.data?.message, variant: 'error' }));
    return error;
  }
});

export const dismissItem = createAsyncThunk('dismissItem', async (id, { dispatch }) => {
  try {
    const response = await instance.put(`/notifications/${id}/dismiss`);
    dispatch(getNotifications({}));
    dispatch(showMessage({ message: 'Notification dismissed!', variant: 'success' }));
    await response.data;
    return id;
  } catch (error) {
    dispatch(showMessage({ message: error?.response?.data?.message, variant: 'error' }));
    return error;
  }
});

export const updateNotification = createAsyncThunk(
  'updateNotification',
  async (data, { dispatch }) => {
    try {
      const response = await instance.put('/notifications/', data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const approveStatusChange = createAsyncThunk(
  'approveStatusChange',
  async ({ id, notificationId }, { dispatch }) => {
    try {
      const response = await instance.patch(`orders/status/${id}/approve`);
      dispatch(showMessage({ message: 'Order status approved!', variant: 'success' }));
      dispatch(updateNotification({ id: notificationId, confirmed: true }));
      dispatch(getNotifications({}));
      return response.data;
    } catch (error) {
      dispatch(showMessage({ message: error?.response?.data?.message, variant: 'error' }));
      return error;
    }
  }
);

export const declineStatusChange = createAsyncThunk(
  'declineStatusChange',
  async ({ id, notificationId }, { dispatch }) => {
    try {
      const response = await instance.patch(`orders/status/${id}/decline`);
      dispatch(showMessage({ message: 'Order status declined!', variant: 'success' }));
      dispatch(updateNotification({ id: notificationId, confirmed: true }));
      dispatch(getNotifications({}));
      return response.data;
    } catch (error) {
      dispatch(showMessage({ message: error?.response?.data?.message, variant: 'error' }));
      return error;
    }
  }
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    data: [],
    singleNotification: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [dismissAll.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [getNotifications.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [getNotifications.pending]: (state, action) => {
      state.loading = true;
    },
    [getNotifications.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getNotification.fulfilled]: (state, action) => {
      state.singleNotification = action.payload;
      state.loading = false;
    },
    [getNotification.pending]: (state, action) => {
      state.loading = true;
    },
    [getNotification.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [approveStatusChange.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [approveStatusChange.pending]: (state, action) => {
      state.loading = true;
    },
    [approveStatusChange.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [declineStatusChange.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [declineStatusChange.pending]: (state, action) => {
      state.loading = true;
    },
    [declineStatusChange.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const selectNotifications = ({ notification }) => notification.data;
export const selectSingleNotification = ({ notification }) => notification.singleNotification;
export const selectLoading = ({ notification }) => notification.loading;

export default notificationSlice.reducer;
