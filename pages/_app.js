import '../styles/globals.css';
import Amplify from 'aws-amplify';
import config from 'config/aws.config';

/* Styles */
import '../components/button/button.css';

/* Pages */
import './register/register.css';

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
