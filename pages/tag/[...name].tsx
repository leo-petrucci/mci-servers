import Button from 'components/button';
import Head from 'next/head';
import ServerCard from 'components/server/card';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import useIntersectionObserver from 'utils/hooks/useIntersectionObserver';
import { useServersByTag } from 'utils/hooks/useServers';

const TagPage = (): JSX.Element => {
  const loadMoreButtonRef = useRef();
  const router = useRouter();
  const {
    data,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useServersByTag(
    router.query.name && router.query.name[0],
    ['serversByTag', router.query.name && router.query.name[0]],
    { enabled: Boolean(router.query.name) }
  );

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  if (isSuccess) {
    return (
      <>
        <Head>
          <meta charSet="UTF-8" />
          <title>
            {router.query.name && router.query.name} -Minecraft Italia Lista
            Server
          </title>
          <meta
            name="description"
            content={`Server Minecraft italiani taggati con ${router.query.name}`}
          />
          <meta name="robots" content="index, follow" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            property="og:title"
            content={`${
              router.query.name && router.query.name
            } - Minecraft Italia Lista Server`}
          />
          <meta
            property="og:description"
            content={`Server Minecraft italiani taggati con ${router.query.name}`}
          />
          {/* <meta property="og:image" content={cover} /> */}
          <meta
            property="og:url"
            content={`https://servers.minecraftitalia.net/tag/${router.query.name}`}
          />
          <meta
            name="twitter:title"
            content={`${
              router.query.name && router.query.name
            } - Minecraft Italia Lista Server`}
          />
          <meta
            name="twitter:description"
            content={`Server Minecraft italiani taggati con ${router.query.name}`}
          />
          {/* <meta name="twitter:image" content={cover} /> */}
          {/* <meta name="twitter:card" content="summary_large_image" /> */}
          <meta
            property="og:site_name"
            content={`${
              router.query.name && router.query.name
            } - Minecraft Italia Lista Server`}
          />
        </Head>
        <div className="grid grid-cols-12">
          {isSuccess && !isFetching && data.pages.length ? (
            <>
              {data.pages.map((page, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <React.Fragment key={i}>
                  {page.map((server) => (
                    <ServerCard key={server.id} server={server} />
                  ))}
                </React.Fragment>
              ))}
            </>
          ) : (
            <div className="grid grid-cols-12">
              {Array(10)
                .fill(0)
                .map((i) => (
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
      </>
    );
  }
  return <>Loading...</>;
};

export default TagPage;
