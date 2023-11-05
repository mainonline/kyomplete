import { createSlice } from '@reduxjs/toolkit';

const dialogSlice = createSlice({
  name: 'dialog',
  initialState: {
    state: false,
    options: {
      children: 'Hi',
    },
  },
  reducers: {
    openDialog: (state, action) => {
      state.state = true;
      state.options = action.payload;
    },
    closeDialog: (state, action) => {
      state.state = false;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;

export const selectDialogState = ({ kyo }) => kyo.dialog.state;

export const selectDialogOptions = ({ kyo }) => kyo.dialog.options;

export default dialogSlice.reducer;
