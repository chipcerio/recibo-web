import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Auth } from 'aws-amplify';

// Components
import InputComponent from '../input/input';
import ButtonComponent from '../button/button';
import {
  EMAIL,
  VERIFICATION_CODE,
  NEW_PASSWORD,
} from '../../constants/field.constants';
import SnackBarComponent from '../snackbar/snackbar';

export default function ForgotPasswordAuth(props) {
  const { register, handleSubmit, setValue, trigger, watch, error } = useForm({
    email: '',
    verification_code: '',
    new_password: '',
  });
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [snackShow, setSnackShow] = useState(false);
  const [snackErrNetwork, setSnackErrNetwork] = useState(false);
  const { user } = props;
  const classes = styles();
  const values = watch();

  useEffect(() => {
    register({ name: EMAIL }, { required: true });
    register({ name: VERIFICATION_CODE }, { required: true });
    register({ name: NEW_PASSWORD }, { required: true });
  }, []);

  useEffect(() => {
    emailAddress(user);
  }, [user]);

  const emailAddress = async (val) => {
    setValue(EMAIL, val, true);
    await trigger([EMAIL]);
    console.log(val);
  };

  const inputVerificationCode = async (val) => {
    setValue(VERIFICATION_CODE, val, true);
    await trigger([VERIFICATION_CODE]);
  };

  const inputNewPassword = async (val) => {
    setValue(NEW_PASSWORD, val, true);
    await trigger([NEW_PASSWORD]);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setDisable(true);
      console.log('DATA >>> ', data);
      const response = await Auth.forgotPasswordSubmit(
        data.email,
        data.verification_code,
        data.new_password
      );
      console.log('RESPONSE >>> ', response);
    } catch (error) {
      setLoading(false);
      setDisable(false);
      setSnackErrNetwork(true);
      console.log('ERROR >>> ', error);
      switch (error) {
        case error.code === 'NetworkError':
          break;
        default:
          null;
      }
    }
  };

  return (
    <div className={classes.container}>
      <Card className={classes.content}>
        <div>{user}</div>
        <div className={classes.input}>
          <InputComponent
            label='Verification Code'
            variant='outlined'
            ref={register}
            value={values.verification_code}
            onChange={(event) => {
              inputVerificationCode(event.target.value);
            }}
          />
        </div>
        <div className={classes.input}>
          <InputComponent
            label='New Password'
            variant='outlined'
            ref={register}
            value={values.new_password}
            // type='password'
            onChange={(event) => {
              inputNewPassword(event.target.value);
            }}
          />
        </div>
        <div className={classes.button}>
          <ButtonComponent
            label='Confirm'
            variant={disable ? 'contained' : 'outlined'}
            onClick={handleSubmit(onSubmit)}
            loading={loading}
            disable={disable}
            loadingSize={30}
            loadingColor='inherit'
          />
        </div>

        {snackErrNetwork ? (
          <SnackBarComponent
            show={snackErrNetwork}
            duration={3000}
            message='Network Error'
          />
        ) : null}
      </Card>
    </div>
  );
}

const styles = makeStyles({
  container: {
    height: '100%',
    width: '100%',
  },
  content: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  input: { width: '70%', margin: '20px 0 20px 0' },
  button: { width: '70%', margin: '0 0 20px 0' },
});
