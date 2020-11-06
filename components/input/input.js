import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export default function InputComponent(props) {
  const classes = useStyles();
  const {
    label,
    required,
    onChange,
    value,
    variant,
    placeholder,
    type,
    id,
    name,
    ref,
  } = props;

  return (
    <div className={classes.root}>
      <TextField
        id={id}
        label={label}
        variant={variant}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        required={required}
        type={type}
        name={name}
        ref={ref}
      />
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    '& > *': {
      width: '100%',
    },
  },
});

// const InputStyle = withStyles((theme) => ({
//   root: {
//     '&': {
//       width: '100%',
//     },
//   },
//   input: {
//     padding: 10,
//     borderRadius: 50,
//     border: '1px solid #ced4da',
//     transition: theme.transitions.create(['border-color', 'box-shadow']),
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//     '&:focus': {
//       //   boxShadow: `${fade(theme.palette.primary.main, 0.1)} 0 0 0 0.2rem`,
//       boxShadow: '3px 3px #dddddd',
//       borderColor: '#dddddd',
//     },
//   },
// }))(InputBase);
