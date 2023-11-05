import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../../api';

export const getOrders = createAsyncThunk(
  'getOrders',
  async ({ limit, page, type = '', status = '', search = '', sortValue = '', sortDir = '' }) => {
    let url = `/orders?populate=manager,apartment&limit=${limit}&page=${page}`;

    if (search) {
      url += `&search=${search}`;
    }

    if (type) {
      url += `&type=${type}`;
    }

    if (status) {
      url += `&status=${status}`;
    }

    if (sortValue && sortDir) {
      url += `&sortBy=${sortValue}:${sortDir}`;
    }

    const response = await instance.get(url);
    const data = await response.data;
    return data;
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    searchText: '',
    data: {},
  },
  reducers: {
    setOrdersSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getOrders.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setOrdersSearchText } = ordersSlice.actions;

export const selectOrdersSearchText = ({ orders }) => orders.searchText;
export const selectOrders = ({ orders }) => orders.data;
export const selectOrdersData = ({ orders }) => orders.data.results;

export default ordersSlice.reducer;
