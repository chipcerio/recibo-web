import Button from '../../components/button/button';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState('');
  const handleSubmit = (e) => {
    setValid([username, password]);
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className='container'>
      <div className='loginContent card'>
        <img src='./assets/undraw_receipt.svg' className='img' />

        <div className='inputContainer'>
          <input
            placeholder='Username'
            className='input'
            onChange={onChangeUsername}
          />
          <input
            placeholder='Password'
            className='input'
            onChange={onChangePassword}
          />
          <div className='loginBtn'>
            <Button label='Login' onClick={handleSubmit} />
          </div>

          <div className='loginBtn'>
            <Button label='Facebook' onClick={handleSubmit} />
          </div>

          <Link href='./home'>
            <div className='forgotPassword'>Forgot Password?</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
