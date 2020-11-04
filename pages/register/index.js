import Button from '../../components/button/button';
import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import VerificationComponent from '../../components/auth';
import {
  EMAIL,
  PASSWORD,
  CONFIRM_PASSWORD,
} from '../../constants/field.constants';

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    errors,
    getValues,
    watch,
    setValue,
    trigger,
  } = useForm({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [_validated, setValidated] = useState(false);
  const [AuthPage, setAuthPage] = useState(false);
  const values = watch();
  const router = useRouter();
  const [error_message, setErrorMessage] = useState('');

  useEffect(() => {
    register(
      { name: EMAIL },
      {
        required: true,
        pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/,
      }
    );
    register({ name: PASSWORD }, { required: true });
    register({ name: CONFIRM_PASSWORD }, { required: true });
  }, []);

  const formValidated = () => {
    let validated = 0;
    const { email, password, confirm_password } = errors;
    if (!email) ++validated;
    if (!password) ++validated;
    if (!confirm_password) ++validated;
    const val = getValues();
    if (val.password !== val.confirm_password) {
      console.log('password not the same');
      return false;
    } else {
      if (
        val.password === '' ||
        !val.password ||
        val.confirm_password === '' ||
        !val.confirm_password
      ) {
        console.log('password empty');
        return false;
      }
      console.log('password confirmed');
      return validated === 3 ? true : false;
    }
  };

  const inputEmail = async (val) => {
    setValue(EMAIL, val, true);
    await trigger([EMAIL]);
    setValidated(formValidated());
  };

  const inputPassword = async (val) => {
    setValue(PASSWORD, val, true);
    await trigger([PASSWORD]);
    setValidated(formValidated());
  };
  const inputConfirmPassword = async (val) => {
    setValue(CONFIRM_PASSWORD, val, true);
    await trigger([CONFIRM_PASSWORD]);
    setValidated(formValidated());
  };

  const onSubmit = async (val) => {
    const { email, password } = val;
    try {
      setErrorMessage('');
      const signUpResponse = await Auth.signUp({
        username: email,
        password,
      });
      console.log('signUpResponse', signUpResponse);
      setAuthPage(true);
      console.log('DATA >>> ', val);
    } catch (error) {
      setErrorMessage(error.message);
      console.log('ERROR >>> ', error);
    }
  };
  return (
    <div className='container'>
      <div className='loginContent card'>
        <div>
          <div>
            <input
              name='email'
              placeholder='Email'
              className='input'
              ref={register}
              onChange={(event) => inputEmail(event.target.value)}
              value={values.email}
            />
            {errors.email && (
              <div className='fontWarning'>Email is required</div>
            )}
          </div>
          <div>
            <input
              name='password'
              placeholder='Password'
              className='input'
              ref={register}
              onChange={(event) => {
                inputPassword(event.target.value);
              }}
              value={values.password}
            />
            {errors.password && (
              <div className='fontWarning'>Password is required</div>
            )}
          </div>

          <div>
            <input
              name='confirm_password'
              placeholder='Confirm Password'
              className='input'
              ref={register}
              onChange={(event) => {
                inputConfirmPassword(event.target.value);
              }}
              value={values.confirm_password}
            />
            {errors.confirm_password && (
              <div className='fontWarning'>Confirm Password is required</div>
            )}
          </div>

          <div className='loginBtn'>
            <Button
              label='Register'
              onClick={handleSubmit(onSubmit)}
              disable={!_validated}
            />
          </div>
          {error_message === '' ? null : (
            <div className='fontWarning'>{error_message}</div>
          )}
        </div>
      </div>
      <VerificationComponent email={values.email} />
    </div>
  );
}
