import '../styles/globals.css';

/* Styles */
import '../components/button/button.css';

/* Pages */
import './login/login.css';
import './register/register.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
