import { Form, Formik, type FormikHelpers } from 'formik';
import { Button, Grid2, Typography } from '@mui/material';
import TextField from '../components/forms/TextField';
import type { User } from '@shared_types';
import * as Yup from 'yup';
import { signup } from '../actions/session';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function SignupPage() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const handleOnSubmit = async (
    values: Omit<User, '_id'>,
    { setSubmitting }: FormikHelpers<Omit<User, '_id'>>,
  ) => {
    try {
      await signup(values);

      enqueueSnackbar('Account created with success !', {
        variant: 'success',
      });
      navigate('/login');
    } catch (error) {
      console.error('Error when trying to create the account', error);
      enqueueSnackbar('Error when trying to create the account', {
        variant: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
      .required('Please confirm your password'),
  });

  return (
    <Grid2 container justifyContent='center'>
      <Grid2 size={{ xs: 12, sm: 8, md: 6, lg: 4 }}>
        <Typography variant='h4' align='center' gutterBottom>
          Create an account
        </Typography>
        <Formik
          initialValues={{
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            overallScore: 0,
            graduated: false,
          }}
          validationSchema={SignupSchema}
          onSubmit={handleOnSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextField
                name='email'
                label='Email'
                variant='outlined'
                margin='normal'
                fullWidth
                autoFocus
              />
              <TextField
                name='username'
                label='Username'
                variant='outlined'
                margin='normal'
                fullWidth
              />
              <TextField
                type='password'
                name='password'
                label='Password'
                variant='outlined'
                margin='normal'
                fullWidth
              />
              <TextField
                type='password'
                name='confirmPassword'
                label='Confirm your password'
                variant='outlined'
                margin='normal'
                fullWidth
              />
              <Button
                sx={{ mt: 2 }}
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                disabled={isSubmitting}
              >
                Sign up
              </Button>
            </Form>
          )}
        </Formik>
      </Grid2>
    </Grid2>
  );
}

export default SignupPage;
