import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Auth } from 'aws-amplify';

// Components
import InputComponent from '../input/input';
import ButtonComponent from '../button/button';
import { EMAIL, VERIFICATION_CODE } from '../../constants/field.constants';

export default function ForgotPasswordAuth(props) {
  const { register, handleSubmit, setValue, trigger, watch, error } = useForm({
    email: '',
    verification_code: '',
  });
  const [verified, setVerified] = useState(false);
  const { user } = props;
  const classes = styles();
  const values = watch();

  useEffect(() => {
    register({ name: EMAIL }, { required: true });
    register({ name: VERIFICATION_CODE }, { required: true });
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
    console.log(val);
  };

  const onSubmit = async (data) => {
    try {
      setVerified(true);
      console.log('DATA >>> ', data);
      console.log('setVerified', verified);
      const response = await Auth;
    } catch (error) {
      console.log('ERROR >>> ', error);
    }
  };

  return (
    <div className={classes.container}>
      <Card className={classes.content}>
        <div>{user}</div>
        <div className={classes.input}>
          <InputComponent
            label='Password'
            variant='outlined'
            ref={register}
            value={values.verification_code}
            onChange={(event) => {
              inputVerificationCode(event.target.value);
            }}
          />
        </div>
        <div className={classes.button}>
          <ButtonComponent
            label='Confirm'
            variant='outlined'
            onClick={handleSubmit(onSubmit)}
          />
        </div>
        {verified ? <div>{verified}</div> : <div></div>}
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
