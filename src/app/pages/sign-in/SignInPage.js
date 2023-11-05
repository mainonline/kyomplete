import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import Paper from '@mui/material/Paper';
import _ from '@lodash';
import React, { useEffect } from 'react';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import jwtService from '../../auth/services/jwtService';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  emailOrLogin: yup.string().required('You must enter a email or login.'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(4, 'Password is too short - must be at least 4 chars.'),
});

const defaultValues = {
  emailOrLogin: '',
  password: '',
  remember: true,
};

function SignInPage() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    setValue('emailOrLogin', 'joomart.online@gmail.com', {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue('password', 'zhomart1234', { shouldDirty: true, shouldValidate: true });
  }, [setValue]);

  function onSubmit({ emailOrLogin, password }) {
    jwtService
      .signInWithEmailAndPassword(emailOrLogin, password)
      .then((user) => {
        // No need to do anything, user data will be set at app/auth/AuthContext
      })
      .catch((_errors) => {
        _errors.forEach((error) => {
          setError(error.type, {
            type: 'manual',
            message: error.message,
          });
        });
      });
  }

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center flex-1 min-w-0 bg-white">
      <Paper className="bg-white h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="emailOrLogin"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email or Login"
                  autoFocus
                  type="text"
                  size="small"
                  error={!!errors.emailOrLogin}
                  helperText={errors?.emailOrLogin?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormControlLabel
                      label="Remember me"
                      control={<Checkbox size="small" {...field} />}
                    />
                  </FormControl>
                )}
              />
            </div>

            <Button
              variant="contained"
              color="secondary"
              className=" w-full mt-16"
              aria-label="Sign in"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="medium"
            >
              Sign in
            </Button>
          </form>
        </div>
      </Paper>
    </div>
  );
}

export default SignInPage;
