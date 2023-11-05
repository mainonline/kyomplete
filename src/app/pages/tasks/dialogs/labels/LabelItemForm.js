import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ListItem from '@mui/material/ListItem';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import SvgIcon from '@kyo/core/SvgIcon';
import { useEffect, useRef } from 'react';
import _ from '@lodash';
// import { removeLabel, updateLabel } from '../../store/labelsSlice';

function useDebounce(func, wait, options) {
  return useRef(_.debounce(func, wait, options)).current;
}

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required('You must enter a label name'),
});

function NewLabelForm(props) {
  const { label } = props;
  const dispatch = useDispatch();

  const { control, formState, handleSubmit, reset, watch } = useForm({
    mode: 'onChange',
    defaultValues: label,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;
  const form = watch();

  useEffect(() => {
    reset(label);
  }, [label, reset]);

  const handleOnChange = useDebounce((_label, _form) => {
    if (!_label) {
      return;
    }
    if (form && !_.isEqual(_form, _label)) {
      console.log('updateLabel');
      // dispatch(updateLabel(_form));
    }
  }, 300);

  useEffect(() => {
    handleOnChange(label, form);
  }, [handleOnChange, label, form]);

  function handleOnRemove() {
    console.log('removeLabel');
    // dispatch(removeLabel(label.id));
  }

  return (
    <>
      <ListItem className="p-0 mb-16" dense>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className={clsx('flex flex-1')}
              error={!!errors.name}
              helperText={errors?.name?.message}
              placeholder="Create new label"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon color="action">heroicons-outline:tag</SvgIcon>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleOnRemove}
                      className="w-32 h-32 p-0"
                      aria-label="Delete"
                      size="large"
                    >
                      <SvgIcon color="action" size={20}>
                        heroicons-outline:trash
                      </SvgIcon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </ListItem>
    </>
  );
}

export default NewLabelForm;
