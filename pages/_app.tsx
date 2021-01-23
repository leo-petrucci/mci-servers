import React from 'react';
import '../styles/globals.css';
import '../styles/react-mde-all.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import type { AppProps } from 'next/app';

import Top from 'components/navigation/top';
import { GraphQLClient } from 'graphql-request';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import UserInfoContext from 'utils/hooks/useUserInfo';

const endpoint = `${process.env.NEXT_PUBLIC_API_URL}`;

export const graphQLClient = new GraphQLClient(endpoint, {
  credentials: 'include',
  mode: 'cors',
});

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
  const router = useRouter();

  if (router.pathname.includes('/redirect'))
    return (
      <QueryClientProvider client={queryClient}>
        <div>
          <Toaster />
        </div>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </QueryClientProvider>
    );

  return (
    <QueryClientProvider client={queryClient}>
      <UserInfoContext>
        <div>
          <Toaster />
        </div>
        <div className="m-auto" style={{ maxWidth: '1440px' }}>
          <div className="grid grid-cols-12">
            <div className="col-span-12 flex justify-center">
              <Top />
            </div>
            <main className="col-span-12">
              <div className="flex justify-center mt-4 mx-4">
                <div className="w-full">
                  {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                  <Component {...pageProps} />
                </div>
              </div>
            </main>
          </div>
        </div>
      </UserInfoContext>
      {process.env.NODE_ENV && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
