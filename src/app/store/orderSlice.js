import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../../api';

export const getSingleOrder = createAsyncThunk('getSingleOrder', async (id) => {
  try {
    const response = await instance.get(`/orders/${id}`);
    const data = await response.data;
    return data;
  } catch (error) {
    return error;
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    data: {},
  },
  reducers: {},
  extraReducers: {
    [getSingleOrder.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const selectOrder = ({ order }) => order.data;

export default orderSlice.reducer;
