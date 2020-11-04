import { useEffect, useState } from 'react';
import Button from '../button/button';
import { Auth } from 'aws-amplify';
import { useForm } from 'react-hook-form';

export default function AuthPage(props) {
  const [code, setCode] = useState('');
  const { email } = props;
  const [error_message, setErrorMessage] = useState('');

  const inputCode = (e) => {
    setCode(e);
  };

  const handleConfirm = async () => {
    try {
      console.log('handle confirm ', email, code);
      // const confirmResponse = await Auth.confirmSignUp({
      //   username: email,
      //   code,
      // });
      const authResponse = await Auth.confirmSignUp(email, code);
      console.log('Confirmation Code Res >>> ', authResponse);
    } catch (error) {
      console.log('AuthPage Error >>> ', error);
    }
  };

  return (
    <div className='loginContent card'>
      <div className='inputContainer'>
        <input
          placeholder='Confirmation Code'
          className='input'
          value={code}
          onChange={(event) => {
            inputCode(event.target.value);
          }}
        />
        <div className='loginBtn'>
          <Button label='Register' disable={false} onClick={handleConfirm} />
        </div>
        <div>{email}</div>
      </div>
    </div>
  );
}
