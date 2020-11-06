import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function ButtonComponent(props) {
  const {
    type,
    onClick,
    label,
    disable,
    loading,
    variant,
    loadingSize,
    loadingColor,
  } = props;

  return (
    <div>
      <CustomButton
        type={type}
        onClick={onClick}
        disabled={disable}
        variant={variant}
      >
        {loading ? (
          <CircularProgress size={loadingSize} color={loadingColor} />
        ) : (
          label
        )}
      </CustomButton>
    </div>
  );
}

const CustomButton = withStyles({
  root: {
    boxShadow: 'none',
    width: '100%',
    color: 'white',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#2FB5F9',
    borderWidth: '0px',

    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#2D78AE',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
    },
    '&:focus': {
      boxShadow: 'red',
    },
  },
})(Button);
