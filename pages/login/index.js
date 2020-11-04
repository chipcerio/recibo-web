import Button from '../../components/button/button';
import Link from 'next/link';
import { Auth } from 'aws-amplify';

import { useForm } from 'react-hook-form';

export default function LoginPage() {
  const { register, handleSubmit } = useForm({
    email: '',
    password: '',
  });

  const onSubmit = async (data) => {
    console.log('DATA>>> ', data);
    try {
      const response = await Auth.signIn({
        username: data.email,
        password: data.password,
      });
      console.log('Login Response >> ', response);
      console.log('USERNAME> ', response.username);
    } catch (error) {
      console.log('##############################', error);
    }
  };

  return (
    <div className='container'>
      <div className='loginContent card'>
        <img src='./assets/undraw_receipt.svg' className='img' />

        <div className='inputContainer'>
          <input
            name='email'
            placeholder='Email'
            className='input'
            ref={register}
          />
          <input
            name='password'
            placeholder='Password'
            className='input'
            ref={register}
          />
          <div className='loginBtn'>
            <Button
              label='Login'
              onClick={handleSubmit(onSubmit)}
              disable={false}
            />
          </div>
          <Link href='./register'>
            <div className='register'>Register</div>
          </Link>

          <Link href='./home'>
            <div className='forgotPassword'>Forgot Password?</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
