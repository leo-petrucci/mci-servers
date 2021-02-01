import React from 'react';
import ReactGA from 'react-ga';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import '../styles/globals.css';
import '../styles/react-mde-all.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DateTime } from 'luxon';
import { ReactQueryDevtools } from 'react-query/devtools';
import type { AppProps } from 'next/app';
import 'components/tooltip/tooltip.css';
import Top from 'components/navigation/top';
import { GraphQLClient } from 'graphql-request';
import { Toaster } from 'react-hot-toast';
import UserInfoContext from 'utils/hooks/useUserInfo';

ReactGA.initialize('UA-144570559-1');

Router.events.on('routeChangeStart', (url) => {
  ReactGA.pageview(url);
});

const endpoint = `${process.env.NEXT_PUBLIC_API_URL}`;

export const graphQLClient = new GraphQLClient(endpoint, {
  credentials: 'include',
  mode: 'cors',
});

export const queryClient = new QueryClient({
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
      <Head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS}`}
        />
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS}');`,
          }}
        />
      </Head>
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
        <div className="h-48 flex justify-center items-center">
          <div className="text-gray-500">
            © {DateTime.local().toFormat('yyyy')} Minecraft Italia
          </div>
        </div>
      </UserInfoContext>
      {process.env.NODE_ENV && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
