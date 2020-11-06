import { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import { Auth } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
// Components
import ButtonComponent from '../../components/button/button';
import InputComponent from '../../components/input/input';
import { EMAIL } from '../../constants/field.constants';

export default function ForgotPasswordPage() {
  const { register, handleSubmit, setValue, trigger, watch, errors } = useForm({
    email: '',
  });
  const classes = styles();
  const values = watch();
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    register({ name: EMAIL }, { required: true });
  }, []);

  const inputEmail = async (val) => {
    setValue(EMAIL, val, true);
    await trigger({ EMAIL });
    console.log(val);
  };

  const onSubmit = async (data) => {
    console.log('Button Pressed >>> ', data);
    try {
      setLoading(true);
      setDisable(true);
      const forgotPasswordResponse = await Auth.forgotPassword(data.email);

      console.log('FORGOT PASSWORD RESPONSE >>> ', forgotPasswordResponse);
    } catch (error) {
      setLoading(false);
      setDisable(false);
      console.log('ERROR >>> ', error);
    }
  };
  return (
    <div className={classes.container}>
      <Card className={classes.content}>
        <div className={classes.input}>
          <InputComponent
            ref={register}
            value={values.email}
            placeholder='Email'
            variant='outlined'
            onChange={(event) => {
              inputEmail(event.target.value);
            }}
          />
          {errors.email && <a className='fontDanger'>Email is required</a>}
        </div>
        <div className={classes.button}>
          <ButtonComponent
            label='Send Code'
            onClick={handleSubmit(onSubmit)}
            loading={loading}
            disable={disable}
            variant={disable ? 'contained' : 'outlined'}
            loadingColor='inherit'
            loadingSize={30}
          />
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
  content: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '70%',
    width: '30%',
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
  input: {
    width: '70%',
    margin: '20px 0 20px 0',
  },
  button: { width: '70%', margin: '0 0 20px 0' },
});
