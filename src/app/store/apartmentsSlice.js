import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/kyo/messageSlice';
import instance from '../../api';

export const getApartments = createAsyncThunk(
  'getApartments',
  async ({
    limit = 10,
    page = 1,
    complex = '',
    status = '',
    search = '',
    manager = '',
    sortValue = '',
    sortDir = '',
  }) => {
    let url = `/apartments?populate=manager,&archive=false&limit=${limit}&page=${page}`;

    if (search) {
      url += `&search=${search}`;
    }

    if (complex) {
      url += `&complex=${complex}`;
    }

    if (manager) {
      url += `&manager=${manager}`;
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

export const getSingleApartment = createAsyncThunk('getSingleApartment', async (id) => {
  try {
    const response = await instance.get(`/apartments/${id}`);
    const data = await response.data;
    return data;
  } catch (error) {
    return error;
  }
});

export const archiveApartment = createAsyncThunk('archiveApartment', async (id, { dispatch }) => {
  try {
    const response = await instance.delete(`/apartments/archive/${id}`);
    dispatch(showMessage({ message: `Apartment with id: ${id} archived!`, variant: 'success' }));
    dispatch(getApartments({}));
    const data = await response.data;
    return data;
  } catch (error) {
    dispatch(showMessage({ message: error?.response?.data?.message, variant: 'error' }));
    return error;
  }
});

export const restoreApartment = createAsyncThunk('restoreApartment', async (id, { dispatch }) => {
  try {
    const response = await instance.patch(`/apartments/restore/${id}`);
    dispatch(showMessage({ message: `Apartment with id: ${id} restored!`, variant: 'success' }));
    const data = await response.data;
    return data;
  } catch (error) {
    dispatch(showMessage({ message: error?.response?.data?.message, variant: 'error' }));
    return error;
  }
});

const apartmentsSlice = createSlice({
  name: 'apartments',
  initialState: {
    searchText: '',
    data: {},
    singleApartment: {},
    loading: false,
  },
  reducers: {
    setApartmentsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getApartments.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [getApartments.pending]: (state, action) => {
      state.loading = true;
    },
    [getApartments.rejected]: (state, action) => {
      state.loading = false;
    },
    [getSingleApartment.fulfilled]: (state, action) => {
      state.singleApartment = action.payload;
      state.loading = false;
    },
    [getSingleApartment.pending]: (state, action) => {
      state.loading = true;
    },
    [getSingleApartment.rejected]: (state, action) => {
      state.loading = false;
    },
    [archiveApartment.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [archiveApartment.pending]: (state, action) => {
      state.loading = true;
    },
    [archiveApartment.rejected]: (state, action) => {
      state.loading = false;
    },
    [restoreApartment.fulfilled]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { setApartmentsSearchText } = apartmentsSlice.actions;

export const selectApartmentsSearchText = ({ apartments }) => apartments.searchText;
export const selectApartments = ({ apartments }) => apartments.data;
export const selectApartmentsData = ({ apartments }) => apartments.data.results;
export const selectSingleApartment = ({ apartments }) => apartments.singleApartment;

export default apartmentsSlice.reducer;
