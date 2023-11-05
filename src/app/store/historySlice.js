import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../../api';

export const getHistories = createAsyncThunk(
  'getHistories',
  async ({
    limit,
    page,
    search = '',
    sortValue = '',
    sortDir = '',
    order = '',
    apartment = '',
  }) => {
    let url = `/histories?populate=user,order,apartment&limit=${limit}&page=${page}`;

    if (search) {
      url += `&search=${search}`;
    }

    if (sortValue && sortDir) {
      url += `&sortBy=${sortValue}:${sortDir}`;
    }

    if (apartment) {
      url += `&apartment=${apartment}`;
    }

    if (order) {
      url += `&order=${order}`;
    }

    const response = await instance.get(url);
    const data = await response.data;
    return data;
  }
);

export const getSingleHistory = createAsyncThunk('getSingleHistory', async (id) => {
  try {
    const response = await instance.get(`/historys/${id}`);
    const data = await response.data;
    return data;
  } catch (error) {
    return error;
  }
});

const historySlice = createSlice({
  name: 'history',
  initialState: {
    singleHistory: {},
    data: {},
  },
  reducers: {},
  extraReducers: {
    [getHistories.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [getSingleHistory.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const selectHistoriesData = ({ history }) => history.data;
export const selectHistoriesList = ({ history }) => history.data.results;
export const selectSingleHistory = ({ history }) => history.singleHistory;

export default historySlice.reducer;
