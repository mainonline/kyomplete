import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/kyo/messageSlice';
import instance from '../../api';

export const uploadMultipleFiles = createAsyncThunk('uploadMultipleFiles', async (data) => {
  try {
    const formData = new FormData();
    for (let i = 0; i < data.length; i += 1) {
      formData.append('files', data[i]);
    }
    const response = await instance.post('/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    return error;
  }
});

export const deleteFile = createAsyncThunk('deleteFile', async (id) => {
  try {
    const response = await instance.delete('/upload/delete', { data: { id } });
    return response;
  } catch (error) {
    return error;
  }
});

// complex functions

export const createComplex = createAsyncThunk('createComplex', async (data) => {
  try {
    const response = await instance.post('/complexes', data);
    return response;
  } catch (error) {
    return error;
  }
});

export const deleteComplex = createAsyncThunk('deleteComplex', async (id) => {
  try {
    const response = await instance.delete(`/complexes/${id}`);
    return response;
  } catch (error) {
    return error;
  }
});

export const updateComplex = createAsyncThunk('updateComplex', async (data, { dispatch }) => {
  try {
    const response = await instance.patch('/complexes', data);

    dispatch(showMessage({ message: `Changes saved!`, variant: 'success' }));
    return response;
  } catch (error) {
    dispatch(showMessage({ message: error?.response?.data?.message, variant: 'error' }));
    return error;
  }
});

export const getComplexList = createAsyncThunk('getComplexes', async () => {
  try {
    const response = await instance.get('/complexes');
    const data = await response.data;
    return data;
  } catch (error) {
    return error;
  }
});

export const getComplexStatistics = createAsyncThunk('getComplexStatistics', async (id) => {
  try {
    const response = await instance.get(`/apartments/complex/${id}`);
    const data = await response.data;
    return data;
  } catch (error) {
    return error;
  }
});

export const queryDashboardStatistics = createAsyncThunk(
  'queryDashboardStatistics',
  async ({ startDate = '', endDate = '' }) => {
    try {
      let url = '/dashboard';
      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }

      const response = await instance.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const complexSlice = createSlice({
  name: 'complex',
  initialState: {
    data: [],
    loading: false,
    error: null,
    statistics: [],
    dashboard: [],
  },
  reducers: {},
  extraReducers: {
    [createComplex.pending]: (state) => {
      state.loading = true;
    },
    [deleteComplex.fulfilled]: (state, action) => {
      const index = state.data.findIndex((item) => item.id === action.payload.id);
      state.data.splice(index, 1);
    },
    [createComplex.fulfilled]: (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
    },
    [createComplex.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getComplexList.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [queryDashboardStatistics.pending]: (state) => {
      state.loading = true;
    },
    [queryDashboardStatistics.fulfilled]: (state, action) => {
      state.loading = false;
      state.dashboard = action.payload;
    },
    [queryDashboardStatistics.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getComplexStatistics.fulfilled]: (state, action) => {
      // check with id, if complex already exists, then update, else push
      const index = state.statistics.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.statistics[index] = action.payload;
      } else {
        state.statistics.push(action.payload);
      }
    },
  },
});

export const selectComplexList = ({ complex }) => complex.data;
export const selectComplexStatistics = ({ complex }) => complex.statistics;
export const selectComplexLoading = ({ complex }) => complex.loading;
export const selectDashboardStatistics = ({ complex }) => complex.dashboard;

export default complexSlice.reducer;
