import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function SnackbarComponent(props) {
  const { show, duration, message } = props;

  return (
    <div>
      <Snackbar open={show} autoHideDuration={3000}>
        <Alert severity='error'>{message}</Alert>
      </Snackbar>
    </div>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}
