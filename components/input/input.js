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
