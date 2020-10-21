import style from './login.module.css';
import Button from '../../src/components/button/button';
import { useState } from 'react';

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
    <div className={style.container}>
      <div className={`${style.loginContent} card`}>
        <img src='./assets/undraw_receipt.svg' className={style.img} />
        <div className={style.inputContainer}>
          <input
            placeholder='Username'
            className={style.input}
            onChange={onChangeUsername}
          />
          <input
            placeholder='Password'
            className={style.input}
            onChange={onChangePassword}
          />
          <div className={style.btnContainer}>
            <Button label='Login' onClick={handleSubmit} />
          </div>
          <div className={style.fogotPassword}>Forgot Password?</div>
        </div>
      </div>
    </div>
  );
}
