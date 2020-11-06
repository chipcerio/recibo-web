import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function SnackbarComponent(props) {
  const { show, duration } = props;

  return (
    <div>
      <Snackbar open={show} autoHideDuration={3000}>
        <Alert severity='error'>Incorrect Email or Password</Alert>
      </Snackbar>
    </div>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}
