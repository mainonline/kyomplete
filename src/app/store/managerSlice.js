import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import history from '@history';
import { showMessage } from 'app/store/kyo/messageSlice';
import instance from '../../api';

export const getManagers = createAsyncThunk(
  'getManagers',
  async ({ limit, page, search = '', sortValue = '', sortDir = '' }) => {
    let url = `/users?role=manager&limit=${limit}&page=${page}`;

    if (search) {
      url += `&search=${search}`;
    }

    if (sortValue && sortDir) {
      url += `&sortBy=${sortValue}:${sortDir}`;
    }

    const response = await instance.get(url);
    const data = await response.data;
    return data;
  }
);

export const getManager = createAsyncThunk('getManager', async (id, { dispatch, getState }) => {
  try {
    const response = await instance.get(`/users/${id}`);

    const data = await response.data;

    return data;
  } catch (error) {
    history.push({ pathname: `/managers` });
    return null;
  }
});

export const addManager = createAsyncThunk('addManager', async (data, { dispatch, getState }) => {
  try {
    const response = await instance.post('/users', data);

    dispatch(showMessage({ message: `Manager ${data?.name} created!`, variant: 'success' }));
    return response;
  } catch (error) {
    dispatch(showMessage({ message: error?.response?.data?.message, variant: 'error' }));
    return error;
  }
});

export const updateManager = createAsyncThunk(
  'updateManager',
  async (data, { dispatch, getState }) => {
    try {
      const response = await instance.patch('/users', data);

      dispatch(showMessage({ message: `Manager ${data?.name} updated!`, variant: 'success' }));
      return response;
    } catch (error) {
      dispatch(showMessage({ message: error?.response?.data?.message, variant: 'error' }));
      return error;
    }
  }
);

export const deleteManager = createAsyncThunk(
  'deleteManager',
  async ({ id, name }, { dispatch, getState }) => {
    try {
      const response = await instance.delete(`/users/${id}`);

      dispatch(showMessage({ message: `Manager ${name} deleted!`, variant: 'success' }));
      return response;
    } catch (error) {
      dispatch(showMessage({ message: error?.response?.data?.message, variant: 'error' }));
      return error;
    }
  }
);

export const getManagerStatistics = createAsyncThunk(
  'getManagerStatistics',
  async ({ complexId = '', startDate = '', endDate = '', managerId }) => {
    try {
      let url = `/orders/statistics/manager?managerId=${managerId}`;
      if (complexId) {
        url += `&complexId=${complexId}`;
      }
      if (startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
      }
      const response = await instance.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const managerSlice = createSlice({
  name: 'manager',
  initialState: {
    data: {
      results: [],
    },
    singleManager: {},
    searchText: '',
    loading: false,
  },
  reducers: {
    setManagersSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getManagers.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [getManager.fulfilled]: (state, action) => {
      state.singleManager = action.payload;
    },
    [getManagerStatistics.pending]: (state, action) => {
      state.loading = true;
    },
    [getManagerStatistics.rejected]: (state, action) => {
      state.loading = false;
    },
    [getManagerStatistics.fulfilled]: (state, action) => {
      state.singleManager = action.payload;
      state.loading = false;
    },
  },
});

export const { setManagersSearchText } = managerSlice.actions;

export const selectManagerData = ({ manager }) => manager?.data;
export const selectManagerList = ({ manager }) => manager?.data?.results;
export const selectManagersSearchText = ({ manager }) => manager?.searchText;
export const selectManagerStatistics = ({ manager }) => manager.singleManager;
export const selectManagerLoading = ({ manager }) => manager.loading;

export default managerSlice.reducer;
