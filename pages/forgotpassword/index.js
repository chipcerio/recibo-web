import { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import { Auth } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';
// Components
import ButtonComponent from '../../components/button/button';
import InputComponent from '../../components/input/input';

export default function ForgotPasswordPage() {
  const classes = styles();
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [email, setEmail] = useState('');

  const inputEmail = (e) => {
    setEmail(e);
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      setDisable(true);
      const forgotPassResponse = await Auth.forgotPassword(email);
      console.log('Forgot Password Response >>> ', forgotPassResponse);
    } catch (error) {
      console.log('ERROR >>> ', error);
    }
  };
  return (
    <div className={classes.container}>
      <Card className={classes.content}>
        <div className={classes.input}>
          <InputComponent
            placeholder='Email'
            variant='outlined'
            onChange={(event) => {
              inputEmail(event.target.value);
            }}
          />
        </div>
        <div className={classes.button}>
          <ButtonComponent
            label='Send Code'
            onClick={onSubmit}
            loading={loading}
            disable={disable}
            variant={disable ? 'contained' : 'outlined'}
            loadingColor='inherit'
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
