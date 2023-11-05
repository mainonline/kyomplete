import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeDialog,
  selectDialogOptions,
  selectDialogState,
} from 'app/store/kyo/dialogSlice';

function AppDialog(props) {
  const dispatch = useDispatch();
  const state = useSelector(selectDialogState);
  const options = useSelector(selectDialogOptions);

  return (
    <Dialog
      open={state}
      onClose={(ev) => dispatch(closeDialog())}
      aria-labelledby="fuse-dialog-title"
      classes={{
        paper: 'rounded-8',
      }}
      {...options}
    />
  );
}

export default AppDialog;
