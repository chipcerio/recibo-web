import { useEffect } from 'react';
import Button from '../button/button';

export default function AuthPage(props) {
  const { email, password } = props;
  useEffect(() => {
    console.log('EMAIL FROM AUTHPAGE >>> ', email);
  }, [email]);

  return (
    <div className='loginContent card'>
      <div className='inputContainer'>
        <input placeholder='Email' className='input' />
        <div className='loginBtn'>
          <Button label='Register' disable={true} />
        </div>
        <div>{email}</div>
      </div>
    </div>
  );
}
