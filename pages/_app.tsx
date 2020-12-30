import React from 'react';
import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';

import Top from 'components/navigation/top';

export const endpoint = 'https://api.minecraftitalia.net';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function MciServers({
  Component,
  pageProps,
}: AppProps): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="m-auto" style={{ maxWidth: '1440px' }}>
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <Top />
          </div>
          <main className="col-span-12">
            <div className="flex justify-center mt-4 mx-4">
              <div style={{ maxWidth: '1152px' }} className="w-full">
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Component {...pageProps} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}
