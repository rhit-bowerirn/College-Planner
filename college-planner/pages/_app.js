import '../styles/globals.css'
import { NextUIProvider } from '@nextui-org/react';
import { AuthUserProvider } from '../context/AuthUserContext';

function MyApp({ Component, pageProps }) {

  return (
    <AuthUserProvider>
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
    </AuthUserProvider>
  );
}

export default MyApp
