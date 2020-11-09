import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Auth } from 'aws-amplify';
import { useForm } from 'react-hook-form';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

// Components
import ButtonComponent from '../../components/button/button';
import InputComponent from '../../components/input/input';
import { EMAIL, PASSWORD } from '../../constants/field.constants';
import SnackbarComponent from '../../components/snackbar/snackbar';

export default function LoginPage() {
  const { register, handleSubmit, setValue, trigger, watch, error } = useForm({
    email: '',
    password: '',
  });
  const values = watch();
  const classes = styles();
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [snackShow, setSnackShow] = useState(false);

  useEffect(() => {
    register(
      { name: EMAIL },
      {
        required: true,
        pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/,
      }
    );
    register({ name: PASSWORD }, { required: true });
  }, []);

  const inputEmail = async (val) => {
    setValue(EMAIL, val, true);
    await trigger([EMAIL]);
  };

  const inputPassword = async (val) => {
    setValue(PASSWORD, val, true);
    await trigger([PASSWORD]);
  };

  const onSubmit = async (data) => {
    console.log('DATA >>> ', data);
    try {
      setLoading(true);
      setDisable(true);
      setSnackShow(false);
      const signInResponse = await Auth.signIn({
        username: data.email,
        password: data.password,
      });
      console.log('SignIn Response >>> ', signInResponse);
    } catch (error) {
      setLoading(false);
      setDisable(false);
      setSnackShow(true);
      console.log('ERROR >>> ', error);
    }
  };

  return (
    <div className={classes.container}>
      <Card className={classes.loginContent}>
        <div className={classes.signUp}>
          <Link href='/register'>
            <a className={`${classes.hyperLink} fontPrimary letterSpacing`}>
              Sign Up
            </a>
          </Link>
        </div>
        <img src='./assets/undraw_receipt.svg' className={classes.img} />
        <div className={classes.inputContainer}>
          <div className={classes.input}>
            <InputComponent
              name='email'
              label='Email'
              ref={register}
              value={values.email}
              variant='outlined'
              onChange={(event) => inputEmail(event.target.value)}
            />
          </div>
          <div className={classes.input}>
            <InputComponent
              name='confirm_password'
              ref={register}
              value={values.password}
              label='Password'
              variant='outlined'
              type='password'
              onChange={(event) => inputPassword(event.target.value)}
            />
          </div>
          <div className={classes.login}>
            <ButtonComponent
              label='Login'
              loading={loading}
              onClick={handleSubmit(onSubmit)}
              disable={disable}
              variant={disable ? 'contained' : 'outlined'}
              loadingSize={30}
              loadingColor='inherit'
            />
          </div>

          <div>
            <Link href='/forgotpassword'>
              <a className={`${classes.hyperLink} fontPrimary letterSpacing`}>
                Forgot Password?
              </a>
            </Link>
          </div>
          {snackShow ? (
            <SnackbarComponent show={snackShow} duration={3000} />
          ) : null}
        </div>
      </Card>
    </div>
  );
}

const styles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '70%',
    margin: '0 4vw 0 0',
  },
  loginContent: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: '70%',
    width: '50%',
    ['@media (max-width:700px)']: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      height: '70%',
      width: '70%',
    },
  },
  signUp: {
    position: 'absolute',
    right: '20px',
    top: '10px',

    ['@media (max-width:700px)']: {},
  },
  img: {
    height: '50vh',
    width: '50vw',
    ['@media (max-width:700px)']: {
      height: '30vh',
      width: '30vw',
    },
  },
  input: {
    margin: '0 0 20px 0',
    width: '100%',
  },
  login: {
    width: '100%',
    margin: '0 0 10px 0',
  },
  hyperLink: { textDecoration: 'none', fontWeight: '500' },
});
