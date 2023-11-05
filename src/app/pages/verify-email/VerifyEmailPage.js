import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JwtService from '../../auth/services/jwtService';

function VerifyEmailPage() {
  const navigate = useNavigate();
  const url = window.location.href;
  const urlObject = new URL(url);

  const params = new URLSearchParams(urlObject.search);
  const token = params.get('token');
  const code = params.get('code');

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line consistent-return
      JwtService.verifyEmail(token).catch((error) => {
        if (!error) {
          return navigate('/', { replace: true });
        }
        // implement request component with error handling and request new code
      });
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0 bg-white">
      <Paper className="flex items-center w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-48 mx-auto" src="assets/images/logo/logo.svg" alt="logo" />

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight text-center">
            You will be redirected to main page in a second...
          </Typography>
        </div>
      </Paper>
    </div>
  );
}

export default VerifyEmailPage;
