import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '../src/commons/styles/globals.css';

function MyApp({ Component, pageProps: { session, pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
