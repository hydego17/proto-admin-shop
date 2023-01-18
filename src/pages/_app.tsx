import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import MantineProvider from '@/lib/mantine';
import Layout from '@/layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}
