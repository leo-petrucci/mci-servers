import React from 'react';
import '../styles/globals.css';
import { ReactQueryCacheProvider, QueryCache } from 'react-query';
import type { AppProps } from 'next/app';

import { Hydrate } from 'react-query/hydration';
import Top from 'components/navigation/top';

export const endpoint = 'https://api.minecraftitalia.net';
const queryCache = new QueryCache();

export default function MciServers({
  Component,
  pageProps,
}: AppProps): JSX.Element {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Hydrate state={pageProps.dehydratedState}>
        <main className="grid grid-cols-12">
          <aside className="col-span-2 p-4 bg-green-500 h-screen">
            Sidebar
          </aside>
          <div className="col-span-10">
            <Top />
            <div className="flex justify-center mt-8 mx-4">
              <div style={{ maxWidth: '1152px' }} className="w-full">
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Component {...pageProps} />
              </div>
            </div>
          </div>
        </main>
      </Hydrate>
    </ReactQueryCacheProvider>
  );
}
