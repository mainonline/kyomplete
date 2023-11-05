import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import _ from '@lodash';
import Paper from '@mui/material/Paper';
import FormHelperText from '@mui/material/FormHelperText';

import { registerUser } from 'app/store/userSlice';

/**
 * Form Validation Schema
 */

const schema = yup.object().shape({
  name: yup.string().required('You must enter name'),
  login: yup.string().required('You must enter a login'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  phone: yup.string().required('You must enter a phone number'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/\d/, 'Password must contain at least one number.'),
  acceptTermsConditions: yup.boolean().oneOf([true], 'The terms and conditions must be accepted.'),
});

const defaultValues = {
  name: '',
  email: '',
  phone: '',
  login: '',
  password: '',
  acceptTermsConditions: false,
};

function SignUpCargoPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit(data) {
    delete data.acceptTermsConditions;
    dispatch(registerUser(data))
      .unwrap()
      .then((res) => {
        if (res && res.user) {
          reset(defaultValues);
          navigate('/sign-in', { replace: true });
        }
      });
  }

  return (
    <div className="flex flex-col items-center sm:justify-center flex-1 min-w-0">
      <Paper className="sm:w-480 h-full mt-60 md:mt-0 sm:h-auto md:flex md:items-center w-full sm:w-auto py-8 px-16 sm:p-32 sm:rounded-2xl sm:shadow ltr:border-r-1 rtl:border-l-1">
        <div className="w-full min-w-320 sm:max-w-640 mx-auto sm:mx-0">
          <Typography className="text-3xl font-extrabold tracking-tight leading-tight">
            Sign up
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Already have an account?</Typography>
            <Link className="ml-4" to="/sign-in">
              Sign in
            </Link>
          </div>

          <form
            name="registerForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full sm:grid sm:grid-cols-2 sm:gap-10 flex flex-col justify-center">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    className="mb-24"
                    label="Name"
                    autoFocus
                    type="text"
                    error={!!errors.name}
                    helperText={errors?.name?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <Controller
                name="login"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    className="mb-24"
                    label="Login"
                    autoFocus
                    type="text"
                    error={!!errors.login}
                    helperText={errors?.login?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    className="mb-24"
                    label="Email"
                    type="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    className="mb-24"
                    label="Phone"
                    type="phone"
                    error={!!errors.phone}
                    helperText={errors?.phone?.message}
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
                    size="small"
                    className="mb-24"
                    label="Password"
                    type="password"
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </div>

            <Controller
              name="acceptTermsConditions"
              control={control}
              render={({ field }) => (
                <FormControl className="items-center" error={!!errors.acceptTermsConditions}>
                  <FormControlLabel
                    label="I agree to the Terms of Service and Privacy Policy"
                    control={
                      <Checkbox
                        size="small"
                        {...field}
                        sx={{
                          '&.Mui-checked svg': {
                            color: '#0284C7',
                          },
                        }}
                      />
                    }
                  />
                  <FormHelperText>{errors?.acceptTermsConditions?.message}</FormHelperText>
                </FormControl>
              )}
            />

            <Button
              variant="contained"
              color="secondary"
              className="w-full mt-24"
              aria-label="Register"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="medium"
            >
              Create an account
            </Button>
          </form>
        </div>
      </Paper>
    </div>
  );
}

export default SignUpCargoPage;
