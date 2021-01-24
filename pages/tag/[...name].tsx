import Button from 'components/button';
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
        <div className="grid grid-cols-12">
          {data.pages.map((page, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={i}>
              {page.map((server) => (
                <ServerCard key={server.id} server={server} />
              ))}
            </React.Fragment>
          ))}

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
