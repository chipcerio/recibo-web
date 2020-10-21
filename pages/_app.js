import '../styles/globals.css';

/* Styles */
import '../components/button/button.css';

/* Pages */
import '../pages/login/login.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
