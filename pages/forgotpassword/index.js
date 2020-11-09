import Card from '@material-ui/core/Card';
import { Auth } from 'aws-amplify';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';

import ButtonComponent from '../../components/button/button';
import InputComponent from '../../components/input/input';

export default function ForgotPasswordPage() {
  const classes = styles();
  return (
    <div className={classes.container}>
      <Card className={classes.content}>
        <div className={classes.input}>
          <InputComponent placeholder='Email' variant='outlined' />
        </div>
        <div className={classes.button}>
          <ButtonComponent label='Confirm' />
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
    margin: '0 0 20px 0',
  },
  button: { width: '70%', margin: '0 0 20px 0' },
});
