import styles from './login.module.css';
import React, { useState } from 'react';

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
    <div className={styles.container}>
      <div className={`${styles.loginContent} card`}>
        <img src='./assets/undraw_receipt.svg' className={styles.img} />
        <input
          className={styles.input}
          placeholder='Username'
          onChange={onChangeUsername}
        />
        <input
          className={styles.input}
          placeholder='Password'
          onChange={onChangePassword}
          type='password'
        />
        <button onClick={handleSubmit}>Login</button>
        <div>Forgot Password?</div>
      </div>
    </div>
  );
}
