import React, { useCallback, useRef, useState } from 'react';
import Head from 'next/head';
import throttle from 'lodash.throttle';
import Typography from 'components/typography';
import ServerCard from 'components/server/card';
import useLastMonth from 'utils/hooks/getLastMonth';
import TopCard from 'components/server/topCard/topCard';
import useTags from 'utils/hooks/useTags';
import Tag from 'components/tag';
import useIntersectionObserver from 'utils/hooks/useIntersectionObserver';
import { useServers } from 'utils/hooks/useServers';
import Button from 'components/button';
import Icon from 'components/icon';
import useVersions from 'utils/hooks/useVersions';
import Version from 'components/version';
import Skeleton from 'react-loading-skeleton';

const { Title, Text } = Typography;

const Home = (): JSX.Element => {
  const [search, setSearch] = useState('');

  const searchFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledSearch = useCallback(throttle(searchFunc, 400), []);

  const loadMoreButtonRef = useRef();
  const {
    data,
    isSuccess,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useServers(null, 'servers', search);
  const { lastMonthIso, lastMonthName } = useLastMonth();
  const {
    data: lastmonthData,
    isSuccess: lastmonthIsSuccess,
    isFetching: lastMonthIsFetching,
  } = useServers(lastMonthIso, 'topServers');
  const { data: tagData, isSuccess: tagIsSuccess } = useTags('');

  const { data: versionData, isSuccess: versionIsSuccess } = useVersions('');

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Minecraft Italia Lista Server</title>
        <meta
          name="description"
          content="La miglior lista di server Minecraft italiani. Trova nuovi server Minecraft e vota per i tuoi preferiti."
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Minecraft Italia Lista Server" />
        <meta
          property="og:description"
          content="La miglior lista di server Minecraft italiani. Trova nuovi server Minecraft e vota per i tuoi preferiti."
        />
        {/* <meta property="og:image" content={cover} /> */}
        <meta
          property="og:url"
          content="https://servers.minecraftitalia.net/"
        />
        <meta name="twitter:title" content="Minecraft Italia Lista Server" />
        <meta
          name="twitter:description"
          content="La miglior lista di server Minecraft italiani. Trova nuovi server Minecraft e vota per i tuoi preferiti."
        />
        {/* <meta name="twitter:image" content={cover} /> */}
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
        <meta property="og:site_name" content="Minecraft Italia Lista Server" />
      </Head>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-full">
          {lastmonthIsSuccess && !lastMonthIsFetching ? (
            <>
              {lastmonthData.pages[0].length ? (
                <>
                  <div className="mb-4">
                    {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
                    <Title level={2}>Il top server di {lastMonthName}</Title>
                  </div>
                  <TopCard server={lastmonthData.pages[0][0]} />
                </>
              ) : (
                <div className="col-span-full flex mb-4">
                  <Text type="secondary">
                    Il top server non é ancora stato deciso.
                  </Text>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="mb-4">
                <Skeleton height={32} width={128} />
              </div>
              <TopCard.Skeleton />
            </>
          )}
        </div>
        <aside className="col-span-full lg:col-span-2">
          {/* Tags Container */}
          <div className="mb-4">
            <div className="mb-2">
              <Title level={5}>Tags popolari</Title>
            </div>
            <div className="flex flex-wrap">
              {tagIsSuccess &&
                tagData.map((tag) => <Tag key={tag.id} tag={tag} />)}
            </div>
          </div>
          {/* Versions Container */}
          <div className="mb-4">
            <div className="mb-2">
              <Title level={5}>Versioni</Title>
            </div>
            <div className="flex flex-wrap">
              {versionIsSuccess &&
                versionData.map((version) => (
                  <Version key={version.id} version={version} />
                ))}
            </div>
          </div>
        </aside>
        <div className="col-span-full lg:col-span-10">
          <div className="mb-4">
            {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
            <Title level={2}>I nostri server più popolari</Title>
          </div>
          <div className="grid grid-cols-12 mb-4">
            <div className="flex items-center col-span-full lg:col-start-9 lg:col-span-4 shadow-sm transition border border-gray-200 rounded-md px-3 h-10 focus:outline-none focus:ring-2 focus:ring-blue-100 w-full invalid:border-red-600 placeholder-gray-400">
              <input
                onChange={throttledSearch}
                type="text"
                placeholder="Cerca server"
                className="w-full"
              />
              <Icon>
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </Icon>
            </div>
          </div>
          {isSuccess && !isFetching && data.pages.length ? (
            <div className="grid grid-cols-12">
              {data.pages.map((page, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <React.Fragment key={i}>
                  {page.length ? (
                    page.map((server) => (
                      <ServerCard key={server.id} server={server} />
                    ))
                  ) : (
                    <div className="col-span-full flex justify-center mb-4">
                      <Text type="secondary">
                        Non abbiamo trovato alcun server.
                      </Text>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-12">
              {Array(10)
                .fill(0)
                .map((n, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <ServerCard.Skeleton key={i} />
                ))}
            </div>
          )}

          <div
            className="col-span-full flex justify-center"
            ref={loadMoreButtonRef}
          >
            <Button
              type="secondary"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {/* eslint-disable-next-line no-nested-ternary */}
              {isFetchingNextPage
                ? 'Caricando più server...'
                : hasNextPage
                ? 'Carica più server'
                : 'Non ci sono più server da caricare.'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
