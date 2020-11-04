import LoginPage from './login';
import Amplify from 'aws-amplify';
import config from 'config/aws.config';

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
});

export default function App() {
  return <LoginPage />;
}
