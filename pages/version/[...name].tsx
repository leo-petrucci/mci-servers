import Button from 'components/button';
import ServerCard from 'components/server/card';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import useIntersectionObserver from 'utils/hooks/useIntersectionObserver';
import { useServersByVersion } from 'utils/hooks/useServers';

const VersionPage = (): JSX.Element => {
  const loadMoreButtonRef = useRef();
  const router = useRouter();
  const {
    data,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useServersByVersion(
    router.query.name && router.query.name[0],
    ['serversByVersion', router.query.name && router.query.name[0]],
    { enabled: Boolean(router.query.name) }
  );

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <>
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
          <>
            {Array(10)
              .fill(0)
              .map((i) => (
                <ServerCard.Skeleton key={i} />
              ))}
          </>
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
};

export default VersionPage;
